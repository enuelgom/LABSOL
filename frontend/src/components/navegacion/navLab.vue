<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Datos actualizados! <v-btn color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-snackbar color="red" v-model="msjerror" top>¡{{ msjErrorActualizacion }}! <v-btn color="white" text @click="msjerror=false">Cerrar</v-btn></v-snackbar>

        <v-toolbar color="primary" dark>
            <v-toolbar-items>
               <v-img class="my-4" src="@/assets/cozyt.png"  style="height: 35px; width: 180px;" />
                <v-img class="mt-1 mb-1 mx-3" style="position: relative; height: 52px; width: 42px;" src="@/assets/labsol.png" />
                <v-img class="pb-3" style="position: relative; height: 60px; width: 90px;" src="@/assets/ILN.png" />
            </v-toolbar-items>
            <v-spacer />
            <v-toolbar-title>{{ usuarioLogeado.siglas.toUpperCase() }}</v-toolbar-title>
             <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" @click="abrirModalActualizar" v-on="on">
                        <v-icon>fa fa-edit</v-icon>
                    </v-btn>
                </template>
                <span>Editar cuenta</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" v-on="on" @click="abrirModalRegProyecto">
                        <v-icon>fa fa-plus</v-icon>
                    </v-btn>
                </template>
                <span>Nuevo proyecto</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <v-btn text icon color="" v-on="on" @click="logOut">
                    <v-icon>fa fa-sign-out-alt</v-icon>
                  </v-btn>
                </template>
                <span>Cerrar sesión</span>
            </v-tooltip>
        </v-toolbar>
        <NuevoProyecto :abrirRegProyecto="añadirProyecto"/>
        <Logout :confirmacionLogout="abrirLogout"/>
        <EditarDatos :EditarDatosLab="ActulizarLab"/>
    </div>
</template>

<script>
import { mapState } from "vuex"
import { EventBus } from "@/EventBus"
import NuevoProyecto from "../Laboratorio/NuevoProyecto"
import Logout from '../Logout'
import EditarDatos from '../Laboratorio/EditarDatos'

export default {
    name: "navLab",
    components: { NuevoProyecto, Logout, EditarDatos },

    data: () => ({
        msjErrorActualizacion: "",
        msjsuccess: false,
        msjerror: false,
        añadirProyecto: false,
        abrirLogout: false,
        ActulizarLab: false,
    }),
    
    computed:{
        ...mapState(["usuarioLogeado"])
    },

    methods: {
        abrirModalRegProyecto(){
            this.añadirProyecto = true;
        },

        logOut(){
            this.abrirLogout = true;
        },

        abrirModalActualizar(){
            this.ActulizarLab = true;
        }
    },

    mounted(){
        EventBus.$on('cerrarRegistroProyecto', () =>{
            this.añadirProyecto = false;
        });

        EventBus.$on("cerrarModalRegProyecto", ()=>{
            this.añadirProyecto = false
        });

        EventBus.$on("cerrarLogoutLab", ()=>{
            this.abrirLogout = false;
        });

        EventBus.$on("cerrarModalActualizarLab", ()=>{
            this.ActulizarLab = false;
        });

        EventBus.$on("msjErrorActualizarLab", (msj)=>{
            this.msjErrorActualizacion = msj;
            this.msjerror = true;
            setTimeout(() => {
                this.msjerror = false;
            }, 3000);
        });

        EventBus.$on("msjDatosLabActualizados", ()=>{
            this.msjsuccess = true;
            setTimeout(() => {
                this.msjsuccess = false;
            }, 3000);
        });

        EventBus.$on("cerrarModalActualizacion", ()=>{
            setTimeout(() => {
                this.ActulizarLab = false;
            }, 3000);
        })
    }


}
</script>