<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Datos actualizados! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-snackbar color="red" v-model="msjerror" top>¡{{ msjErrorRegistro }}! <v-btn style="outline:none;" color="white" text @click="msjerror=false">Cerrar</v-btn></v-snackbar>

        <v-dialog v-model="editarAdministrador" max-width="800" persistent>
            <v-card color="grey lighten-3">
                <v-toolbar color="primary" dark>
                    <v-card-title>Editar datos</v-card-title>
                    <v-spacer />
                    <v-btn style="outline:none;" icon @click="cerrarModal"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-form ref="formEditarAdmin" v-model="esValido">
                            <v-row>
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-text-field :disabled="actualizar" :rules="nombre" prepend-icon="fa fa-id-card" label="Nombre completo" v-model="datosAdmin.nombre" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :disabled="actualizar" :rules="telefono" v-mask="mask" type="text" prepend-icon="fa fa-phone" label="Número teléfono" v-model="datosAdmin.telefono" dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :disabled="actualizar" :rules="correo" prepend-icon="fa fa-envelope" label="Correo" v-model="datosAdmin.correo" dense />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :disabled="actualizar" :rules="usuario" prepend-icon="fa fa-user" label="Usuario" v-model="datosAdmin.usuario" dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :disabled="actualizar" :rules="psw" prepend-icon="fa fa-lock" label="Contraseña" v-model="datosAdmin.psw" dense
                                    :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"/>
                                </v-col>
                                <v-col cols="12" sm=" 6" md="4" lg="4">
                                    <v-text-field :disabled="actualizar" :rules="confirmacionPsw" prepend-icon="fa fa-lock" label="Confirmar" v-model="pswConfirm" dense 
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
    name: "EditarAdministrador",
    props:["editarAdministrador"],

    directives:{
        mask
    },

    data: ()=>({
        actualizar: true,
        msjsuccess: false,
        msjerror: false,
        esValido: true,
        show: false,
        show1: false,
        msjErrorRegistro: '',
        pswConfirm: '',
        mask: '(###)-###-####',
        datosAdmin: {
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
            value => (value || "").length > 7 || (value || "").length == 0 || "Minimo 8 caracteres"
        ]
    }),
    
    computed: {
        confirmacionPsw(){
            return [
                this.datosAdmin.psw === this.pswConfirm || "La contraseña no coincide"
            ]
        }
    },

    methods: {
        cerrarModal(){
            this.actualizar = true;
            this.show = false;
            this.show1 = false;
            EventBus.$emit("cerrarModalEditAdmins");
            this.datosAdmin.psw = "";
            this.pswConfirm = "";
            //LLamar los datos del administrador
        },

         cancelarActualizacion(){
            this.actualizar = !this.actualizar;
            this.datosAdmin.psw = "";
            this.pswConfirm = "";
            this.show = false;
            this.show1 = false;
            //LLamar los datos del Administrador
        },

       async actualizarDatos(){
            this.actualizar = true;
            try {
               const {data} = await apolloClient.mutate({
                   mutation: gql`
                    mutation()
                    {
                        
                    }
                   `,
                   variables: {
                      
                   }
               })
                
            } catch (error) {
               
            }
        },
    },
     
    mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key; 
            if(keypressed === "Escape"){
                this.cerrarModal();
            }    
        });

        EventBus.$on("cerrarListaAdministradores", ()=>{
            this.abrirListAdminis = false;
        });

        //Jalar los datos del administrador para que al principio se muestre en la tabla.
    }
}
</script>
