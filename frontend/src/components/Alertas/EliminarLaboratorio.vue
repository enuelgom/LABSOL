<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Laboratorio eliminado! <v-btn color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-row justify="center">
            <v-dialog v-model="eliminarLab" max-width="350" persistent>
                <v-card>
                    <v-toolbar color="red" dark>
                        <v-row justify="center">
                            <v-card-title>¡Alerta!</v-card-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <v-row class="mt-4" justify="center">
                            <p class="text-center"><strong>¿Está seguro que desea borrar este laboratorio?</strong></p>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row justify="center">
                             <v-col cols="6" sm="6" >
                                <v-btn class="mx-5" style="width:100px; height:35px;" color="error" @click="cerrarAlertaBorrarLab" outlined>Cancelar</v-btn>
                            </v-col>
                            <v-col cols="6" sm="6">
                                <v-btn class="mx-4" style="width:100px; height:35px;" color="success" @click="borrarLaboratorio" outlined>Aceptar</v-btn>
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
    name: "EliminarLaboratorio",
    props: ["eliminarLab"],

    data: ()=>({
        msjsuccess: false,
        siglasLab: ""
    }),

    methods: {
        cerrarAlertaBorrarLab(){
            EventBus.$emit("cerrarAlertaBorrarLaboratorio");
        },

        async borrarLaboratorio(){
            try {
                const {data} = await apolloClient.mutate({
                  mutation:gql`
                    mutation($siglas: String!)
                    {
                        eliminarLaboratorio(nombre: $siglas)
                    }
                  `,
                  variables:{
                      siglas: this.siglasLab
                  }
                })
                EventBus.$emit("actualizarCardsLabs");
                this.cerrarAlertaBorrarLab();
            } catch (error) {
                console.log(error)
            }
        }

    },

    mounted(){
        EventBus.$on("siglasLaboratorio", (siglas)=>{
            this.siglasLab = siglas;
        });
    }
    
}
</script>
