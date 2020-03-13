<template>
  <div>
    <v-snackbar color="green" v-model="msjsuccess" top>¡Datos actualizados! <v-btn color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
    <v-snackbar color="red" v-model="msjerror" top>¡{{ msjErrorRegistro }}! <v-btn color="white" text @click="msjerror=false">Cerrar</v-btn></v-snackbar>

      <v-dialog v-model="actualizarInfoProyecto" max-width="1000" persistent>
          <v-form ref="formRegProyecto" v-model="esValido">
            <v-card color="grey lighten-3">
                <v-toolbar color="primary" dark>
                    <v-card-title>Actualizar datos</v-card-title>
                    <v-spacer />
                    <v-btn icon @click="cerrarModalActualizarInfPro"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 5px;"><strong>Informacion del proyecto</strong></v-card-subtitle>
                    <v-row>
                        <v-col cols="12" sm="12" md="8" lg="8">
                            <v-text-field :rules="reglaNombre" :disabled="actualizar" prepend-icon="fa fa-info" label="Nombre" v-model="datosProyecto.nombre" />
                        </v-col>
                        <v-col cols="12" sm="12" md="4" lg="4">
                            <v-text-field v-mask="mask" type="text" :disabled="actualizar" :rules="reglaAlumnosRequeridos" prepend-icon="fa fa-info" label="Alumnos requeridos" v-model="datosProyecto.alumnosRequeridos" min="1" />
                        </v-col>
                    </v-row>
                    <v-row>   
                        <v-col cols="12" sm="12" md="6" lg="6">
                            <v-textarea rows="3" :disabled="actualizar" :rules="reglaObjetivo" prepend-icon="fa fa-list-alt" label="Objetivo" v-model="datosProyecto.objetivo" >
                                <template v-slot:label>
                                <div>
                                    <p>Objetivo</p>
                                </div>
                                </template>
                            </v-textarea>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6" >
                            <v-textarea rows="3" :disabled="actualizar" :rules="reglaRequerimientos" prepend-icon="fa fa-list-alt" label="Alcences" v-model="datosProyecto.requerimientos" >
                                <template v-slot:label>
                                <div>
                                    <p>Requerimientos</p>
                                </div>
                                </template>
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 1px;"><strong>Perfiles y habilidades requeridas</strong></v-card-subtitle>
                    <v-row>
                        <v-col cols="12" sm="12" md="6" lg="6" >
                            <v-textarea rows="3" :disabled="actualizar" :rules="reglaPerfiles" prepend-icon="fa fa-list-alt" label="Metas" v-model="datosProyecto.perfiles" >
                                <template v-slot:label>
                                <div>
                                    <p>Perfiles</p>
                                </div>
                                </template>
                            </v-textarea>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6" >
                            <v-textarea rows="3" :disabled="actualizar" :rules="reglaHabilidades" prepend-icon="fa fa-list-alt" label="Metas" v-model="datosProyecto.habilidades" >
                                <template v-slot:label>
                                <div>
                                    <p>Habilidades</p>
                                </div>
                                </template>
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <v-row justify="center" v-if="actualizar">
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-btn block outlined color="orange darken-2" @click="cancelarActualizacion">Modificar</v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-btn block outlined color="red" @click="cancelarActualizacion">Cancelar</v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-btn block outlined color="success" :disabled="!esValido" @click="actulizarInfoProyecto">Actualizar</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
          </v-form>
      </v-dialog>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus"
import { mapActions } from "vuex"
import { mask } from "vue-the-mask"
import { apolloClient } from '../../graphql/apollo'
import gql from 'graphql-tag'

