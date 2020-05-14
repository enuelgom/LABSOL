<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Privilegios actualizados! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-dialog v-model="cambiarPrivilegios" max-width="700" persistent>
            <v-card color="grey lighten-3">
                <v-toolbar color="primary" dark>
                    <v-card-title>Cambiar privilegios</v-card-title>
                    <v-spacer />
                    <v-btn style="outline:none;" icon @click="cerrarModal"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="formCambiarPriv" v-model="esValido">
                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12">
                                <v-combobox
                                prepend-icon="fa fa-users"
                                :rules="[privileges]"
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
                                <v-btn style="outline:none;" :disabled="!esValido" block color="success" @click="actualizarPrivilegio" rounded>Actualizar</v-btn>
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
    name: "CambiarPrivilegios",
    props: ["cambiarPrivilegios"],

    data: ()=>({
        msjsuccess: false,
        esValido: false,
        privilegios: ['Agregar laboratorios'],
        items: [
            'Agregar laboratorios',
            'Borrar laboratorios',
            'Aceptar proyectos'
        ],
    }),

    methods: {
        privileges(value){
            if (value instanceof Array && value.length == 0) {
                return 'Los privilegios son requeridos';
            }
            return !!value || 'Los privilegios son requeridos';
        },

        cerrarModal(){
            EventBus.$emit("cerrarModalCambPriv");
            try {
                this.privilegios = ['Agregar laboratorios'];
            } catch (error) {}
        },

        async actualizarPrivilegio(){

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
