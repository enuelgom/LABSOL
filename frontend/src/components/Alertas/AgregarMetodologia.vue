<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Metodologia guardada! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-dialog v-model="modalAlertaMetodologia" max-width="400" persistent>
            <v-card>
                <v-toolbar color="success" dark>
                    <v-row justify="center">
                        <v-card-title v-if="!agregar">Agregar cronograma</v-card-title>
                        <v-card-title v-else>¡Mensaje!</v-card-title>
                    </v-row>
                </v-toolbar>
                <v-card-text>
                    <v-row class="mt-4" justify="center" v-if="agregar">
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
                            <v-btn style="outline:none;" color="success" block outlined :disabled="!esValido" @click="addMetodologia()">Guardar</v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-btn style="outline:none;" color="error" block outlined @click="cerrarModalMetodologia">Cancelar</v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-if="agregar" justify="center">
                        <v-col cols="6" sm="6" >
                            <v-btn class="mx-8" style="width:100px; height:35px; outline:none;" color="error" @click="cerrarModalMetodologia" outlined>Cancelar</v-btn>
                        </v-col>
                        <v-col cols="6" sm="6">
                            <v-btn class="mx-7" style="width:100px; height:35px; outline:none;" color="blue" @click="agregar = !agregar" outlined>Agregar</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="editarMetodologia" max-width="400" persistent>
            <v-card>
                <v-toolbar color="success" dark>
                    <v-row justify="center">
                        <v-card-title>Actualizar metodologia</v-card-title>
                    </v-row>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="metodologia2" v-model="esValido">
                        <v-row class="mt-4" justify="center">
                            <v-col cols="12" sm="12" md="12" lg="12">
                                <v-text-field :rules="metodologia"  v-model="datos.Metodologia" prepend-icon="fa fa-edit" label="Nombre de la metodologia" />
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-btn style="outline:none;" color="success" block outlined :disabled="!esValido" @click="addMetodologia()">Actualizar</v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-btn style="outline:none;" color="error" block outlined @click="cerrarModalEditarMetod">Cancelar</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from "@/EventBus"
import { apolloClient } from '@/graphql/apollo'
import gql from 'graphql-tag'

export default {
    name: "AgregarMetodologia",
    props: ["modalAlertaMetodologia", "editarMetodologia"],

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
                    EventBus.$emit("cerrarModalAlertaMetodologia");
                    this.cerrarModalEditarMetod();
                }, 1500);

                this.$refs.metodologia.reset();
            } catch (error) {
                console.log(error)
            }
        },

        cerrarModalMetodologia(){
            EventBus.$emit("cerrarModalAlertaMetodologia");
            this.$refs.metodologia.reset();
            this.agregar = true;
        },

        cerrarModalEditarMetod(){
            EventBus.$emit("cerrarModalEditarMetodologia");
            this.$refs.metodologia2.reset();
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
