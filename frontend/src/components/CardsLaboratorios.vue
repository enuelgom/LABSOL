<template>
    <v-container>
        <v-row class="justify-center">
            <h1 class="title font-weight-medium">ECOSISTEMA DE LABORATORIOS</h1>
        </v-row>
        <v-card elevation="0" class="mt-1">
            <v-tabs v-model="lab" background-color="blue-grey lighten-3" centered >
            <v-tabs-slider></v-tabs-slider>
            <v-tab style="color: black;" class="font-weight-medium" href="#intel">INTEL</v-tab>
            <v-tab style="color: black;" class="font-weight-medium" href="#labsol">LABSOL</v-tab>

            <v-tabs-items v-model="lab">
                <v-tab-item value="intel">
                    <v-card flat>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4" lg="3" sm="6"  class="my-2" v-for="item of DatosIntel" :key="item.nombre">
                                    <v-hover v-slot:default="{ hover }" open-delay="200">
                                        <v-card style="width: 150%" height="100%" :elevation="hover ? 16 : 2">
                                            <v-toolbar color="white" elevation="1">
                                            <v-card-title class="text-center">{{ item.siglas.toUpperCase()}}</v-card-title>
                                                <v-spacer />
                                                <v-badge v-if="item['notificaciones'] != '' && usuarioLogeado.tipUsuario === '0'" :content="item['notificaciones']" :value="item['notificaciones']" color="red" overlap>
                                                    <v-icon color="blue">fa fa-bell</v-icon>
                                                </v-badge>
                                            </v-toolbar>
                                            <v-card-text style="height: 200px;">
                                                <v-container style="width: 42%; margin: 0 auto 0 auto; padding: 1%;">
                                                    <v-img id="redimencionar" style="max-width: 100%;" :src="item.imagenLogo" />
                                                </v-container>
                                            </v-card-text>
                                            <v-card-text class="font-weight-bold">
                                                <p class="body-2">{{ item.nombre }}</p>
                                                Total de proyectos: {{ item.count }}
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-if="usuarioLogeado.tipUsuario === '0'" >Ver proyectos</v-btn> 
                                                <v-btn dark block color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="usuarioLogeado.tipUsuario === '1' && item['nombre'] === usuarioLogeado.nombre">Mis proyectos</v-btn>
                                                <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="usuarioLogeado.tipUsuario === '1'">Ver proyectos</v-btn>
                                                <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="usuarioLogeado.tipUsuario === '2'">Ver catalogo</v-btn>
                                                <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else>Ver catalogo</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-hover>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item value="labsol">
                    <v-card flat>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4" lg="3" sm="6"  v-for="item of DatosLabsol" :key="item.nombre" class="my-2">
                                    <v-hover v-slot:default="{ hover }" open-delay="200">
                                        <v-card style="width: 150%" height="100%" :elevation="hover ? 16 : 2">
                                            <v-toolbar color="white" elevation="1">
                                            <v-card-title class="text-center">{{ item.siglas.toUpperCase() }}</v-card-title>
                                                <v-spacer />
                                                <v-badge v-if="item['notificaciones'] != '' && usuarioLogeado.tipUsuario === '0'" :content="item['notificaciones']" :value="item['notificaciones']" color="red" overlap>
                                                    <v-icon color="blue">fa fa-bell</v-icon>
                                                </v-badge>
                                            </v-toolbar>
                                            <v-card-text style="height: 200px;">
                                                <v-container style="width: 42%; margin: 0 auto 0 auto; padding: 1%;">
                                                    <v-img id="redimencionar" style="max-width: 100%;" :src="item.imagenLogo" />
                                                </v-container>
                                            </v-card-text>
                                            <v-card-text class="font-weight-bold">
                                                <p class="body-2">{{ item.nombre }}</p>
                                                Total de proyectos: {{ item.count }}
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-btn text color="blue-grey darken-3" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-if="usuarioLogeado.tipUsuario === '0'" >Ver proyectos</v-btn> 
                                        <v-btn dark block color="blue-grey darken-3" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="usuarioLogeado.tipUsuario === '1' && item['nombre'] === usuarioLogeado.nombre">Mis proyectos</v-btn>
                                                <v-btn text color="blue-grey darken-3" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="usuarioLogeado.tipUsuario === '1'">Ver proyectos</v-btn>
                                                <v-btn text color="blue-grey darken-3" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="usuarioLogeado.tipUsuario === '2'">Ver catalogo</v-btn>
                                                <v-btn text color="blue-grey darken-3" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else>Ver catalogo</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-hover>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
import { mapState } from "vuex"
import gql from 'graphql-tag'
import { EventBus } from "../EventBus"
import axios from "axios";


export default {
    name: "CardsLaboratorios",
    
   data () {
      return {
        lab:null,
        labsol: null,
        intel: null,
        DatosIntel:[],
        DatosLabsol: [],
        ruta: ""
      }
    },

    computed: {
        ...mapState(['usuarioLogeado'])
    },

    methods: {
        // Consultar todos los laboratorio
        async obtenerLaboratorios(){
            this.DatosIntel = [];
            this.DatosLabsol = [];
            try {
                const { data } = await this.$apollo.query({
                    query: gql`
                        query{
                            allLabs{
                                nombre
                                siglas
                                tipoLaboratorio
                                count
                                notificaciones
                            }
                        }
                    `,
                })   
                
                for(let val of data.allLabs){
                    if(val.tipoLaboratorio === "Intel"){
                        this.DatosIntel.push(val);
                    }else{
                        this.DatosLabsol.push(val)
                    }
                }

                // Obtener las imagenes de cada laboratorio labsol
                for(let i of this.DatosLabsol){
                  const dataImage = await axios.get(`/api/logos/sendImg/${i.nombre}`,{
                       responseType: "arraybuffer",
                       headers: {
                           Autorization: localStorage.getItem("token")
                       }
                   })

                   const logo = window.URL.createObjectURL(
                       new Blob([dataImage.data], {type: "image/png"})
                   )
                      
                    Object.defineProperty(i, "imagenLogo", {value: logo})
                }

                // Obtener las imagenes de cada laboratorio intel
                for(let i of this.DatosIntel){
                  const dataImage = await axios.get(`/api/logos/sendImg/${i.nombre}`,{
                       responseType: "arraybuffer",
                       headers: {
                           Autorization: localStorage.getItem("token")
                       }
                   })

                   const logo = window.URL.createObjectURL(
                       new Blob([dataImage.data], {type: "image/png"})
                   )
                      
                    Object.defineProperty(i, "imagenLogo", {value: logo})
                }

            } catch (error) {  }
        },
    },

    created(){
        this.obtenerLaboratorios();
    },

    mounted(){
        EventBus.$on("actualizar", ()=>{
            this.obtenerLaboratorios();
        });

        EventBus.$on("actualizarCardsLab", ()=>{
            this.obtenerLaboratorios();
        });

        EventBus.$on("updateNameLab", ()=>{
            this.obtenerLaboratorios();
        });
    }
}
</script>
