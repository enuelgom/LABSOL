<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Datos actualizados! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-snackbar color="red" v-model="msjError" top>¡{{ msjErrorRegistro }}! <v-btn style="outline:none;" color="white" text @click="msjError=false">Cerrar</v-btn></v-snackbar>
        <v-dialog v-model="modalEditarDatos" max-width="800" persistent>
            <v-form v-model="esValido">
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Editar datos</v-card-title>
                        <v-spacer />
                        <v-btn style="outline:none;" icon @click="cerrarModalEditar"><v-icon>fa fa-times</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container fluid v-if="usuarioLogeado.p==='A'">
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
                        <v-container v-else>
                        <v-form ref="formEditarAdmin" v-model="esValido2">
                            <v-row>
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-text-field :disabled="actualizar" :rules="nombre" prepend-icon="fa fa-id-card" label="Nombre completo" v-model="datosSubAdmin.nombre" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :disabled="actualizar" :rules="telefono" v-mask="mask" type="text" prepend-icon="fa fa-phone" label="Número teléfono" v-model="datosSubAdmin.telefono" dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :disabled="actualizar" :rules="correo" prepend-icon="fa fa-envelope" label="Correo" v-model="datosSubAdmin.correo" dense />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :disabled="actualizar" :rules="usuario" prepend-icon="fa fa-user" label="Usuario" v-model="datosSubAdmin.usuario" dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :disabled="actualizar" :rules="confirmacionPsw2" prepend-icon="fa fa-lock" label="Contraseña" v-model="datosSubAdmin.psw" dense
                                    :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"/>
                                </v-col>
                                <v-col cols="12" sm=" 6" md="4" lg="4">
                                    <v-text-field :disabled="actualizar" :rules="confirmacionPsw2" prepend-icon="fa fa-lock" label="Confirmar" v-model="pswConfirm2" dense 
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
                                    <v-btn style="outline:none;" block outlined color="success" :disabled="!esValido2" @click="actualizarDatos">Actualizar</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
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
import { mask } from "vue-the-mask"

export default {
    name: "EditarAdministrador",
    props: ["modalEditarDatos"],

    directives:{
        mask
    },

    data: () => ({
        esValido: true,
        esValido2: true,
        msjsuccess: false,
        actualizar: true,
        desactivar: true,
        msjError: false,
        msjErrorRegistro: "",
        show: false,
        show1: false,
        pswConfirm: '',
        pswConfirm2: '',
        mask: '(###)-###-####',
        datosAdmin: {
            nombre: '',
            usuario: '',
            psw: '',
        },
        datosSubAdmin: {
            nombre: '',
            usuario: '',
            psw: '',
            correo: '',
            telefono: ''
        },
        nombre: [
            value => !!value || "El nombre es requerido"
        ],
        usuario: [
            value => !!value || "El usuario requerido",
            value => (value || '').length >= 8 || "El usuario debe de tener 8 caracteres"
        ],
        telefono: [
            value => !!value || "El número de teléfono es requerido",
            value => (value || "").length === 14 || "Solo se permiten 10 digitos"
        ],

        correo: [
            value => !!value || "El correo es requerido",
            value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Correo invalido'
            },
            value => /.+@.+/.test(value) || "El correo debe de ser valido"
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
        confirmacionPsw2(){
            return [
                this.datosSubAdmin.psw === this.pswConfirm2 || "La contraseña no coincide"
            ]
        },
        ...mapState(['usuarioLogeado'])
    },

    methods: {
        ...mapMutations(['guardarUsuarioLog']),

        // Actualizar datos del admistrador
        async getSubAdminData(){
            try {
               const {data} = await apolloClient.query({
                   query: gql`
                    query
                    {
                        datosSubAdmin{
                            nombre
                            usuario
                            telefono
                            correo
                        }
                    }
                   `,
               })
                this.datosSubAdmin.correo = data.datosSubAdmin.correo
                this.datosSubAdmin.telefono = data.datosSubAdmin.telefono
                this.datosSubAdmin.usuario = data.datosSubAdmin.usuario
                this.datosSubAdmin.nombre = data.datosSubAdmin.nombre
            } catch (error) {
               console.log(error)
            }
        },
        async actualizarDatos(){
            this.actualizar = true;
            let psw="";
            if (this.usuarioLogeado.p==="A") {
                psw = this.datosAdmin.psw
            }else{
                psw = this.datosSubAdmin.psw
                this.datosAdmin.nombre = this.datosSubAdmin.nombre
                this.datosAdmin.usuario = this.datosSubAdmin.usuario

            }
            try {
               const {data} = await apolloClient.mutate({
                   mutation: gql`
                    mutation($nombre: String!, $usuario: String!, $psw: String!, $correo: String!, $telefono: String!)
                    {
                        updateAdmin(nombre: $nombre, usuario: $usuario, clave: $psw, correo: $correo, telefono: $telefono)
                    }
                   `,
                   variables: {
                       nombre: this.datosAdmin.nombre,
                       usuario: this.datosAdmin.usuario,
                       psw: psw,
                       correo: this.datosSubAdmin.correo,
                       telefono: this.datosSubAdmin.telefono
                   }
               })
               switch (data.updateAdmin) {
                    case 'Usuario existente':
                        this.msjErrorRegistro = data.updateAdmin;
                        this.msjerror = true;
                        setTimeout(() => {
                            this.msjerror = false;
                        }, 3000);
                        break;
                    case 'Correo existente':
                        this.msjErrorRegistro = data.updateAdmin;
                        this.msjerror = true;
                        setTimeout(() => {
                            this.msjerror = false;
                        }, 3000);
                        break;

                    default :
                        this.cerrarModalEditar();
                        localStorage.setItem("token", data.updateAdmin);
                        this.msjsuccess = true;
                        setTimeout(() => {
                            this.msjsuccess = false;
                        }, 1500);
                        break;
                }
                // localStorage.setItem("token", data.updateAdmin);
                // this.guardarUsuarioLog();
                // this.msjsuccess = true;
                // setTimeout(() => {
                //     this.cerrarModalEditar();
                //     this.msjsuccess = false;
                // }, 1500);
            } catch (error) {
               console.log("error :"+error)
            }
        },

        cerrarModalEditar(){
            this.getSubAdminData()
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
         if(this.usuarioLogeado.p!="A"){
             this.getSubAdminData()
         }else{
            this.datosAdmin.nombre = this.usuarioLogeado.nombre;
            this.datosAdmin.usuario = this.usuarioLogeado.nom_usuario;
         }
        document.addEventListener("keydown", event => {
            const keypressed = event.key; 
            if(keypressed === "Escape"){
                this.cerrarModalEditar();
            }    
        }); 
        
    }

}
</script>
