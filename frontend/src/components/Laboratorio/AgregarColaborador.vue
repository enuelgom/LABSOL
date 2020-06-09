<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Colaborador registrado! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-snackbar color="red" v-model="msjerror" top>¡{{ msjErrorRegistro }}! <v-btn style="outline:none;" color="white" text @click="msjerror=false">Cerrar</v-btn></v-snackbar>

        <v-dialog v-model="agregarUsuario" max-width="800" persistent>
            <v-card color="grey lighten-3">
                <v-toolbar color="primary" dark>
                    <v-card-title>Agregar nuevo colaborador</v-card-title>
                    <v-spacer />
                    <v-btn style="outline:none;" icon @click="cerrarModal"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-form ref="formAgregarUsuario" v-model="esValido">
                            <v-row>
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-text-field :rules="nombre" prepend-icon="fa fa-id-card" label="Nombre completo" v-model="datosUsuarios.nombre" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :rules="telefono" v-mask="mask" type="text" prepend-icon="fa fa-phone" label="Número teléfono" v-model="datosUsuarios.telefono" dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :rules="correo" prepend-icon="fa fa-envelope" label="Correo" v-model="datosUsuarios.correo" dense />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="usuario" prepend-icon="fa fa-user" label="Usuario" v-model="datosUsuarios.usuario" dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="psw" prepend-icon="fa fa-lock" label="Contraseña" v-model="datosUsuarios.psw" dense
                                    :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"/>
                                </v-col>
                                <v-col cols="12" sm=" 6" md="4" lg="4">
                                    <v-text-field :rules="confirmacionPsw" prepend-icon="fa fa-lock" label="Confirmar" v-model="pswConfirm" dense 
                                    :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show1 ? 'text' : 'password'"
                                    @click:append="show1 = !show1"/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-btn style="outline:none;" :disabled="!esValido" block color="success" @click="guardarUsuario" rounded>Agregar colaborador</v-btn>
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
    name: "AgregarColaborador",
    props: ["agregarUsuario"],

    directives:{
        mask
    },

    data: ()=>({
        mask: '(###)-###-####',
        pswConfirm: "",
        msjErrorRegistro: '',
        msjsuccess: false,
        msjerror: false,
        show: false,
        show1: false,
        esValido: false,
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
            value => !!value || "La contraseña es requerida",
            value => (value || "").length > 7 || "Minimo 8 caracteres"
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
            EventBus.$emit("cerrarModalRegUsuario");
            try {
                this.$refs.formAgregarUsuario.reset();
                this.show = false;
                this.show1 = false;
            } catch (error) {
            }
        },

        async guardarUsuario(){
            try {
                const {data} = await this.$apollo.mutate({
                    mutation: gql`
                        mutation($nombre: String!, $telefono: String!, $correo: String!, $usuario: String!, $clave: String!)
                        {
                            addColaborador(nombre: $nombre, telefono: $telefono, correo: $correo, usuario: $usuario, clave: $clave)
                        }
                    `,
                    variables: {
                        nombre: this.datosUsuarios.nombre,
                        telefono: this.datosUsuarios.telefono,
                        correo: this.datosUsuarios.correo,
                        usuario: this.datosUsuarios.usuario,
                        clave: this.datosUsuarios.psw
                    }
                })

                const msj = data.addColaborador;

                switch (msj) {
                    case 'hecho':
                        this.msjsuccess = true;
                        setTimeout(() => {
                            this.msjsuccess = false;
                            EventBus.$emit("cerrarModalAgregarColab");
                        }, 1500);
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
                
            } catch (error) {
                console.log(error)
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
    }
}
</script>
