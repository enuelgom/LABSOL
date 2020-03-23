<template>
    <div>
        <v-dialog v-model="listaColaboradores" max-width="1500" persistent>
            <v-card color="grey lighten-3">
                <v-toolbar color="primary" dark>
                    <v-card-title>Lista de colaboradores</v-card-title>
                    <v-spacer />
                    <v-btn icon @click="cerrarModal"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="12" md="12" lg="12">
                            <v-data-table :headers="headers"   
                            class="elevation-1"
                            no-data-text="Aún no existen colaboradores" 
                            :footer-props="{itemsPerPageText:'Paginación'}" 
                            :items="colaboradores">
                                <template v-slot:item.agregar="" >
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{on}">
                                            <v-btn text icon color="green" v-on="on">
                                            <v-icon>fa fa-check</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Agregar al proyecto</span>
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
    name: "ListaColaboradores",
    props: ["listaColaboradores"],

    data: ()=>({
        colaboradores: [],
        headers: [
            {text: "Número", value: "numero"},
            {text: "Nombre", value: "nombre"},
            {text: "Correo", value: "correo"},
            {text: "Teléfono", value: "telefono"},
            {text: "Agregar", value: "agregar"}  
        ]

    }),

    computed:{
         ...mapState(["usuarioLogeado"])
    },

    methods: {
        cerrarModal(){
            EventBus.$emit("cerrarModalListColab");
        }
    },

    mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key;
            if(keypressed === "Escape"){
                this.cerrarModal();
            }
        });
    }

}
</script>
