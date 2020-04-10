<template>
    <div>
        <v-dialog v-model="msjAgregarRepositorio" max-width="400" persistent>
            <v-card>
                <v-toolbar color="success" dark>
                    <v-row justify="center">
                        <v-card-title>¡Mensaje!</v-card-title>
                    </v-row>
                </v-toolbar>
                <v-card-text>
                    <v-row class="mt-4" justify="center">
                        <p class="text-center">
                            El proyecto <strong>solo aceptara un repositorio</strong> puede usar la plataforma de <strong>github
                            o gitlab</strong> para el alogamiento del proyecto o alguna otra plataforma que conozca.
                        </p>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row justify="center">
                        <v-col cols="6" sm="6" >
                            <v-btn class="mx-8" style="width:100px; height:35px; outline:none;" color="error" @click="cerrarModal" outlined>Cancelar</v-btn>
                        </v-col>
                        <v-col cols="6" sm="6">
                            <v-btn class="mx-7" style="width:100px; height:35px; outline:none;" color="blue" @click="abrirModalAgregarRepo" outlined>Agregar</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <Repositorio :agregarRepositorio="abrirAgregarRepositorio" /> 
    </div>
</template>

<script>
import { EventBus } from "@/EventBus"
import Repositorio from "@/components/Proyectos/Repositorio"

export default {
    name: "MsjAgregarRepositorio",
    props: ["msjAgregarRepositorio"],
    components: {Repositorio},

    data: ()=>({
        abrirAgregarRepositorio: false
    }),

    methods: {
        abrirModalAgregarRepo(){
            EventBus.$emit("cambiarVariableRepositorio1");
            this.abrirAgregarRepositorio = true;
            this.cerrarModal();
        },

        cerrarModal(){
            EventBus.$emit("cerrarMsjAgregarRepositorio");
        }
    },

    mounted(){
        EventBus.$on("cerrarModalAgregarRepositorio", ()=>{
            this.abrirAgregarRepositorio = false;
            this.cerrarModal();
        })
    }
}
</script>
