<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Colaborador asignado! <v-btn color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
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
                            hide-default-footer 
                            :items="colaboradores">
                                <template v-slot:item.agregar="{item}" >
                                    <v-tooltip bottom v-if="item._id!=id_colaboradores">
                                        <template v-slot:activator="{on}">
                                            <v-btn text icon color="green" v-on="on" @click="asigColaborador(item)">
                                            <v-icon>fa fa-check</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Agregar al proyecto</span>
                                    </v-tooltip>
                                    <v-tooltip bottom v-else>
                                        <template v-slot:activator="{on}">
                                            <v-btn text icon color="red" v-on="on" @click="asigColaborador(item)">
                                            <v-icon>fa fa-times</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Quitar del proyecto</span>
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
            {text: "Asignar", value: "agregar", align:'center'}  
        ],
        proyecto: "",
        id_colaboradores: "",
        msjsuccess: false
    }),

    computed:{
         ...mapState(["usuarioLogeado"])
    },

    methods: {
        cerrarModal(){
            EventBus.$emit("cerrarModalListColab");
        },

        async obtenerColaboradores(){
            try {
                const {data} = await this.$apollo.query({
                    query: gql`
                        query{
                            Colaboradores{
                                _id
                                nombre
                                telefono
                                correo
                            }
                        }
                    `,
                })
                this.colaboradores = data.Colaboradores;
                let i = 0;
                for(let val of data.Colaboradores){
                    i++;
                    val["numero"] = i;
                }
            } catch (error) {

            }
        },

        async asigColaborador(colaborador){ 
            try {
                const {data} = await this.$apollo.mutate({
                    mutation:gql`
                        mutation($_id: String!, $proyecto: String!)
                        {
                            asignarColaborador(_id: $_id, proyecto: $proyecto)
                        }
                    `,
                    variables: {
                        _id: colaborador._id,
                        proyecto: this.proyecto
                    }
                })
                this.id_colaboradores = data.asignarColaborador;
                EventBus.$emit("recargate",this.proyecto,this.id_colaboradores) ;

                if(this.id_colaboradores!=""){
                    this.msjsuccess = true;
                setTimeout(() => {
                    this.msjsuccess = false;
                }, 3000);
                }
            } catch (error) {
                
            }
        }
    },

    mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key;
            if(keypressed === "Escape"){
                this.cerrarModal();
            }
        });

        EventBus.$on("eviarNomProyectoColaborador", (proyecto,colaboradores)=>{
            this.proyecto = proyecto;
            this.id_colaboradores = colaboradores;
        });

        this.obtenerColaboradores();
            
    }

}
</script>
