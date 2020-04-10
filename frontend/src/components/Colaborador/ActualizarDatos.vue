<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Datos actualizados! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-snackbar color="red" v-model="msjerror" top>¡{{ msjErrorRegistro }}! <v-btn style="outline:none;" color="white" text @click="msjerror=false">Cerrar</v-btn></v-snackbar>

        <v-dialog v-model="modalActDatosColab" max-width="800" persistent>
            <v-card color="grey lighten-3">
                <v-toolbar color="primary" dark>
                    <v-card-title>Editar datos</v-card-title>
                    <v-spacer />
                    <v-btn style="outline:none;" icon @click="cerrarModal"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                            <v-form ref="formActColaborador" v-model="esValido">
                                <v-row>
                                    <v-col cols="12" sm="12" md="12" lg="12">
                                        <v-text-field :disabled="desactivar" :rules="nombre" prepend-icon="fa fa-id-card" label="Nombre completo" v-model="datosUsuarios.nombre" />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6" lg="6">
                                        <v-text-field :disabled="desactivar" :rules="telefono" v-mask="mask" type="text" prepend-icon="fa fa-phone" label="Número teléfono" v-model="datosUsuarios.telefono" dense />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" lg="6">
                                        <v-text-field :disabled="desactivar" :rules="correo" prepend-icon="fa fa-envelope" label="Correo" v-model="datosUsuarios.correo" dense />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4" lg="4">
                                        <v-text-field :disabled="desactivar" :rules="usuario" prepend-icon="fa fa-user" label="Usuario" v-model="datosUsuarios.usuario" dense />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="4">
                                        <v-text-field :disabled="desactivar" :rules="psw" prepend-icon="fa fa-lock" label="Contraseña" v-model="datosUsuarios.psw" dense
                                        :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                        :type="show ? 'text' : 'password'"
                                        @click:append="show = !show"/>
                                    </v-col>
                                    <v-col cols="12" sm=" 6" md="4" lg="4">
                                        <v-text-field :disabled="desactivar" :rules="confirmacionPsw" prepend-icon="fa fa-lock" label="Confirmar" v-model="pswConfirm" dense 
                                        :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                        :type="show1 ? 'text' : 'password'"
                                        @click:append="show1 = !show1"/>
                                    </v-col>
                                </v-row>
                                <v-row justify="center" v-if="desactivar">
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
                            </v-form>
                        </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import gql from 'graphql-tag'
import { mask } from "vue-the-mask"
import { apolloClient } from '@/graphql/apollo'

export default {
    name: "ActualizarDatos",
    props: ["modalActDatosColab"],

    directives:{
        mask
    },

    data: ()=>({
        mask: '(###)-###-####',
        desactivar: true,
        msjsuccess: false,
        msjerror: false,
        show: false,
        show1: false,
        esValido: true,
        pswConfirm: '',
        msjErrorRegistro: '',
        datosUsuarios: {
            nombre: '',
            telefono: '',
            correo: '',
            usuario: '',
            psw: ''
        },

        nombre: [
            value => !!value || "El nombre es requerido",
            value => {
                const nombre = /[`~!@#$%^&*()_°¬|+\-=?;:'"1234567890,<>\{\}\[\]\\\/]/gi;
				return !nombre.test(value) || "Solo se permiten letras";
            }
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

        usuario: [
            value => !!value || "El usuario es requerido",
            value => (value || "").length > 7 || "Minimo 8 caracteres"
        ],

        psw: [
           value => (value || "").length > 7 || (value || "").length == 0 || "Minimo 8 caracteres"
        ]
    }),

    computed: {
        confirmacionPsw(){
            return [
                this.datosUsuarios.psw === this.pswConfirm || "La contraseña no coincide"
            ]
        }
    },

    methods: {
        cerrarModal(){
            EventBus.$emit("cerrarModalActDatosColab");
            this.datosUsuarios.psw = "";
            this.pswConfirm = "";
            this.desactivar = true;
            this.show = false;
            this.show1 = false;
            this.obtenerDatosColaborador();
        },

        cancelarActualizacion(){
            this.desactivar = !this.desactivar;
            this.datosUsuarios.psw = "";
            this.pswConfirm = "";
            this.show = false;
            this.show1 = false;
            this.obtenerDatosColaborador();
        },

        async obtenerDatosColaborador(){
            try {
                const {data} = await this.$apollo.query({
                    query: gql`
                        query{
                            Colaborador{
                                nombre
                                correo
                                telefono
                                usuario
                            }
                        }
                    `
                })
                this.datosUsuarios.nombre = data.Colaborador.nombre;
                this.datosUsuarios.correo = data.Colaborador.correo;
                this.datosUsuarios.telefono = data.Colaborador.telefono;
                this.datosUsuarios.usuario = data.Colaborador.usuario;
            } catch (error) {
                
            }
        },

        async actualizarDatos(){
            try {
                const {data} = await this.$apollo.mutate({
                    mutation: gql`
                        mutation($nombre: String!, $correo: String!, $telefono: String!, $usuario: String!, $psw: String!){
                            updateColaborador(nombre: $nombre, correo: $correo, telefono: $telefono, usuario: $usuario, clave: $psw)
                        }
                    `,
                    variables: {
                        nombre: this.datosUsuarios.nombre,
                        correo: this.datosUsuarios.correo,
                        telefono: this.datosUsuarios.telefono,
                        usuario: this.datosUsuarios.usuario,
                        psw: this.datosUsuarios.psw
                    }
                })
                const msj = data.updateColaborador;
                switch (msj) {
                    case 'hecho':
                        this.msjsuccess = true;
                        setTimeout(() => {
                            this.msjsuccess = false;
                        }, 3000);
                        break;
                    
                    case 'Usuario existente':
                        this.msjErrorRegistro = msj;
                        this.msjerror = true;
                        setTimeout(() => {
                            this.msjerror = false;
                        }, 3000);
                        break;

                    case 'Correo existente':
                        this.msjErrorRegistro = msj;
                        this.msjerror = true;
                        setTimeout(() => {
                            this.msjerror = false;
                        }, 3000);
                        break;
                }
                this.obtenerDatosColaborador();
                setTimeout(() => {
                    this.cerrarModal();
                }, 3000);
            } catch (error) {
                console.log(error)
            }
        },
    },

    mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key;
            try {
                if(keypressed === "Escape"){
                    this.cerrarModal();
                }    
            } catch (error) {
            } 
        });

        this.obtenerDatosColaborador();
    }
}
</script>
