    <template>
    <div>
        <v-dialog v-model="EditarDatosLab" max-width="950" persistent>
            <v-form ref="vaciar" v-model="esValido">
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Editar datos</v-card-title>
                        <v-spacer />
                        <v-btn style="outline:none;" icon @click="cerrarModalEditar"><v-icon>fa fa-times</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="12" sm="12" md="12" lg="12">
                                   <v-text-field v-model="datosLab.nombre" :disabled="actualizar" :rules="nombre" prepend-icon="fa fa-id-card" label="Nombre de la intitución" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-text-field v-model="datosLab.siglas" :disabled="actualizar" :rules="siglas" prepend-icon="fa fa-id-card" label="Siglas de la institución" />
                                </v-col>
                                 <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-select v-model="datosLab.tipoLaboratorio" :disabled="true" @input="categoria" :rules="tipLabs" :items="tipLab" prepend-icon="fa fa-university" label="Tipo de laboratorio" />
                                </v-col>
                                 <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-file-input :disabled="actualizar" :rules="ruleslogo" @change="obtenerlogo($event)" accept="image/*" label="Logo de la institución" prepend-icon="fa fa-file-image" ref="fileInput" show-size chips></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-text-field v-model="datosLab.usuario" :disabled="actualizar" :rules="usuario" prepend-icon="fa fa-user" label="Usuario" />
                                </v-col>
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-text-field :disabled="actualizar" :rules="contraseña" prepend-icon="fa fa-lock" label="Contraseña" v-model="datosLab.psw" 
                                    :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"/>
                                </v-col> 
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-text-field :disabled="actualizar" :rules="confirmacionPsw" prepend-icon="fa fa-lock" label="Confirmación" v-model="pswConfirm"
                                    :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show1 ? 'text' : 'password'"
                                    @click:append="show1 = !show1"/>
                                </v-col>    
                            </v-row>
                            <v-row v-if="actualizar">
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-btn style="outline:none;" block outlined @click="cancelarActualizacion" color="orange darken-2">Modificar</v-btn>
                                </v-col>
                            </v-row>
                            <v-row v-else>
                                <v-col cols="12" sm="6" md="6" lg="6" >
                                    <v-btn style="outline:none;" block outlined @click="cancelarActualizacion" color="red">Cancelar</v-btn>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-btn style="outline:none;" block outlined color="success" :disabled="!esValido"  @click="actualizarDatos">Actualizar</v-btn>
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
import axios from 'axios'

export default {
    name: "EditarDatosLab",
    props: ["EditarDatosLab"],

    data: () => ({
        actualizar: true,
        show: false,
        show1: false,
        desactivar: true,
        esValido: true,
        logo:  {},
        pswConfirm: "",
        tipLab:['Intel', 'Labsol'],
        datosLab: {
            nombre: '',
            siglas: '',
            tipoLaboratorio: '',
            usuario: '',
            psw: ''
        },
        ruleslogo: [
            value => !value || value.size < 1000000 || "El archivo debe de pesar menos de 1mb"
        ],
        nombre: [
            value => !!value || "El nombre requerido"
        ],
        siglas: [
            value => !!value || "Sigla de la institución requerida"
        ],
        tipLabs: [
             value => !!value || "Seleccione el tipo de laboratorio"
        ],
        usuario: [
            value => !!value || "El usuario requerido",
            value => (value || '').length >= 8 || "El usuario debe de tener 8 caracteres"
        ],
        contraseña: [
            value => (value || "").length > 7 || (value || "").length == 0 || "Minimo 8 caracteres"
        ]
    }),

    computed:{
        confirmacionPsw(){
            return [
                this.datosLab.psw === this.pswConfirm || "La contraseña no coincide"
            ]
        },
        ...mapState(['usuarioLogeado'])
    },

    methods: {
        categoria(item){
            this.datosLab.tipoLaboratorio = item;
        },

        obtenerlogo(e){
            this.logo = e;
        },

        ...mapMutations(['guardarUsuarioLog']),

        cerrarModalEditar(){
            try {
                this.$refs.fileInput.reset();
                this.$refs.vaciar.reset();
                this.obtenerDatosLab();
                this.actualizar = true;
                this.desactivar = true;
                this.show = false;
                this.show1 = false;
                EventBus.$emit("cerrarModalActualizarLab");
            } catch (error) {

            }
        },
        //Cancelar actualización
        cancelarActualizacion() {
            this.obtenerDatosLab();
            this.$refs.fileInput.reset();
            this.datosLab.psw = "";
            this.pswConfirm = "";
            this.show = false;
            this.show1 = false;
            this.actualizar = !this.actualizar;
            this.desactivar = !this.desactivar;
        }, 
        // Obtener datos del laboratorio y asignarlos a los inputs
        async obtenerDatosLab(){
            try {
                const { data } = await this.$apollo.query({
                    query: gql`
                        query{
                            infoLab{
                                nombre
                                siglas
                                usuario
                                tipoLaboratorio
                            }
                        }
                    `
                })
                this.datosLab.nombre = data.infoLab.nombre
                this.datosLab.siglas = data.infoLab.siglas
                this.datosLab.usuario = data.infoLab.usuario
                this.datosLab.tipoLaboratorio = data.infoLab.tipoLaboratorio
            } catch (error) {
                
            }
        },
        
        // Actualizar datos del laboratorio
        async actualizarDatos(){
            this.actualizar = true;
            try {
                const {data} = await apolloClient.mutate({
                    mutation: gql`
                        mutation($nombre: String!, $tipoLaboratorio: String!, $siglas: String!, $usuario: String!, $psw: String!)
                        {
                            updateLab(nombre: $nombre, siglas: $siglas, tipoLaboratorio: $tipoLaboratorio, usuario: $usuario, clave: $psw)
                        }
                    `,
                    variables: {
                        nombre: this.datosLab.nombre,
                        siglas: this.datosLab.siglas,
                        tipoLaboratorio: this.datosLab.tipoLaboratorio,
                        usuario: this.datosLab.usuario,
                        psw: this.datosLab.psw
                    }
                })


                 // Mandar el logo
                if(this.logo.name){
                    let formData = new FormData();
                    formData.append("imagen",this.logo, `${this.datosLab.nombre}.jpg`);
                    await axios.post("/api/logos/upload", formData, {
                        headers: {
                            "Content-Type":"multipart/form-data",
                            "labname":`${this.datosLab.nombre}`,
                            Autorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                }

                // Mensaje de satisfactorio o erroneo
                const msj = data.updateLab;
                if (msj === "Usuario existente") {
                    EventBus.$emit("msjErrorActualizarLab", msj);
                    this.obtenerDatosLab();
                } else if(msj === "Sigla existente"){
                     EventBus.$emit("msjErrorActualizarLab", msj);
                     this.obtenerDatosLab();
                }else{
                    // Obtener el token y guardarlo
                    setTimeout(() => {
                        this.cerrarModalEditar();
                    }, 1500);
                    EventBus.$emit("updateNombre");
                    localStorage.setItem("token", data.updateLab);
                    this.guardarUsuarioLog();
                    this.obtenerDatosLab();
                    EventBus.$emit("msjDatosLabActualizados");
                    EventBus.$emit("updateNameLab");
                }   

                this.$refs.fileInput.reset();
            } catch (error) {
                                
            }
        }
    },

     mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key;
            try {
                if(keypressed === "Escape"){
                    this.cerrarModalEditar();
                }    
            } catch (error) {
            } 
        });

        this.obtenerDatosLab();
    }
}
</script>
