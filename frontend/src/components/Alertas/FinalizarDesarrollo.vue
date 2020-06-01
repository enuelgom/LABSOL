<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Proyecto finalizado! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-row justify="center"> 
            <v-dialog v-model="finalizarDesarrollo" max-width="350" persistent>
                <v-card>
                    <v-toolbar color="success" dark>
                        <v-row justify="center">
                            <v-card-title>¡Aviso!</v-card-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <v-row class="mt-4" justify="center">
                            <p class="text-center"><strong>¿Desea finalizar el desarrollo de este proyecto?</strong></p>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row justify="center">
                            <v-col cols="6" sm="6" >
                                <v-btn class="mx-5" style="width:100px; height:35px; outline:none;" color="error" @click="cerrarModal" outlined>Cancelar</v-btn>
                            </v-col>
                            <v-col cols="6" sm="6">
                                <v-btn class="mx-4" style="width:100px; height:35px; outline:none;" color="success" @click="finalizarDesarrolloProyecto" outlined>Aceptar</v-btn>
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
    name: "FinalizarDesarrollo",
    props: ["finalizarDesarrollo"],

    data:()=>({
        nomProyecto: "",
        nomLab: "",
        msjsuccess: false
    }),

    methods: {
        cerrarModal(){
           
        },

        async finalizarDesarrolloProyecto(){
            try {
                const {data} = await apolloClient.mutate({
                    mutation: gql`
                        mutation()
                        {
                          
                        }
                    `,
                    variables: {
                       
                    }
                })
               
            } catch (error) {
                console.log(error);
            }
        }
    },

    mounted(){
        
    }
}
</script>
