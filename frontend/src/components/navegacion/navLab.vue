<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Datos actualizados! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-snackbar color="red" v-model="msjerror" top>¡{{ msjErrorActualizacion }}! <v-btn style="outline:none;" color="white" text @click="msjerror=false">Cerrar</v-btn></v-snackbar>

         <v-toolbar color="white" class="mostrarNavbar">
            <v-row justify="center">
                <v-toolbar-items>
                    <v-img aspect-ratio="2" contain class="mt-1 mb-1 mx-3" style="position: relative; height: 52px; width: 42px;" src="../../assets/labsol.png" />
                    <v-img aspect-ratio="2" contain class="mt-2" src="../../assets/cozyt.png"  style="height: 45px; width: 220px;" />
                    <v-img class="pb-3" style="position: relative; height: 60px; width: 90px;" src="../../assets/ILN.png" />
                </v-toolbar-items>
            </v-row>
        </v-toolbar>

        <v-toolbar color="secondary">
            <v-toolbar-items class="ocultarDiv">
                <v-img class="my-4" src="../../assets/cozyt.png"  style="height: 35px; width: 180px;" />
                <v-img class="mt-1 mb-1 mx-3" style="position: relative; height: 52px; width: 42px;" src="../../assets/labsol.png" />
                <v-img class="pb-3" style="position: relative; height: 60px; width: 90px;" src="../../assets/ILN.png" />
            </v-toolbar-items>
            <v-spacer />
            <v-toolbar-title v-if="usuarioLogeado.tipUsuario==='1'">{{ usuarioLogeado.siglas.toUpperCase() }}</v-toolbar-title>
            <v-toolbar-title v-else>{{ usuarioLogeado.siglas.toUpperCase() }} (Colaborador)</v-toolbar-title>
             <v-tooltip bottom v-if="usuarioLogeado.tipUsuario === '1.1'">
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" text icon @click="abrirModalActualizarColaborador" v-on="on">
                        <v-icon>fa fa-edit</v-icon>
                    </v-btn>
                </template>
                <span>Editar cuenta</span>
            </v-tooltip>
            <v-tooltip bottom v-if="usuarioLogeado.tipUsuario === '1'">
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" text icon @click="abrirModalActualizar" v-on="on">
                        <v-icon>fa fa-edit</v-icon>
                    </v-btn>
                </template>
                <span>Editar cuenta</span>
            </v-tooltip>
             <v-tooltip bottom v-if="usuarioLogeado.tipUsuario === '1'">
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" text icon @click="abrirModelAgregarUsuario" v-on="on">
                        <v-icon>fa fa-user-plus</v-icon>
                    </v-btn>
                </template>
                <span>Agregar colaborador</span>
            </v-tooltip>
            <v-tooltip bottom v-if="usuarioLogeado.tipUsuario === '1'">
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" text icon v-on="on" @click="abrirModalRegProyecto">
                        <v-icon>fa fa-plus</v-icon>
                    </v-btn>
                </template>
                <span>Nuevo proyecto</span>
            </v-tooltip>
            <v-tooltip bottom v-if="usuarioLogeado.tipUsuario === '1'">
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" text icon @click="abrirCalendario" v-on="on">
                        <span><v-icon size="28">mdi-calendar-blank</v-icon></span>
                    </v-btn>
                </template>
                <span>Fecha de solicitudes</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <v-btn style="outline:none;" text icon color="" v-on="on" @click="logOut">
                    <v-icon>fa fa-sign-out-alt</v-icon>
                  </v-btn>
                </template>
                <span>Cerrar sesión</span>
            </v-tooltip>
        </v-toolbar>
        <NuevoProyecto :abrirRegProyecto="añadirProyecto"/>
        <Logout :confirmacionLogout="abrirLogout"/>
        <EditarDatos :EditarDatosLab="ActulizarLab"/>
        <AgregarColaborador :agregarUsuario="AbrirAgregarUsuario" />
        <ActualizarDatos :modalActDatosColab="actDatosColaborador" />
        <SesionExpirada :sesionExpirada="expSession"/>
        <FechaSolicitudes :fechaSolicitudes="seleccionarFecha" />
    </div>
</template>

<script>
import SesionExpirada from '../Alertas/SesionExpirada'
import { mapState } from "vuex"
import { EventBus } from "@/EventBus"
import NuevoProyecto from "../Laboratorio/NuevoProyecto"
import Logout from '../Logout'
import EditarDatos from '../Laboratorio/EditarDatos'
import AgregarColaborador from '@/components/Laboratorio/AgregarColaborador'
import ActualizarDatos from '@/components/Colaborador/ActualizarDatos'
import FechaSolicitudes from '@/components/Laboratorio/FechaSolicitudes'

export default {
    name: "navLab",
    components: { NuevoProyecto, Logout, EditarDatos, AgregarColaborador, ActualizarDatos, SesionExpirada, FechaSolicitudes },

    data: () => ({
        expSession: false,
        actDatosColaborador: false,
        msjErrorActualizacion: "",
        msjsuccess: false,
        msjerror: false,
        añadirProyecto: false,
        abrirLogout: false,
        ActulizarLab: false,
        AbrirAgregarUsuario: false,
        desabilitar: false,
        seleccionarFecha: false
    }),
    
    computed:{
        ...mapState(["usuarioLogeado"])
    },

    methods: {
        abrirModalActualizarColaborador(){
            this.actDatosColaborador = true;
        },

        abrirModalRegProyecto(){
            this.añadirProyecto = true;
        },

        logOut(){
            this.abrirLogout = true;
        },

        abrirModalActualizar(){
            this.ActulizarLab = true;
        },

        abrirModelAgregarUsuario(){
            this.AbrirAgregarUsuario = true;
        },

        sessexp(){
            this.expSession = true;
        },

        abrirCalendario(){
            this.seleccionarFecha = true;
        }
    },

    mounted(){
        EventBus.$on('cerrarFechaSolicitudes', () =>{
            this.seleccionarFecha = false;
        });
        
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
            }, 1500);
        });

        EventBus.$on("cerrarModalRegUsuario", ()=>{
            this.AbrirAgregarUsuario = false;
        });

        EventBus.$on("cerrarModalAgregarColab", ()=>{
            setTimeout(() => {
                this.AbrirAgregarUsuario = false;
            }, 1500);
        });

        EventBus.$on("cerrarModalActDatosColab", ()=>{
            this.actDatosColaborador = false;
        });

        EventBus.$on("sessionExpiredAdm", ()=>{
            this.expSession = true;
        });
    }
}
</script>

<style scoped>
  @media screen and (max-width: 805px) {
    .ocultarDiv{
      display: none;
    }
  }

  @media screen and (max-width: 805px) {
    .mostrarNavbar{
      visibility: visible;
    }
  }

  @media screen and (min-width: 805px){
    .mostrarNavbar{
     display: none;
    }
  } 
</style>