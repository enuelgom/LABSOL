<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Repositorio guardado! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-dialog v-model="agregarRepositorio" max-width="400" persistent>
            <v-card>
                <v-toolbar color="success" dark>
                    <v-row justify="center">
                        <v-card-title v-if="!actualizar">Agregar repositorio</v-card-title>
                        <v-card-title v-else>Actualizar repositorio</v-card-title>
                    </v-row>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="formRepositorio" v-model="esValido">
                        <v-row class="mt-4" justify="center">
                            <v-col cols="12" sm="12" md="12" lg="12">
                                <v-text-field :rules="repo"  v-model="dato.repositorio" prepend-icon="fa fa-edit" label="Link del repositorio" />
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-btn v-if="!actualizar" style="outline:none;" color="success" block outlined :disabled="!esValido" @click="addRepositorio()">Guardar</v-btn>
                            <v-btn v-else style="outline:none;" color="success" block outlined :disabled="!esValido" @click="addRepositorio()">Actualizar</v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-btn style="outline:none;" color="error" block outlined @click="cerrarModal">Cancelar</v-btn>
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
    name: "Repositorio",
    props: ["agregarRepositorio"],

    data: ()=>({
        esValido: false,
        msjsuccess: false,
        actualizar: false,
        nombre: "",
        proyecto: "",
        dato:{
            repositorio: ''
        },
        repo: [
            value => !!value || "El link del repositorio es requerido"
        ]
    }),

    methods: {
        async addRepositorio(){
            if (!this.dato.repositorio.includes("//")) {
                this.dato.repositorio = "//"+this.dato.repositorio;
            }
            try{
            const {data} = await apolloClient.mutate({
                    mutation: gql`
                        mutation($nombre: String!, $proyecto: String!, $repositorio: String!){
                            agregarRepositorio(nombre: $nombre, proyecto: $proyecto,repositorio: $repositorio)
                        }
                    `,
                    variables: {
                        nombre: this.nombre,
                        proyecto: this.proyecto,
                        repositorio: this.dato.repositorio
                    }    
                })
                this.msjsuccess = true;
                setTimeout(() => {
                    this.msjsuccess = false;
                    this.cerrarModal(); 
                }, 1500);
            } catch (error) {
                console.log(error);
            }
        },

        cerrarModal(){
            EventBus.$emit("cerrarModalAgregarRepositorio");
            EventBus.$emit("cerrarModalActRepositorio");
            this.$refs.formRepositorio.reset();
        }
    },

    mounted(){
        EventBus.$on("datamsjrepo", (nombre, proyecto)=>{
            console.log(nombre+" "+proyecto);
            this.nombre = nombre;
            this.proyecto = proyecto; 
        });
        EventBus.$on("cambiarVariableRepositorio2", ()=>{
            this.actualizar = true;
        });

        EventBus.$on("cambiarVariableRepositorio1", ()=>{
            this.actualizar = false;
        });
    }
}
</script>
