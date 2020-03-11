<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Solicitud cancelada! <v-btn color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-row justify="center"> 
            <v-dialog v-model="cancelarSolicitudAlumno" max-width="350" persistent>
                <v-card>
                    <v-toolbar color="red" dark>
                        <v-row justify="center">
                            <v-card-title>¡Alerta!</v-card-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <v-row class="mt-1" justify="center">
                            <p><strong>¿Estás seguro de que desea cancelar la solicitud de este proyecto?</strong></p>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row justify="center">
                            <v-col cols="6" sm="6" >
                                <v-btn class="mx-5" style="width:100px; height:35px;" color="error" @click="cerrarCancelarSolicitud" outlined>Cancelar</v-btn>
                            </v-col>
                            <v-col cols="6" sm="6">
                                <v-btn class="mx-4" style="width:100px; height:35px;" color="success" @click="cancelarSolicitudProyecto" outlined>Aceptar</v-btn>
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
    name: "CancelarSolicitud",
    props: ["cancelarSolicitudAlumno"],

    data:()=>({
        nomProyecto: "",
        nomLab: "",
        msjsuccess: false
    }),

    methods: {
        cerrarCancelarSolicitud(){
            EventBus.$emit("cerrarAlertaCancelarSolicitud");
        },

        async cancelarSolicitudProyecto(){
            try {
                const {data} = await apolloClient.mutate({
                    mutation: gql`
                        mutation($nombre: String!, $proyecto: String!)
                        {
                            cancelarSolicitudAlumno(nombre: $nombre, proyecto: $proyecto)
                        }
                    `,
                    variables: {
                        nombre: this.nomLab,
                        proyecto: this.nomProyecto
                    }
                })
                EventBus.$emit("actualizarTablaSolicitudes");
                this.msjsuccess = true;
                setTimeout(() => {
                    this.msjsuccess = false;
                }, 3000);
                this.cerrarCancelarSolicitud();
            } catch (error) {
                console.log(error);
            }
        }
    },

    mounted(){
        EventBus.$on("datosCancelarProyecto", (dato1, dato2)=>{
            this.nomProyecto = dato1;
            this.nomLab = dato2;
            console.log(dato1+dato2);
        });

    }
}
</script>

<style>

</style>