<template>  
    <div>
        <v-dialog v-model="mostrarSolocitudes" max-width="1500" persistent>
            <v-card color="grey lighten-3">
                <v-toolbar color="primary" dark>
                  <v-card-title>Solicitudes del proyecto</v-card-title>
                      <v-spacer />
                      <v-btn style="outline:none;" icon @click="closeModalSolicitudes()"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row v-if="usuarioLogeado.tipUsuario === '1' && usuarioLogeado.siglas ===this.$route.params.nameLab">
                        <v-col cols="12" sm="12" md="12" lg="12">
                            <v-data-table 
                                :headers="headers"   
                                class="elevation-1"
                                no-data-text="No existen solicitudes" 
                                :footer-props="{itemsPerPageText:'Paginación'}" 
                                :items="alumnos">
                                <template v-slot:item.solicitudes="{item}" >
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{on}">
                                            <v-btn style="outline:none;" text icon color="green"  :disabled="NoHayCupo" v-on="on" @click="respuestaSolicitud(item['_id'],'Aceptado')">
                                            <v-icon>fa fa-check</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Aceptar</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{on}">
                                            <v-btn style="outline:none;" text icon color="red" v-on="on" @click="respuestaSolicitud(item['_id'],'Rechazado')">
                                            <v-icon>fa fa-times</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Rechazar</span>
                                    </v-tooltip>
                                </template> 
                            </v-data-table>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import { mapState } from "vuex"
import { apolloClient } from '../../graphql/apollo'
import gql from 'graphql-tag'

export default {
    name: "Solicitudes",
    props: ["mostrarSolocitudes"],

    data: ()=>({
        NoHayCupo:false,
        alumnos: [],
        Infoproyecto: "",
        headers: [
            {text: "Número", value: "numero"},
            {text: "Nombre", value: "nombre", sortable: false},
            {text: "Institución", value: "institucion", sortable: false},
            {text: "Carrera", value: "carrera", sortable: false},
            {text: "Correo", value: "correo", sortable: false},
            {text: "Teléfono", value: "telefono", sortable: false},
            {text: "Solicitudes", value: "solicitudes", sortable: false},
        ],
        datosProyecto:{
            alumnosRequeridos: "",
            nombre: "",
            alumExist: ""
        },
    }),

    computed:{
        ...mapState(["usuarioLogeado"])
    },

    methods: {
    // Obtener informacion de un proyecto de un laboratorio
        async ObtenerInfoLab(){
            try {
                const {data} = await this.$apollo.query({
                    query: gql`
                        query($nombre: String!, $proyecto: String!){
                            proyecto(nombre: $nombre, proyecto: $proyecto){
                                proyecto
                                numAlu  
                                alumnosExistentes
                            }
                        }
                    `,
                    variables: {
                        nombre: this.$route.params.nameLab,
                        proyecto: this.Infoproyecto
                    }   
                }) 
                this.datosProyecto.alumnosRequeridos =data.proyecto.numAlu;
                this.datosProyecto.nombre =data.proyecto.proyecto;
                this.datosProyecto.alumExist = data.proyecto.alumnosExistentes;
                if(data.proyecto.numAlu<=data.proyecto.alumnosExistentes){
                   this.NoHayCupo=true;
                }else{
                    this.NoHayCupo=false;
                }
            } catch (error) {
                
            } 
        },

        // Aceptar o reachazar solicitud
        async respuestaSolicitud(idAlumno,accions){
            try {
                const { data } = await apolloClient.mutate({
                mutation: gql`
                    mutation($nombre: String!, $proyecto: String!, $_id: String!, $accion: String!)
                    {
                        aceptarSolicitud(nombre: $nombre, proyecto: $proyecto, _id: $_id, accion: $accion)
                    }
                `,
                variables: {
                    nombre: this.$route.params.nameLab,
                    proyecto: this.datosProyecto.nombre,
                    _id: idAlumno,
                    accion: accions
                }
            })
            
            this.ObtenerInfoLab(); 
            this.obtenerAlumnos(); 
            
            } catch (error) {
                
            }
        },

        // Obtener los alumnos por proyecto
        async obtenerAlumnos(){
            let status = "En espera";
            try {
                const {data} = await this.$apollo.query({
                    query: gql`
                        query($nombre: String!, $proyecto: String!, $status: String!){
                            alumnos(nombre: $nombre, proyecto: $proyecto, status: $status){
                                _id
                                nombre
                                institucion
                                carrera
                                correo
                                telefono
                            }
                        }
                    `,
                    variables: {
                        nombre: this.$route.params.nameLab,
                        proyecto: this.Infoproyecto,
                        status: status
                    } 

                })
                
                
                var i = 0;
                for(let val of data.alumnos){
                    i=i+1;
                    var numero="numero";
                    var value = ""+i
                    val[numero]=value;
                }
                this.alumnos = data.alumnos;
            } catch (error) {
                
            }
        },

        closeModalSolicitudes(){
            EventBus.$emit("cerrarModalSolicitud");
             
        }
    },

    mounted(){
        this.ObtenerInfoLab();
        console.log(this.datosProyecto.alumExist)
        EventBus.$on("verSolicitudesProyecto", (proyecto)=>{
           this.Infoproyecto = proyecto;
           this.ObtenerInfoLab();
           this.obtenerAlumnos();
        });

        document.addEventListener("keydown", event => {
            const keypressed = event.key;
            if(keypressed === "Escape"){
                EventBus.$emit("cerrarModalSolicitud")
            }
        });
    }
}
</script>