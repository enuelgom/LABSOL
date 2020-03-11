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
                      <v-btn text icon color="red" v-on="on" :disabled="item.status === 'cancelado'" @click="cancelarSolicitud(item)">
                          <v-icon>fa fa-ban</v-icon>
                      </v-btn>
                  </template>
                  <span>Cancelar solicitud</span>
                </v-tooltip>
            </template>
            <template v-slot:item.status="{item}">
               <v-chip :color="obtenerColor(item.status)" dark>{{ item.status }}</v-chip>
            </template>
      </v-data-table>
    </v-card>
    <CancelarSolicitud :cancelarSolicitudAlumno="alertaCancelar" />
  </div>
</template>

<script>
import { apolloClient } from '../../graphql/apollo'
import gql from 'graphql-tag'
import { mapState } from "vuex"
import CancelarSolicitud from '@/components/Alertas/CancelarSolicitud'
import { EventBus } from '../../EventBus'

export default {
  name: "Proyectos",
  components: {CancelarSolicitud},

  data: () => ({
    filtro: "",
    loading: false,
    alertaCancelar: false,
    nomProyecto: "",
    nomLaboratorio: "",
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
    }

  },

  mounted(){
    EventBus.$on("cerrarAlertaCancelarSolicitud", ()=>{
      this.alertaCancelar = false;
    });

    EventBus.$on("actualizarTablaSolicitudes",()=>{
      this.solicitudesProyectos();
    });
    
    this.solicitudesProyectos();
  }
}
</script>