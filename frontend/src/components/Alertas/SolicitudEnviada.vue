<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="msjAvisoSolicitud" max-width="350" persistent>
                <v-card>
                    <v-toolbar color="success" dark>
                        <v-row justify="center">
                            <v-card-title>¡Aviso!</v-card-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <v-row class="mt-1" justify="center">
                            <p><strong>Tu solicitud fue enviada. Podras verificar en tu perfil las solicitudes realizadas.</strong></p>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row justify="center">
                            <v-col cols="5" sm="5">
                                <v-btn style="width:100px; height:35px;" color="success" @click="cerrarAvisoSolicitud" outlined>Aceptar</v-btn>
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

export default {
    name: "SolicitudEnviada",
    props: ["msjAvisoSolicitud"],

    methods: {
        cerrarAvisoSolicitud(){
            EventBus.$emit("cerrarModalAvisoSolicitud");
        }
    }
}
</script>
