<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>!Fechas asignadas! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        
        <v-dialog v-model="fechaSolicitudes" max-width="800" persistent>
            <v-card color="grey lighten-3">
                <v-toolbar color="primary" dark>
                    <v-card-title>Fecha de solicitudes</v-card-title>
                    <v-spacer />
                    <v-btn style="outline:none;" icon @click="cerrarModal"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="formFechas" v-model="esValido">
                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12">
                                <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 1px;"><strong>
                                En este apartado podrá seleccionar la fecha de inicio y termino en la que los alumnos podrán solicitar proyectos.     
                                </strong></v-card-subtitle>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-date-picker v-model="dates" range
                            year-icon="mdi-calendar-blank"
                            prev-icon="mdi-skip-previous"
                            next-icon="mdi-skip-next"
                            header-color="blue"
                            locale="es-419"
                            full-width
                            ></v-date-picker>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="6" lg="6">
                                <v-text-field :rules="fecha1" ref="f1" :value="date1" label="Fecha de inicio" prepend-icon="mdi-calendar-blank" readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" lg="6">
                                <v-text-field :rules="fecha2" ref="f2" :value="date2" label="Fecha de termino" prepend-icon="mdi-calendar-blank" readonly></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12">
                                <v-btn style="outline:none; text-decoration: none;" :disabled="!esValido" class="mt-1" block color="success" @click="guardarFecha" rounded>Guardar</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import gql from 'graphql-tag'
import { apolloClient } from '@/graphql/apollo'

export default {
    name: "FechaSolicitudes",
    props: ["fechaSolicitudes"],

    data () {
      return {
        dates: [],
        msjsuccess: false,
        esValido: true,
        fecha1: [
            value => !!value || "La fecha de inicio es requerida",
        ]
      }
    },
    
    computed: {
    //Me retorna las fechas a los inputs
      date1 () {
        return this.dates[0];
      },
      date2 () {
        return this.dates[1];
      },

      fecha2() {
        return [
            this.dates[0] < this.dates[1] || "Seleccion incorrecta",
        ]
      }
    },

    methods: {
        cerrarModal(){
            try {
                EventBus.$emit("cerrarFechaSolicitudes");
                this.dates[''];
                this.$refs.formFechas.reset();
            } catch (error) {
                
            }
        },

        async guardarFecha(){
            try {
                 const {data} = await this.$apollo.mutate({
                    mutation: gql`
                        mutation($fI: String!, $fT: String!)
                        {
                            asignarFechas(fI: $fI, fT: $fT)
                        }
                    `,
                    variables: {
                        fI: this.dates[0],
                        fT: this.dates[1]
                    }
                })
                this.msjsuccess = true;
                if (data.asignarFechas==="hecho") {
                    setTimeout(() => {
                        this.msjsuccess = false;
                        this.cerrarModal();
                    }, 1500);
                }
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
    }
}
</script>
