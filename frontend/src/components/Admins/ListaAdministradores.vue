<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Administrador eliminado! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-dialog v-model="listaAdmins" max-width="1600" persistent>
            <v-card color="grey lighten-3">
                <v-toolbar color="primary" dark>
                    <v-card-title>Lista de administradores</v-card-title>
                    <v-spacer />
                    <v-btn style="outline:none;" icon @click="cerrarModal"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="12" md="12" lg="12">
                            <v-data-table 
                                :headers="headers"   
                                class="elevation-1"
                                no-data-text="No existen administradores" 
                                :footer-props="{itemsPerPageText:'Paginación'}" 
                                :items="administradores">
                                <template v-slot:item.acciones="{item}" >
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{on}">
                                            <v-btn style="outline:none;" text icon color="red" v-on="on" @click="eliminarAdmin(item)">
                                            <v-icon>fa fa-trash</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Eliminar</span>
                                    </v-tooltip>
                                </template> 
                            </v-data-table>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import { mapState } from "vuex"
import { apolloClient } from '@/graphql/apollo'
import gql from 'graphql-tag'

export default {
    name: 'ListaAdministradores',
    props: ['listaAdmins'],

    data: ()=>({
        administradores: [],
        msjsuccess: false,
        headers: [
            {text: "Número", value: "numero"},
            {text: "Nombre", value: "nombre", sortable: false},
            {text: "Correo", value: "correo", sortable: false},
            {text: "Teléfono", value: "telefono", sortable: false},
            {text: "Privilegios", value: "privilegios", sortable: false},
            {text: "Acciones", value: "acciones", align:'center', sortable: false} 
        ]
    }),

    methods: {
        cerrarModal(){
            EventBus.$emit("cerrarListaAdministradores");
        },

        // Boton para eliminar el administrador
        async eliminarAdmin(){
            try {
                const {data} = await apolloClient.mutate({
                    mutation: gql`
                        mutation(){

                        }
                    `
                })
            } catch (error) {
                
            }
        },

        // Mutacion para obtener todos los administradores creados
        async obtenerAdministradores(){
            try {
                const {data} = await this.$apollo.query({
                    query: gql`
                        query(){

                        }
                    `
                })
            } catch (error) {
                
            }
        }
    },

    mounted() {
        document.addEventListener("keydown", event => {
            const keypressed = event.key; 
            if(keypressed === "Escape"){
                this.cerrarModal();
            }    
        });
    }
}
</script>
