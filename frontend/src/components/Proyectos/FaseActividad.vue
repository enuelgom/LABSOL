<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Registrado correctamente! <v-btn color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-row justify="center">
            <v-dialog v-model="agregarFaseAct" max-width="900" persistent>
                <v-form ref="formFaseAct" v-model="isValid">
                    <v-card>
                        <v-toolbar color="primary" dark>
                            <v-card-title>Fase y actividades</v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn @click="cerrarModalFA" icon><v-icon>fa fa-times</v-icon></v-btn>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-text-field v-model="datos.fase" :rules="fase" :disabled="desactivarFase" prepend-icon="fa fa-id-card" label="Nombre de la fase" />
                                </v-col>
                            </v-row>
                            <div>
                                <v-card-subtitle class="subtitle-2" front-weight-black style="padding: 5px;"><strong>Ingresa las actividades a realizar en esta fase</strong></v-card-subtitle>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6" lg="6">
                                        <v-text-field v-model="datos.actividad" :rules="actividad" prepend-icon="fa fa-id-card" label="Nombre de la actividad" ref="actividad"/>
                                    </v-col>
                                    <v-col cols="12" sm="3" md="3" lg="3">
                                        <v-select v-model="datos.semInicio" :rules="si" :items="semanaInicio" prepend-icon="fa fa-university" label="Semana inicial" ref="semanaInicial"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="3" md="3" lg="3">
                                        <v-select v-model="datos.semFinal" :rules="validarTamaño" :items="semanaFinal" prepend-icon="fa fa-university" label="Semana final" ref="semanaFinal"></v-select>                                      
                                    </v-col>
                                </v-row>
                                <v-row justify="center">
                                    <v-col cols="12" sm="2">
                                        <v-btn :disabled="!isValid" @click="guardarFaseActividad" class="success px-7">Guardar</v-btn>
                                    </v-col>
                                </v-row>
                            </div>
                            <v-divider></v-divider>
                            <v-row >
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <v-btn block color="blue" dark @click="siguienteFase">Siguiente fase</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-form>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import axios from 'axios'
import { EventBus } from '@/EventBus'
import gql from 'graphql-tag'

export default {
    name: "FaseActividad",
    props: ["agregarFaseAct"],

    data: ()=>({
        msjsuccess: false,
        desactivarFase: false,
        Nombre: '',
        Proyecto: '',
        isValid: true,
        semanaInicio: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        semanaFinal: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        datos: {
            fase: '',
            actividad: '',
            semInicio: '',
            semFinal: ''
        },
        fase: [
            value => !!value || "La fase es requerida"
        ],
        actividad: [
            value => !!value || "La fase es requerida"
        ],
        si: [
            value => !!value || "Seleccione la semana inicial"
        ]
    }),

    computed: {
        validarTamaño(){
            return [
                this.datos.semInicio <= this.datos.semFinal || "Seleccion invalida"
            ]
        }
    },

    methods: {
        cerrarModalFA(){
            try {
                EventBus.$emit("cerrarModalFaseAct");
                this.$refs.actividad.reset();
                this.$refs.semanaInicial.reset();
                this.$refs.semanaFinal.reset();
            } catch (error) {
                
            }
        },

        // Boton de la siguiente fase
        siguienteFase(){
            this.$refs.formFaseAct.reset();
            this.desactivarFase = false;
        },

        // Guardar las fases y actividades del cronograma
        async guardarFaseActividad(){
            try {
                const {data} = await this.$apollo.mutate({
                    mutation: gql`
                        mutation($nombre: String!, $proyecto: String!, $fase: String!, $actividad: String!, $semInicial: String!, $semFinal: String!)
                        {
                            asignarAvance(nombre: $nombre, proyecto: $proyecto, fase:$fase, actividad:$actividad, semanaInicial:$semInicial, semanaTerminacion: $semFinal)
                        }
                    `,
                    variables:{
                        nombre: this.Nombre,
                        proyecto: this.Proyecto,
                        fase: this.datos.fase,
                        actividad: this.datos.actividad,
                        semInicial: this.datos.semInicio+"",
                        semFinal: this.datos.semFinal+""
                    }
                })
                this.$refs.actividad.reset();
                this.$refs.semanaInicial.reset();
                this.$refs.semanaFinal.reset();
                this.desactivarFase = true;
                this.msjsuccess= true;
                setTimeout(() => {
                    this.msjsuccess=false;
                }, 3000);
                EventBus.$emit("actualizarCronogramaAct");
            } catch (error) {
                console.log(error)
            }
        }

    },

    mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key; 
            if(keypressed === "Escape"){
                this.cerrarModalFA();
            }    
        });

        EventBus.$on("datosProyectoAndLab", (nombre, proyecto)=>{
            this.Nombre = nombre;
            this.Proyecto = proyecto;
        })
    }


}
</script>