<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="sesionExpirada" max-width="350" persistent>
                <v-card>
                    <v-toolbar color="red" dark>
                        <v-row justify="center">
                            <v-card-title>¡Aviso!</v-card-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <v-row class="mt-4" justify="center">
                            <p class="text-center"><strong>Tu sesión ha expirado. Para continuar debes de iniciar una nueva sesión.</strong></p>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row justify="center">
                            <v-col cols="5" sm="5">
                                <v-btn class="mx-2" style="width:100px; height:35px; outline:none;" color="success" @click="expiracion" outlined>Aceptar</v-btn>
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
    name: "SesionExpirada",
    props: ["sesionExpirada"],

    methods: {
        expiracion(){

        }
    }
}
</script>

<style>

</style>