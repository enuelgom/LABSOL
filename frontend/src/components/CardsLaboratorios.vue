<template>
    <v-container>
        <v-row class="justify-center">
            <h1 class="title font-weight-medium">ECOSISTEMA DE LABORATORIOS</h1>
        </v-row>
        <v-card elevation="0" class="mt-1">
            <v-tabs v-model="lab" background-color="#CFD8DC" centered >
            <v-tabs-slider></v-tabs-slider>
            <v-tab style="color: black; text-decoration:none;" id="INTEL" class="font-weight-medium" href="#intel">INTEL</v-tab>
            <v-tab style="color: black; text-decoration:none;" id="LABSOL" class="font-weight-medium" href="#labsol">LABSOL</v-tab>
            
            <v-tabs-items v-model="lab">
                <v-tab-item value="intel">
                    <v-card flat>
                        <v-row v-if="DatosIntel==''" style="aling-items: center; justify-content: center" justify="center">
                            <div class="loader">Loading...</div>
                        </v-row>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4" lg="3" sm="6"  class="my-2" v-for="item of DatosIntel" :key="item.nombre">
                                    <v-hover v-slot:default="{ hover }" open-delay="200">
                                        <v-card style="width: 150%" height="100%" :elevation="hover ? 16 : 2">
                                            <v-toolbar color="white" elevation="1">
                                            <v-card-title class="text-center">{{ item.siglas.toUpperCase()}}</v-card-title>
                                                <v-spacer />
                                                <v-btn style="outline:none;" @click="alertaBorrar(item.siglas)" v-if="usuarioLogeado.tipUsuario === '0' && privilegios.c " icon color="error"><v-icon>fa fa-trash</v-icon></v-btn>
                                                <v-badge v-if="item['notificaciones'] != '' && usuarioLogeado.tipUsuario === '0'" :content="item['notificaciones']" :value="item['notificaciones']" color="red" overlap>
                                                    <v-icon color="blue">fa fa-bell</v-icon>
                                                </v-badge>
                                            </v-toolbar>
                                            <v-card-text style="height: 200px;">
                                                <v-container style="width: 100%; margin: 0 auto 0 auto; padding: 1%;">
                                                    <v-img v-if="item.imagenLogo" id="redimencionar" style="max-height: 200px; max-width: 200px; margin: auto auto auto auto; " :src="item.imagenLogo" />
                                                    <v-img v-else style="max-height: 200px; max-width: 150px;  margin-left: auto; margin-right: auto; align: middle; filter: grayscale(1); opacity: 0.2;" src="../assets/labsol.png" />
                                                </v-container>
                                            </v-card-text>
                                            <v-card-text style="height: 90px;" class="font-weight-bold">
                                                <p class="body-2" style="height:30px;">{{ item.nombre }}</p>
                                                Total de proyectos: {{ item.count }}
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-btn style="outline:none; text-decoration:none;" text color="botones" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-if="usuarioLogeado.tipUsuario === '0'" >Ver proyectos</v-btn> 
                                                <v-btn style="outline:none; text-decoration:none;" dark block color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="(usuarioLogeado.tipUsuario === '1' || usuarioLogeado.tipUsuario === '1.1') && item['nombre'] === usuarioLogeado.nombre">Mis proyectos</v-btn>
                                                <v-btn style="outline:none; text-decoration:none;" text color="botones" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="usuarioLogeado.tipUsuario === '1'">Ver proyectos</v-btn>
                                                <v-btn style="outline:none; text-decoration:none;" text color="botones" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="usuarioLogeado.tipUsuario === '2'">Ver catalogo</v-btn>
                                                <v-btn style="outline:none; text-decoration:none;" text color="botones" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else>Ver catalogo</v-btn>
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
                        <v-row v-if="DatosLabsol==''" style="aling-items: center; justify-content: center" justify="center">
                            <div class="loader">Loading...</div>
                        </v-row>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4" lg="3" sm="6"  v-for="item of DatosLabsol" :key="item.nombre" class="my-2">
                                    <v-hover v-slot:default="{ hover }" open-delay="200">
                                        <v-card style="width: 150%" height="100%" :elevation="hover ? 16 : 2">
                                            <v-toolbar color="white" elevation="1">
                                            <v-card-title class="text-center">{{ item.siglas.toUpperCase() }}</v-card-title>
                                                <v-spacer />
                                                <v-btn style="outline:none;" @click="alertaBorrar(item.siglas)" v-if="usuarioLogeado.tipUsuario === '0' && privilegios.c " icon color="error"><v-icon>fa fa-trash</v-icon></v-btn>
                                                <v-badge v-if="item['notificaciones'] != '' && usuarioLogeado.tipUsuario === '0'" :content="item['notificaciones']" :value="item['notificaciones']" color="red" overlap>
                                                    <v-icon color="blue">fa fa-bell</v-icon>
                                                </v-badge>
                                            </v-toolbar>
                                            <v-card-text style="height: 200px;">
                                                <v-container style="width: 100%; margin: 0 auto 0 auto; padding: 1%;">
                                                    <v-img v-if="item.imagenLogo" id="redimencionar" style="max-height: 200px; max-width: 200px; margin: auto auto auto auto;" :src="item.imagenLogo" />
                                                    <v-img v-else style="max-height: 200px; max-width: 150px;  margin-left: auto; margin-right: auto; align: middle; filter: grayscale(1); opacity: 0.2;" src="../assets/labsol.png" />
                                                    <!-- <v-img id="redimencionar" style="max-width: 100%;" :src="item.imagenLogo" /> -->
                                                </v-container>
                                            </v-card-text>
                                            <v-card-text style="height: 90px;" class="font-weight-bold">
                                                <p class="body-2" style="height:30px;">{{ item.nombre }}</p>
                                                Total de proyectos: {{ item.count }}
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-btn style="outline:none; text-decoration:none;" text color="botones" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-if="usuarioLogeado.tipUsuario === '0'" >Ver proyectos</v-btn> 
                                                <v-btn style="outline:none; text-decoration:none;" dark block color="blue-grey darken-3" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="(usuarioLogeado.tipUsuario === '1' || usuarioLogeado.tipUsuario === '1.1') && item['nombre'] === usuarioLogeado.nombre">Mis proyectos</v-btn>
                                                <v-btn style="outline:none; text-decoration:none;" text color="botones" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="usuarioLogeado.tipUsuario === '1'">Ver proyectos</v-btn>
                                                <v-btn style="outline:none; text-decoration:none;" text color="botones" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else-if="usuarioLogeado.tipUsuario === '2'">Ver catalogo</v-btn>
                                                <v-btn style="outline:none; text-decoration:none;" text color="botones" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.siglas} }" v-else>Ver catalogo</v-btn>
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
        <EliminarLaboratorio :eliminarLab="abrirAlertaBorrarLab"/>
    </v-container>
