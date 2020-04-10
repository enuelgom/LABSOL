<template>
    <div> 
        <v-dialog v-model="visible" :fullscreen="isLab" :max-width="900" persistent>
            <v-card color="grey lighten-3">
                <v-toolbar color="primary" dark>
                    <v-card-title>Información del proyecto</v-card-title>
                        <v-spacer />
                        <v-btn style="outline:none;" icon @click="closeModalProyecto()"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="12" md="9" lg="9">
                                <v-text-field prepend-icon="fa fa-info" label="Nombre" v-model="datosProyecto.nombre" readonly/>
                            </v-col>
                            <v-col cols="12" sm="12" md="3" lg="3">
                                <v-text-field type="text" prepend-icon="fa fa-users" label="Alumnos requeridos" v-model="datosProyecto.alumnosRequeridos" min="1" readonly/>
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col cols="12" sm="12" md="6" lg="6">
                                <v-textarea rows="4" prepend-icon="fa fa-list-alt" label="Objetivo" v-model="datosProyecto.objetivo" readonly>
                                  <template v-slot:label>
                                    <div>
                                        <p>Objetivo</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="6" >
                                <v-textarea rows="4" prepend-icon="fa fa-list-alt" label="Alcences" v-model="datosProyecto.requerimientos" readonly>
                                  <template v-slot:label>
                                    <div>
                                        <p>Requerimientos</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="6" lg="6" >
                                <v-textarea rows="4" prepend-icon="fa fa-list-alt" label="Perfiles" v-model="datosProyecto.perfiles" readonly>
                                  <template v-slot:label>
                                    <div>
                                        <p>Perfiles</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="6" >
                                <v-textarea rows="4" prepend-icon="fa fa-list-alt" label="Habilidades" v-model="datosProyecto.habilidades" readonly>
                                  <template v-slot:label>
                                    <div>
                                        <p>Habilidades</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-row v-if="((usuarioLogeado.tipUsuario === '1' || usuarioLogeado.tipUsuario === '1.1') && usuarioLogeado.siglas ===this.$route.params.nameLab) && visible3">
                        <v-card-subtitle class="subtitle-2 font-weight-black ml-3" style="padding: 5px;"><strong>Integrantes del proyecto</strong></v-card-subtitle>
                            <v-col cols="12" sm="12" md="12" lg="12">
                                <v-data-table 
                                    :headers="headers"   
                                    class="elevation-1"
                                    hide-default-footer
                                    no-data-text="Aún no existen alumnos en este proyecto" 
                                    :footer-props="{itemsPerPageText:'Paginación'}" 
                                    :items="alumnos">
                                </v-data-table>
                            </v-col>
                        </v-row>
                        <v-row v-if="((usuarioLogeado.tipUsuario === '1' || usuarioLogeado.tipUsuario === '1.1')  && usuarioLogeado.siglas ===this.$route.params.nameLab)&& visible2">
                            <v-card-subtitle class="subtitle-2 font-weight-black ml-3" style="padding: 5px;"><strong>Cronograma de actividades</strong></v-card-subtitle>
                            <v-col cols="12" sm="12" md="12" lg="12">
                                <Metodologia />
                            </v-col>
                        </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import { EventBus } from '@/EventBus'
import { mapState } from "vuex"
import { apolloClient } from '../../graphql/apollo'
import Metodologia from '@/components/Proyectos/Metodologia'

export default {
    name: "Informacion",
    props: ["visible","nomProyecto"],
    components: {Metodologia},

    data: ()=>({
        colaboradores: "",
        isLab: false,
        visible2: false,
        Estatus: '',
        visible3: false,
        alumnos: [],
        Infoproyecto: "",
        datosProyecto:{
            alumnosRequeridos: "",
            nombre: "",
            objetivo: "",
            requerimientos: "",
            perfiles: "",
            habilidades: ""
        },
        headers: [
            {text: "Número", value: "numero"},
            {text: "Nombre", value: "nombre"},
            {text: "Institución", value: "institucion"},
            {text: "Carrera", value: "carrera"},
            {text: "Correo", value: "correo"},
            {text: "Teléfono", value: "telefono"},
        ],
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
                                objetivo
                                requerimientos
                                perfiles
                                habilidades
                                numAlu  
                            }
                        }
                    `,
                    variables: {
                        nombre: this.$route.params.nameLab,
                        proyecto: this.Infoproyecto
                    }   
                }) 

            this.datosProyecto.alumnosRequeridos =data.proyecto.numAlu;
            this.datosProyecto.nombre =data.proyecto.proyecto,
            this.datosProyecto.objetivo =data.proyecto.objetivo,
            this.datosProyecto.requerimientos =data.proyecto.requerimientos,
            this.datosProyecto.perfiles =data.proyecto.perfiles,
            this.datosProyecto.habilidades =data.proyecto.habilidades
               
            } catch (error) {
                
            } 
        },
        // Obtener los alumnos por proyecto
        async obtenerAlumnos(){
            let status = "Aceptado";
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

        async verficarMetodologia(){
            try {
                const {data} = await this.$apollo.query({
                query: gql`
                    query($nombre: String!, $proyecto: String!)
                    {
                        existeMetod(nombre: $nombre, proyecto: $proyecto)
                    }
                `,
                variables: {
                    nombre: this.usuarioLogeado.nombre,
                    proyecto: this.Infoproyecto
                }
                })
                if (data.existeMetod===null || data.existeMetod===false) {
                    this.visible2=false;
                }else{
                    this.visible2=true;
                    setTimeout(() => {
                        EventBus.$emit("tablaMetodologiaDatos", this.usuarioLogeado.nombre, this.Infoproyecto, data.existeMetod, this.colaboradores);
                    }, 500);
                }
            } catch (error) {
                console.log(error)
            }
        },


        closeModalProyecto(){
            this.visible2=false;
            setTimeout(() => {
                EventBus.$emit("CerrarVerProyecto")
                EventBus.$emit("vaciarTablaActividades")
            }, 10);
        }
    },

    mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key;
            if(keypressed === "Escape"){
                this.closeModalProyecto();
            }
        });
     
        EventBus.$on("VerInfoProyecto", ( nombre, proyecto, estatus, colaboradores)=>{
            this.Estatus = estatus;
            this.colaboradores = colaboradores;

        if (this.Estatus==='Nuevo') {
            this.visible3 = false;
        }else{
            this.visible3 = true;
        }
        
        if((this.usuarioLogeado.tipUsuario === '1' || this.usuarioLogeado.tipUsuario === '1.1')  && this.visible3){
            this.isLab = true;
        }else{
            this.isLab = false;
        }

            this.Infoproyecto = proyecto;
            this.ObtenerInfoLab();
            this.obtenerAlumnos();
            setTimeout(() => {
                this.verficarMetodologia();
            }, 300);
        });
    }
}
</script>

