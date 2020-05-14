<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Administrador eliminado! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-row justify="center">
            <v-dialog v-model="eliminarAdmin" max-width="350" persistent>
                <v-card>
                    <v-toolbar color="red" dark>
                        <v-row justify="center">
                            <v-card-title>¡Alerta!</v-card-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <v-row class="mt-4" justify="center">
                            <p class="text-center"><strong>¿Está seguro que desea borrar este administrador?</strong></p>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row justify="center">
                             <v-col cols="6" sm="6" >
                                <v-btn class="mx-5" style="width:100px; height:35px; outline:none;" color="error" @click="cerrarAlertaBorrarAdmin" outlined>Cancelar</v-btn>
                            </v-col>
                            <v-col cols="6" sm="6">
                                <v-btn class="mx-4" style="width:100px; height:35px; outline:none;" color="success" @click="borrarAdministrador" outlined>Aceptar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import { EventBus } from "@/EventBus"
import { apolloClient } from '../../graphql/apollo'
import gql from 'graphql-tag'

export default {
    name: "EliminarAdministrador",
    props: ["eliminarAdmin"],

    data: ()=>({
        msjsuccess: false,
        idAdmin: ""
    }),

    methods: {
        cerrarAlertaBorrarAdmin(){
            EventBus.$emit("cerrarAlertaBorrarAdministrador");
        },

        async borrarAdministrador(){
            try {
                const {data} = await apolloClient.mutate({
                  mutation:gql`
                    mutation($id: String!){
                            deleteAdmin(_id: $id)
                        }
                    `,
                  variables:{
                      id: this.idAdmin
                  }
                })
                EventBus.$emit("ActualizarTablaDeAdministradores");
                this.msjsuccess = true;
                setTimeout(() => {
                    this.msjsuccess = false;
                    this.cerrarAlertaBorrarAdmin();
                }, 2000);
            } catch (error) {
                console.log(error)
            }
        }

    },

    mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key; 
            if(keypressed === "Escape"){
                this.cerrarAlertaBorrarAdmin();
            }    
        });

        EventBus.$on("enviarIDAdministrador", (id)=>{
            this.idAdmin = id;
        });
    }
    
}
</script>
