<template>
    <div>
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
            <v-toolbar-title>{{ usuarioLogeado.nombre.toUpperCase() }}</v-toolbar-title>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" text icon color="" v-on="on" :to="{ name: 'Perfil'}">
                        <v-icon>fa fa-user</v-icon>
                    </v-btn>
                </template>
                <span>Mi perfil</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" id="LG" text icon color="" v-on="on" @click="logOut">
                        <v-icon>fa fa-sign-out-alt</v-icon>
                    </v-btn>
                </template>
                <span>Cerrar sesion</span>
            </v-tooltip>
        </v-toolbar>
        <Logout :confirmacionLogout="abrirLogout"/>
        <SesionExpirada :sesionExpirada="expSession"/>
    </div>
</template>

<script>
import { mapState } from "vuex"
import { mapActions } from "vuex"
import Logout from '../Logout'
import { EventBus } from "@/EventBus"
import SesionExpirada from '../Alertas/SesionExpirada'

export default {
    name: "navAlumno",
    components: { Logout, SesionExpirada},

    data: ()=>({
        abrirLogout: false,
        expSession: false
    }),

    computed:{
        ...mapState(["usuarioLogeado"])
    },
    
    methods: {
        ...mapActions(["Logout"]),

        logOut(){
            this.abrirLogout = true;
        },
        sessexp(){
            this.expSession = true;
        }
    },

    mounted(){
        EventBus.$on("cerrarLogoutAlumno", ()=>{
            this.abrirLogout = false;
        })

        EventBus.$on("sessionExpiredAlu", ()=>{
            this.expSession = true;
            setTimeout(() => {
                this.Logout();
            }, 5000);
        })
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