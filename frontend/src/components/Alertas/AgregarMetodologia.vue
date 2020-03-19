<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Metodologia guardada! <v-btn color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-row>
            <v-dialog v-model="modalAlertaMetodologia" max-width="400" persistent>
                <v-card>
                    <v-toolbar color="success" dark>
                        <v-row justify="center">
                            <v-card-title>¡Mensaje!</v-card-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <v-row class="mt-4" justify="center" v-if="agregar">
                            <p><strong>Agregar cronograma de actividades</strong></p>
                            <p  class="text-center">
                                El proyecto <strong>solo aceptara un cronograma de actividades</strong>, para agregarlo tendras que presentarte 
                                en el laboratorio correspondiente para conocer las personas que estaran en el desarrollo del mismo
                                y en colaboracion agregar su respectivo cronograma.
                            </p>
                        </v-row>
                        <v-form ref="metodologia" v-model="esValido">
                            <v-row class="mt-4" justify="center" v-if="!agregar">
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-text-field :rules="metodologia"  v-model="datos.Metodologia" prepend-icon="fa fa-edit" label="Nombre de la metodologia" />
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-divider></v-divider>
                        <v-row v-if="!agregar">
                            <v-col cols="12" sm="6" md="6" lg="6">
                                <v-btn color="success" block outlined :disabled="!esValido" @click="addMetodologia()">Guardar</v-btn>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" lg="6">
                                <v-btn color="error" block outlined @click="cerrarModalMetodologia">Cancelar</v-btn>
                            </v-col>
                        </v-row>
                        <v-row v-if="agregar" justify="center">
                            <v-col cols="6" sm="6" >
                                <v-btn class="mx-5" style="width:100px; height:35px;" color="error" @click="cerrarModalMetodologia" outlined>Cancelar</v-btn>
                            </v-col>
                            <v-col cols="6" sm="6">
                                <v-btn class="mx-4" style="width:100px; height:35px;" color="blue" @click="agregar = !agregar" outlined>Agregar</v-btn>
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
import { apolloClient } from '@/graphql/apollo'
import gql from 'graphql-tag'

export default {
    name: "AgregarMetodologia",
    props: ["modalAlertaMetodologia"],

    data: ()=>({
        agregar: true,
        msjsuccess: false,
        _proyecto:'',
        _nombre: '',
        esValido: true,
        datos: {
            Metodologia:''
        },
        metodologia: [
            value => !!value || "La metodologia es requerida"
        ]
    }),

    methods: {
        async addMetodologia(){
            try {
                const {data}= await apolloClient.mutate({
                    mutation: gql`
                        mutation($nombre: String!, $proyecto: String!, $metodologia: String!)
                        {
                            Metodologia(nombre: $nombre, proyecto: $proyecto, metodologia: $metodologia)
                        }
                    `,
                    variables:{
                        nombre: this._nombre,
                        proyecto: this._proyecto,
                        metodologia: this.datos.Metodologia
                    }
                })
                EventBus.$emit("tablaMetodologiaVisible",this._nombre, this._proyecto, this.datos.Metodologia);
                this.msjsuccess = true;
                setTimeout(() => {
                    this.msjsuccess = false;
                }, 3000);

                EventBus.$emit("cerrarModalAlertaMetodologia");
                this.$refs.metodologia.reset();
            } catch (error) {
                console.log(error)
            }
        },

        cerrarModalMetodologia(){
            EventBus.$emit("cerrarModalAlertaMetodologia");
            this.$refs.metodologia.reset();
            this.agregar = true;
        }
    },
    mounted(){
        EventBus.$on("datosMetodologia",(nombre, proyecto) => {
            this._proyecto = proyecto;
            this._nombre = nombre;
        })
    }
}
</script>
