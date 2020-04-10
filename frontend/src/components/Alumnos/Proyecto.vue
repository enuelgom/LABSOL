<template>
  <div>
    <v-card elevation="6" class="my-4">
      <v-card-title>Proyectos solicitados
          <v-spacer />
          <v-text-field prepend-icon="fa fa-search" label="Buscar proyecto por nombre" v-model="filtro"></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" 
        :search="filtro" 
        no-data-text="No has realizado ninguna solicitud" 
        :loading="loading" 
        loading-text="Cargando..."
        no-results-text="Proyecto no encontrado"
        :footer-props="{itemsPerPageText:'Paginación'}"
        :items="misSolicitudes"> 
            <template v-slot:item.acciones="{item}">
                <v-tooltip bottom>
                  <template v-slot:activator="{on}">
                      <v-btn style="outline:none;" text icon color="red" v-on="on" :disabled="item.status === 'cancelado'" @click="cancelarSolicitud(item)">
                          <v-icon>fa fa-ban</v-icon>
                      </v-btn>
                  </template>
                  <span v-if="item.status!='Aceptado'">Cancelar solicitud</span>
                  <span v-else>Cancelar proyecto</span>
                </v-tooltip>
                <v-tooltip bottom v-if="item.status === 'Aceptado'">
                  <template v-slot:activator="{on}">
                      <v-btn style="outline:none;" text icon color="blue" v-on="on" @click="verficarMetodologia(item.nombre, item.proyecto)">
                        <v-icon>fa fa-file</v-icon>
                      </v-btn>
                  </template>
                  <span>Agregar metodologia</span>
                </v-tooltip>
                <v-tooltip bottom v-if="item.status === 'Aceptado'">
                  <template v-slot:activator="{on}">
                      <v-btn style="outline:none;" text icon color="blue" v-on="on" @click="abrirMsjRepositorio">
                        <v-icon>fa fa-code-branch</v-icon>
                      </v-btn>
                  </template>
                  <span>Agregar repositorio</span>
                </v-tooltip>
            </template>
            <template v-slot:item.status="{item}">
               <v-chip :color="obtenerColor(item.status)" dark>{{ item.status }}</v-chip>
            </template>
      </v-data-table>
    </v-card>
    <CancelarSolicitud :cancelarSolicitudAlumno="alertaCancelar" />
    <AgregarMetodologia :modalAlertaMetodologia="alertaMetodologia" />
    <MsjAgregarRepositorio :msjAgregarRepositorio="abrirMsjAddRepo" />
  </div>
</template>

<script>
import { apolloClient } from '../../graphql/apollo'
import gql from 'graphql-tag'
import { mapState } from "vuex"
import CancelarSolicitud from '@/components/Alertas/CancelarSolicitud'
import AgregarMetodologia from '@/components/Alertas/AgregarMetodologia'
import { EventBus } from '../../EventBus'
import MsjAgregarRepositorio from '@/components/Alertas/MsjAgregarRepositorio'

export default {
  name: "Proyectos",
  components: {CancelarSolicitud, AgregarMetodologia, MsjAgregarRepositorio},

  data: () => ({
    validacionMetodologia: '',
    filtro: "",
    loading: false,
    alertaMetodologia: false,
    abrirMsjAddRepo: false,
    alertaCancelar: false,
    nomProyecto: "",
    nomLaboratorio: "",
    existeMetod: false,
    nomMetod: '',
    headers: [
      {text: "Numero", value: "numero", filerable: false},
      {text: "Nombre", value: "proyecto"},
      {text: "Laboratorio", value: "nombre", filerable: false, align: 'center', sortable: false, value: 'nombre'},
      {text: "Estatus", value: "status", filerable: false, align: 'center', sortable: false, value: 'status'},
      {text: "Acciones", value: "acciones", filerable: false, align: 'center', sortable: false, value: 'acciones'},
    ],
    misSolicitudes: []
  }),

  computed: {
    ...mapState(['usuarioLogeado'])
  },

  methods: {
    // Abrir mensaje para agregar el repositorio
    abrirMsjRepositorio(){
      this.abrirMsjAddRepo = true;
    },

    // Color del status
    obtenerColor(status){
      if (status === "En espera") {
        return "orange"
      }else if(status === "Aceptado"){
        return "green"
      }else{
        return "red"
      }
    },

    // Solicitudes de proyectos por alumno
    async solicitudesProyectos(){
      try {
        const {data} = await this.$apollo.query({
          query: gql`
            query
            {
              misSolicitudes{
                nombre
                proyecto
                status
              }
            }
          `,
        })
         var i = 0;
          for(let val of data.misSolicitudes){
              i=i+1;
              var numero="numero";
              var value = ""+i;
              val[numero]=value;
              }
        this.misSolicitudes=data.misSolicitudes;
      } catch (error) {

      }
    },

    cancelarSolicitud(datos){
      this.nomProyecto = datos.proyecto;
      this.nomLaboratorio = datos.nombre;
      EventBus.$emit("datosCancelarProyecto", this.nomProyecto, this.nomLaboratorio);
      this.alertaCancelar = true;
    },

    async verficarMetodologia(nombre, proyecto){
      try {
        const {data} = await this.$apollo.query({
          query: gql`
            query($nombre: String!, $proyecto: String!)
            {
              existeMetod(nombre: $nombre, proyecto: $proyecto)
            }
          `,
          variables: {
            nombre: nombre,
            proyecto: proyecto
          }
        })
        if (data.existeMetod!=null) {
          this.nomMetod = data.existeMetod;
          EventBus.$emit("tablaMetodologiaVisible",nombre, proyecto, this.nomMetod);
        }else{
          let Nombre = nombre;
          let Proyecto = proyecto;
          this.alertaMetodologia = true;
          EventBus.$emit("datosMetodologia", Nombre, Proyecto);
        }
      } catch (error) {
                
      }
    }

  },

  mounted(){
    EventBus.$on("cerrarAlertaCancelarSolicitud", ()=>{
      this.alertaCancelar = false;
    });

    EventBus.$on("actualizarTablaSolicitudes",()=>{
      this.solicitudesProyectos();
    });

    EventBus.$on("cerrarModalAlertaMetodologia", ()=>{
      this.alertaMetodologia = false;
    });
    
    EventBus.$on("cerrarMsjAgregarRepositorio", ()=>{
      this.abrirMsjAddRepo = false;
    });

    this.solicitudesProyectos();
  }
}
</script>
