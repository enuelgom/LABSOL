<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Datos actualizados! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-dialog v-model="modalEditarDatos" max-width="800" persistent>
            <v-form v-model="esValido">
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Editar datos</v-card-title>
                        <v-spacer />
                        <v-btn style="outline:none;" icon @click="cerrarModalEditar"><v-icon>fa fa-times</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :disabled="actualizar" :rules="nombre" prepend-icon="fa fa-id-card" label="Nombre" v-model="datosAdmin.nombre" />
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :disabled="actualizar" :rules="usuario"  prepend-icon="fa fa-id-card" label="Usuario" v-model="datosAdmin.usuario" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :disabled="actualizar" :rules="contraseña" prepend-icon="fa fa-lock" label="Contraseña" v-model="datosAdmin.psw"
                                    :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :disabled="actualizar" :rules="confirmacionPsw" prepend-icon="fa fa-lock" label="Confirmación" v-model="pswConfirm" 
                                    :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show1 ? 'text' : 'password'"
                                    @click:append="show1 = !show1"/>
                                </v-col>
                            </v-row>
                            <v-row justify="center" v-if="actualizar">
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-btn style="outline:none;" block outlined color="orange darken-2" @click="cancelarActualizacion">Modificar</v-btn>
                                </v-col>
                            </v-row>
                            <v-row v-else>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-btn style="outline:none;" block outlined color="red" @click="cancelarActualizacion">Cancelar</v-btn>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-btn style="outline:none;" block outlined color="success" :disabled="!esValido" @click="actualizarDatos">Actualizar</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from "@/EventBus"
import { mapState, mapMutations } from "vuex"
import gql from 'graphql-tag'
import { apolloClient } from '../../graphql/apollo'

export default {
    name: "EditarAdministrador",
    props: ["modalEditarDatos"],

    data: () => ({
        esValido: true,
        msjsuccess: false,
        actualizar: true,
        desactivar: true,
        show: false,
        show1: false,
        pswConfirm: '',
        datosAdmin: {
            nombre: '',
            usuario: '',
            psw: ''
        },
        nombre: [
            value => !!value || "El nombre es requerido"
        ],
        usuario: [
            value => !!value || "El usuario requerido",
            value => (value || '').length >= 8 || "El usuario debe de tener 8 caracteres"
        ],
        contraseña: [
           value => (value || "").length > 7 || (value || "").length == 0 || "Minimo 8 caracteres"
        ]
    }),

    computed: {
        confirmacionPsw(){
            return [
                this.datosAdmin.psw === this.pswConfirm || "La contraseña no coincide"
            ]
        },
        ...mapState(['usuarioLogeado'])
    },

    methods: {
        ...mapMutations(['guardarUsuarioLog']),

        // Actualizar datos del admistrador
        async actualizarDatos(){
            this.actualizar = true;
            try {
               const {data} = await apolloClient.mutate({
                   mutation: gql`
                    mutation($nombre: String!, $usuario: String!, $psw: String!)
                    {
                        updateAdmin(nombre: $nombre, usuario: $usuario, clave: $psw)
                    }
                   `,
                   variables: {
                       nombre: this.datosAdmin.nombre,
                       usuario: this.datosAdmin.usuario,
                       psw: this.datosAdmin.psw
                   }
               })
                localStorage.setItem("token", data.updateAdmin);
                this.guardarUsuarioLog();
                this.msjsuccess = true;
                setTimeout(() => {
                    this.cerrarModalEditar();
                    this.msjsuccess = false;
                }, 3000);
            } catch (error) {
               
            }
        },

        cerrarModalEditar(){
            this.actualizar = true;
            this.desactivar = true;
            this.show = false;
            this.show1 = false;
            EventBus.$emit("cerrarModalEditarAdmin");
            this.datosAdmin.psw = "";
            this.pswConfirm = "";
            this.datosAdmin.nombre = this.usuarioLogeado.nombre;
            this.datosAdmin.usuario = this.usuarioLogeado.nom_usuario;
        },

        cancelarActualizacion(){
            this.actualizar = !this.actualizar;
            this.desactivar = !this.desactivar;
            this.datosAdmin.psw = "";
            this.pswConfirm = "";
            this.show = false;
            this.show1 = false;
            this.datosAdmin.nombre = this.usuarioLogeado.nombre;
            this.datosAdmin.usuario = this.usuarioLogeado.nom_usuario;
        }
    },

     mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key; 
            if(keypressed === "Escape"){
                this.cerrarModalEditar();
            }    
        }); 
        this.datosAdmin.nombre = this.usuarioLogeado.nombre;
        this.datosAdmin.usuario = this.usuarioLogeado.nom_usuario;
    }

}
</script>