export default {
    name: "EditarInfoProyecto",
    props: ["actualizarInfoProyecto"],

    directives: {
        mask
    },

    data: ()=>({
        mask: '#',
        msjsuccess: false,
        msjerror: false,
        msjErrorRegistro: "",
        actualizar: true,
        desactivar: true,
        esValido: true,
        infoProyecto: "",
        datosProyecto:{
            _id: "",
            nombre: "",
            alumnosRequeridos: "",
            objetivo: "",
            requerimientos: "",
            perfiles: "",
            habilidades: ""
        },
        reglaAlumnosRequeridos: [
            value => !!value || "La cantidad de alumnos es requerido",
            value => value >= 1 || "Debe de ingresar al menos un integrante"
        ],
        reglaNombre: [
            value => !!value || "El nombre del proyecto es requerido"
        ],
        reglaObjetivo: [
            value => !!value || "El objetivo es requerido"
        ],
        reglaRequerimientos: [
            value => !!value || "Los requerimientos son requeridos"
        ],
        reglaPerfiles: [
            value => !!value || "El perfil es requerido"
        ],
        reglaHabilidades: [
            value => !!value || "Las habilidades son requeridas"
        ]
    }),

    methods: {
        cancelarActualizacion(){
            this.obtenerDatosProyecto();
            this.actualizar = !this.actualizar;
            this.desactivar = !this.desactivar;
        },
        cerrarModalActualizarInfPro(){
            this.obtenerDatosProyecto();
            this.actualizar = true;
            this.desactivar = true;
            EventBus.$emit("cerrarModalActualizarInfoProyecto");
        },
        // Obtener datos del proyecto
        async obtenerDatosProyecto(){
            try {
                const {data} = await this.$apollo.query({
                    query: gql`
                        query($nombre: String!, $proyecto: String!)
                        {
                            proyecto(nombre: $nombre, proyecto: $proyecto){
                                _id
                                proyecto
                                objetivo
                                requerimientos
                                perfiles
                                habilidades
                                numAlu
                            }   
                        }
                    `,
                    variables: {
                        nombre: this.$route.params.nameLab,
                        proyecto: this.infoProyecto
                    }
                })
                this.datosProyecto._id = data.proyecto._id,
                this.datosProyecto.nombre= data.proyecto.proyecto,
                this.datosProyecto.objetivo = data.proyecto.objetivo,
                this.datosProyecto.requerimientos = data.proyecto.requerimientos,
                this.datosProyecto.perfiles = data.proyecto.perfiles
                this.datosProyecto.habilidades = data.proyecto.habilidades                 
                this.datosProyecto.alumnosRequeridos = data.proyecto.numAlu
            } catch (error) {
                console.log(error)
            }
        },

        // Actualizar la informacion de los proyectos
        async actulizarInfoProyecto(){
            this.actualizar = true;
            try {
                const { data } = await apolloClient.mutate({
                    mutation: gql`
                        mutation($_id: String!, $proyecto: String!, $alumnosRequeridos: String!, $objetivo: String!, $requerimientos: String!, $perfiles: String!, $habilidades: String!)
                        {
                            updateProyecto(_id: $_id, proyecto: $proyecto, numAlu: $alumnosRequeridos, objetivo: $objetivo, requerimientos: $requerimientos, perfiles: $perfiles, habilidades: $habilidades)
                        }
                    `,
                    variables: {
                        _id: this.datosProyecto._id,
                        proyecto: this.datosProyecto.nombre,
                        alumnosRequeridos: this.datosProyecto.alumnosRequeridos,
                        objetivo: this.datosProyecto.objetivo,
                        requerimientos: this.datosProyecto.requerimientos,
                        perfiles: this.datosProyecto.perfiles,
                        habilidades: this.datosProyecto.habilidades
                    }
                })
                const msj = data.updateProyecto;
                if (msj === "Proyecto existente") {
                    this.msjErrorRegistro = msj;
                    this.msjerror = true;
                    setTimeout(() => {
                        this.msjerror = false;
                    }, 3000);
                } else {
                    this.infoProyecto = this.datosProyecto.nombre;
                    this.obtenerDatosProyecto();
                    EventBus.$emit("actualizarInfoDeProyecto");
                    this.msjsuccess = true;
                    setTimeout(() => {
                        this.msjsuccess = false;
                    }, 3000);
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    
    mounted() {
        document.addEventListener("keydown", event => {
            const keypressed = event.key; 
            if(keypressed === "Escape"){
                this.cerrarModalActualizarInfPro();
            }    
        });

        EventBus.$on("ActualizarInfoProyectos", (item)=>{
            this.infoProyecto = item;
            this.obtenerDatosProyecto();
        });
       
    }

}
</script>

<style>

</style>