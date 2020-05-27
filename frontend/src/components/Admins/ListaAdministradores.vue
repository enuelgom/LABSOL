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
                                            <v-btn style="outline:none;" text icon color="orange" @click="editDataAdmin" v-on="on">
                                            <v-icon>fa fa-edit</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Editar datos</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{on}">
                                            <v-btn style="outline:none;" text icon color="red" v-on="on" @click="modalEliminarAdmin(item._id)">
                                            <v-icon>fa fa-trash</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Eliminar</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{on}">
                                            <v-btn style="outline:none;" text icon color="green" v-on="on" @click="cambiarPriv">
                                            <v-icon>fa fa-users</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Cambiar privilegios</span>
                                    </v-tooltip>
                                </template> 
                            </v-data-table>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <CambiarPrivilegios :cambiarPrivilegios="abrirCambiarPriv"/>
        <EliminarAdministrador :eliminarAdmin="abrirEliminarAdmin"/>
        <EditarAdministrador :editarAdministrador="abrirEditarAdmin"/>
    </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import { mapState } from "vuex"
import { apolloClient } from '@/graphql/apollo'
import gql from 'graphql-tag'
import CambiarPrivilegios from '@/components/Admins/CambiarPrivilegios'
import EliminarAdministrador from '@/components/Alertas/EliminarAdministrador'
import EditarAdministrador from '@/components/Admins/EditarAdministrador'

export default {
    name: 'ListaAdministradores',
    props: ['listaAdmins'],
    components: {CambiarPrivilegios, EliminarAdministrador, EditarAdministrador},

    data: ()=>({
        administradores: [],
        msjsuccess: false,
        abrirCambiarPriv: false,
        abrirEliminarAdmin: false,
        abrirEditarAdmin: false,
        idAdmin: "",
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

        //Abrir modal editar datos del administrador
        editDataAdmin(){
            this.abrirEditarAdmin = true;
        },

        //Abrir modal para cambiar privilegios
        cambiarPriv(){
            this.abrirCambiarPriv = true;
        },

        //Abrir modal para eliminar Administrador
        modalEliminarAdmin(_id){
            this.idAdmin = _id;
            EventBus.$emit("enviarIDAdministrador", this.idAdmin);
            this.abrirEliminarAdmin = true;
        },

        // Mutacion para obtener todos los administradores creados
        async obtenerAdministradores(){
            try {
                const {data} = await this.$apollo.query({
                    query: gql`
                        query{
                            allAdmins{
                                _id,
                                nombre,
                                correo,
                                telefono,
                                privilegios
                            }
                        }
                    `
                })
                let i=0;
                for(let val of data.allAdmins){
                    i++
                    val["numero"]=i;
                }
                this.administradores=data.allAdmins;
            } catch (error) {
                console.log(error)
            }
        }
    },

    mounted() {
        this.obtenerAdministradores();
        document.addEventListener("keydown", event => {
            const keypressed = event.key; 
            if(keypressed === "Escape"){
                this.cerrarModal();
            }    
        });

        EventBus.$on("cerrarModalCambPriv",()=>{
            this.abrirCambiarPriv = false;
        });
        
        EventBus.$on("cerrarAlertaBorrarAdministrador", ()=>{
            this.abrirEliminarAdmin = false;
        });

        EventBus.$on("ActualizarTablaDeAdministradores", ()=>{
            this.obtenerAdministradores();
        });

        EventBus.$on("cerrarModalEditarAdmin", ()=>{
            this.abrirEditarAdmin = false;
        });

        EventBus.$on("reloadListAdmins", ()=>{
            this.obtenerAdministradores();
        });
    }
}
</script>
