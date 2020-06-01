<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Proyecto en desarrollo! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-row justify="center"> 
            <v-dialog v-model="iniciarDesarrollo" max-width="350" persistent>
                <v-card>
                    <v-toolbar color="success" dark>
                        <v-row justify="center">
                            <v-card-title>¡Aviso!</v-card-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <v-row class="mt-4" justify="center">
                            <p class="text-center"><strong>{{ mensaje }}</strong></p>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row justify="center">
                            <v-col cols="6" sm="6" >
                                <v-btn class="mx-5" style="width:100px; height:35px; outline:none;" color="error" @click="cerrarModal" outlined>Cancelar</v-btn>
                            </v-col>
                            <v-col cols="6" sm="6">
                                <v-btn class="mx-4" style="width:100px; height:35px; outline:none;" color="success" @click="iniciarDesarrolloProyecto" outlined>Aceptar</v-btn>
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
    name: "IniciarDesarrollo",
    props: ["iniciarDesarrollo"],

    data:()=>({
        nomProyecto: "",
        proyecto: "",
        estatus: "",
        mensaje: "",
        nomLab: "",
        msjsuccess: false
    }),

    methods: {
        cerrarModal(){
           EventBus.$emit("cerrarConfirmacionMsjIniciarDesarrollo");
        },

        iniciarDesarrolloProyecto(){
            EventBus.$emit("iniciarDesarrolloConfirm", this.proyecto, this.estatus);
        }
    },

    mounted(){
        EventBus.$on("iniciarDesarrollo",(proyecto, estatus, mensaje)=>{
            this.proyecto=proyecto;
            this.estatus = estatus;
            this.mensaje = mensaje;
        });
    }
}
</script>
