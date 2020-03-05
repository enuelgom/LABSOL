<template>
    <div>
      <v-snackbar color="red" v-model="msjError" top :timeout="4000">¡{{ mensajeErrorLogin }}! <v-btn color="white" text @click="msjError=false">Cerrar</v-btn></v-snackbar>
        <!-- Navbar para logeo -->
      <v-toolbar color="amber lighten-1" dark> 
          <v-toolbar-items>
            <v-img aspect-ratio="2" contain class="my-3" src="@/assets/cozyt.png"  style="height: 35px; width: 180px;" />
            <v-img aspect-ratio="2" contain class="mt-1 mb-1 mx-3" style="position: relative; height: 52px; width: 42px;" src="@/assets/labsol.png" />
            <v-img class="pb-3" style="position: relative; height: 60px; width: 90px;" src="@/assets/ILN.png" />
          </v-toolbar-items>
          <v-spacer />
          <v-btn text @click="open"><span class="pa-1"><v-icon dense>fa fa-user</v-icon></span> Iniciar sesion</v-btn>
        </v-toolbar> 
        <Login :openModel="abrirLogin" />  
        <Registro :openModelStudent="openFormStudent"/>
    </div>
</template>
 
<script>
import Login from '@/components/Login.vue'
import { EventBus } from '../EventBus'
import Registro from '@/components/Alumnos/Registro.vue'

export default {
  name: 'Navbar',
  components: {Login, Registro},
  
  data: () => ({
    abrirLogin: false,
    mensajeErrorLogin: "",
    msjError: false,
    openFormStudent: false
  }),
 
  methods: {
    open(){
      this.abrirLogin = true;
    }
  },
 
  mounted(){
    EventBus.$on("closeLoginTachita",() => {
      this.abrirLogin = false;
    });

    EventBus.$on("errorLogin", (msj) => {
      this.mensajeErrorLogin = msj  
      this.msjError = true
    });
    
    EventBus.$on('closeModalStudent', ()=>{
      this.openFormStudent = false;    
    });

    EventBus.$on("openModalStudent", () => {
      this.openFormStudent = true;
    })

    EventBus.$on('cerrarRegistro', ()=>{
      this.openFormStudent = false;
    })

    EventBus.$on("regresarLogin", ()=>{
      this.abrirLogin = true;
    })


  }
}
</script>
