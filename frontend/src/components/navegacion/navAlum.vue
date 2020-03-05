<template>
    <div>
        <v-toolbar color="primary" dark>
            <v-toolbar-items>
                <v-img class="my-4" src="@/assets/cozyt.png"  style="height: 35px; width: 180px;" />
                <v-img class="mt-1 mb-1 mx-3" style="position: relative; height: 52px; width: 42px;" src="@/assets/labsol.png" />
                <v-img class="pb-3" style="position: relative; height: 60px; width: 90px;" src="@/assets/ILN.png" />
            </v-toolbar-items>
            <v-spacer />
            <v-toolbar-title>{{ usuarioLogeado.nombre.toUpperCase() }}</v-toolbar-title>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" v-on="on" :to="{ name: 'Perfil'}">
                        <v-icon>fa fa-user</v-icon>
                    </v-btn>
                </template>
                <span>Mi perfil</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" v-on="on" @click="logOut">
                        <v-icon>fa fa-sign-out-alt</v-icon>
                    </v-btn>
                </template>
                <span>Cerrar sesion</span>
            </v-tooltip>
        </v-toolbar>
        <Logout :confirmacionLogout="abrirLogout"/>
    </div>
</template>

<script>
import { mapState } from "vuex"
import Logout from '../Logout'
import { EventBus } from "@/EventBus"

export default {
    name: "navAlumno",
    components: { Logout },

    data: ()=>({
        abrirLogout: false
    }),

    computed:{
        ...mapState(["usuarioLogeado"])
    },
    
    methods: {
        logOut(){
            this.abrirLogout = true;
        },
    },

    mounted(){
        EventBus.$on("cerrarLogoutAlumno", ()=>{
            this.abrirLogout = false;
        })
    }
}
</script>