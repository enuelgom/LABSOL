<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Administrador registrado! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-snackbar color="red" v-model="msjerror" top>¡{{ msjErrorRegistro }}! <v-btn style="outline:none;" color="white" text @click="msjerror=false">Cerrar</v-btn></v-snackbar>

        <v-dialog v-model="agregarAdministrador" max-width="800" persistent>
            <v-card color="grey lighten-3">
                <v-toolbar color="primary" dark>
                    <v-card-title>Agregar nuevo administrador</v-card-title>
                    <v-spacer />
                    <v-btn style="outline:none;" icon @click="cerrarModal"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-form ref="formAgregarAdmin" v-model="esValido">
                            <v-row>
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-combobox
                                    prepend-icon="fa fa-users"
                                    v-model="privilegios"
                                    :items="items"
                                    label="Seleccione los privilegios"
                                    multiple
                                    chips
                                    >
                                    <template v-slot:selection="data">
                                        <v-chip
                                        :key="JSON.stringify(data.item)"
                                        v-bind="data.attrs"
                                        :input-value="data.selected"
                                        :disabled="data.disabled"
                                        @click:close="data.parent.selectItem(data.item)"
                                        >
                                        <v-avatar
                                            class="accent white--text"
                                            left
                                            v-text="data.item.slice(0, 1).toUpperCase()"
                                        ></v-avatar>
                                        {{ data.item }}
                                        </v-chip>
                                    </template>
                                    </v-combobox>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-text-field :rules="nombre" prepend-icon="fa fa-id-card" label="Nombre completo" v-model="datosAdmin.nombre" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :rules="telefono" v-mask="mask" type="text" prepend-icon="fa fa-phone" label="Número teléfono" v-model="datosAdmin.telefono" dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field :rules="correo" prepend-icon="fa fa-envelope" label="Correo" v-model="datosAdmin.correo" dense />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="usuario" prepend-icon="fa fa-user" label="Usuario" v-model="datosAdmin.usuario" dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="psw" prepend-icon="fa fa-lock" label="Contraseña" v-model="datosAdmin.psw" dense
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
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-btn style="outline:none;" :disabled="!esValido" block color="success" @click="addAdmin" rounded>Agregar administrador</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-btn style="outline:none;" block color="primary" @click="abrirListaAdministradores" dark rounded>Ver administradores</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
        <ListaAdministradores :listaAdmins="abrirListAdminis"/>
    </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import gql from 'graphql-tag'
import { mask } from "vue-the-mask"
import { apolloClient } from '@/graphql/apollo'
import ListaAdministradores from '@/components/Admins/ListaAdministradores'

export default {
    name: "AgregarAdministrador",
    props:["agregarAdministrador"],
    components: {ListaAdministradores},

    directives:{
        mask
    },

    data: ()=>({
        msjsuccess: false,
        msjerror: false,
        esValido: false,
        show: false,
        show1: false,
        abrirListAdminis: false,
        msjErrorRegistro: '',
        pswConfirm: '',
        mask: '(###)-###-####',
        privilegios: ['Agregar laboratorios'],
        items: [
            'Agregar laboratorios',
            'Borrar laboratorios',
            'Aceptar proyectos'
        ],
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
            value => (value || "").length > 7 || "Minimo 8 caracteres"
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
        abrirListaAdministradores(){
            this.abrirListAdminis = true;
            this.cerrarModal();
        },

        cerrarModal(){
            EventBus.$emit("cerrarModalAddAdmin");
            try {
                this.$refs.formAgregarAdmin.reset();
                this.privilegios = ['Agregar laboratorios'];
                this.show = false;
                this.show1 = false;
            } catch (error) {
            }
        },

        async addAdmin(){
            try {
                const {data} = await this.$apollo.mutate({
                    mutation: gql`
                        mutation($privilegios: String!, $nombre: String!, $telefono: String!, $correo: String!, $usuario: String!, $clave: String!)
                        {
                            
                        }
                    `,
                    variables: {
                        privilegios: this.privilegios,
                        nombre: this.datosAdmin.nombre,
                        telefono: this.datosAdmin.telefono,
                        correo: this.datosAdmin.correo,
                        usuario: this.datosAdmin.usuario,
                        clave: this.datosAdmin.psw
                    }
                })
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

        EventBus.$on("cerrarListaAdministradores", ()=>{
            this.abrirListAdminis = false;
        });
    }
}
</script>