</template>

<script>
import { mapState } from "vuex"
import gql from 'graphql-tag'
import { EventBus } from "../EventBus"
import axios from "axios"
import EliminarLaboratorio from "@/components/Alertas/EliminarLaboratorio"


export default {
    name: "CardsLaboratorios",
    components: { EliminarLaboratorio },

   data () {
      return {
        cargando: true,
        abrirAlertaBorrarLab: false,
        siglasLab: "",
        lab:null,
        labsol: null,
        intel: null,
        DatosIntel:[],
        DatosLabsol: [],
        ruta: "",
        privilegios: {
            c: false,
        }
      }
    },

    computed: {
        ...mapState(['usuarioLogeado'])
    },

    methods: {
        // Abrir alerta borrar laboratorio
        alertaBorrar(siglas){
            this.abrirAlertaBorrarLab = true;
            this.siglasLab = siglas;
            EventBus.$emit("siglasLaboratorio", this.siglasLab);
        },

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

                // Obtener las imagenes de cada laboratorio labsol
                for(let i of data.allLabs){
                    try {
                        
                        if(i.tipoLaboratorio==="Labsol"){
                            const dataImage = await axios.get(`api/logos/sendImg/${i.nombre}`,{
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
                    
                    } catch (error) {
                        
                    }
                }
                
                // Obtener las imagenes de cada laboratorio intel
                for(let i of data.allLabs){
                    try{

                        if(i.tipoLaboratorio==="Intel"){
                            const dataImage1 = await axios.get(`api/logos/sendImg/${i.nombre}`,{
                                responseType: "arraybuffer",
                                headers: {
                                    Autorization: localStorage.getItem("token")
                                }
                            })
                            const logo = window.URL.createObjectURL(
                                new Blob([dataImage1.data], {type: "image/png"})
                            )
                            Object.defineProperty(i, "imagenLogo", {value: logo})
                        }
                    }catch(e){
                    }
                }
                this.DatosIntel = [];
                this.DatosLabsol = [];
                for(let val of data.allLabs){
                    if(val.tipoLaboratorio === "Intel"){
                        if(this.usuarioLogeado.nombre===val.nombre){
                            this.DatosIntel.push(val);
                            try {
                                document.getElementById("INTEL").click()
                            } catch (error) {}
                        }
                    }else{
                        if(this.usuarioLogeado.nombre===val.nombre){
                            this.DatosLabsol.push(val);
                            try {
                                document.getElementById("LABSOL").click()
                            } catch (error) {}
                        }
                    }
                }
                setTimeout(() => {
                for(let val of data.allLabs){
                    if(val.tipoLaboratorio === "Intel"){
                        if(this.usuarioLogeado.nombre!=val.nombre){
                            this.DatosIntel.push(val);
                        }
                    }else{
                        if(this.usuarioLogeado.nombre!=val.nombre){
                            this.DatosLabsol.push(val);
                        }
                    }
                }   
                }, 200);
                
            } catch (error) {  }

        },
    },

    created(){
        this.obtenerLaboratorios();
    },

    mounted(){
        try {
            if (this.usuarioLogeado.p.includes("A")) {
                this.privilegios.c=true;
            }else{
                if (this.usuarioLogeado.p.includes("C")) {
                    this.privilegios.c=true;
                }
            }
        } catch(e){}

        EventBus.$on("actualizar", ()=>{
            this.obtenerLaboratorios();
        });

        EventBus.$on("actualizarCardsLab", ()=>{
            this.obtenerLaboratorios();
        });

        EventBus.$on("updateNameLab", ()=>{
            this.obtenerLaboratorios();
        });

        EventBus.$on("cerrarAlertaBorrarLaboratorio", ()=>{
            this.abrirAlertaBorrarLab = false;
        });

        EventBus.$on("actualizarCardsLabs", ()=>{
            
            this.obtenerLaboratorios();
        });
    }
}
</script>

<style scoped>
.loader,
.loader:before,
.loader:after {
  background: #96a3a9;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  color: #96a3a9;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
</style>