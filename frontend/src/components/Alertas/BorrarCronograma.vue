<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>!Fase y actividades borradas! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-row justify="center">
            <v-dialog v-model="alertaBorrarCronograma" max-width="350" persistent>
                <v-card>
                    <v-toolbar color="red" dark>
                        <v-row justify="center">
                            <v-card-title>¡Alerta!</v-card-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <v-row class="mt-4" justify="center">
                            <v-col cols="12" sm="12" md="12" lg="12">
                                <p class="text-center"><strong>¿Está seguro que desea borrar el contenido del cronograma?</strong></p>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row justify="center">
                            <v-col cols="6" sm="6" >
                                <v-btn class="mx-5" style="width:100px; height:35px; outline:none;" color="error" @click="cerrarAlertaEliminar" outlined>Cancelar</v-btn>
                            </v-col>
                            <v-col cols="6" sm="6">
                                <v-btn class="mx-4" style="width:100px; height:35px; outline:none;" color="success"  @click="eliminarProyecto" outlined>Aceptar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import { EventBus } from "@/EventBus"

export default {
    name: 'BorrarCronograma',
    props: ["alertaBorrarCronograma"],
    
    data: ()=>({
        msjsuccess: false
    }),

    methods: {
        cerrarAlertaEliminar(){
            EventBus.$emit("cerrarBorrarCronogramaAct");
        },

        eliminarProyecto(){
            EventBus.$emit("borrarCronogramaDeAct");
            this.msjsuccess = true;
            setTimeout(() => {
                this.msjsuccess = false;
            }, 3000);
        }
    }   
}
</script>