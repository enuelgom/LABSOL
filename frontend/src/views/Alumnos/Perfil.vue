<template>
    <div>
        <navAlum />
        <v-container >
            <Info />
            <br>
            <Proyecto />
            <br>
            <Metodologia v-if="visible"/>
            <br>
            <v-row justify="center">
                <v-btn to="/" clearable color="success">Pagina inicial</v-btn>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import navAlum from '@/components/navegacion/navAlum'
import Info from '../../components/Alumnos/Info'
import Proyecto from '@/components/Alumnos/Proyecto'
import { mapMutations } from "vuex";
import Metodologia from '@/components/Proyectos/Metodologia'
import { EventBus } from '@/EventBus'
import gql from 'graphql-tag'

export default {
    name: 'Perfil',
    components: { navAlum, Info, Proyecto, Metodologia },

    data:()=>({
        visible: false,
    }),

    created(){
        this.guardarUsuarioLog()
    },

    methods: {
        ...mapMutations(['guardarUsuarioLog']),

        async existeMetodologia(nombre, proyecto){
            try {
                const {data} = await this.$apollo.query({
                query: gql`
                    query($nombre: String!, $proyecto: String!)
                    {
                    existeMetod(nombre: $nombre, proyecto: $proyecto)
                    }
                `,
                variables: {
                    nombre: nombre,
                    proyecto: proyecto
                }
                })
                
            } catch (error) {
                     
            }
        }
    },

    mounted(){
        EventBus.$on("tablaMetodologiaVisible", (nombre,proyecto, metod)=>{
            this.visible = true;
            setTimeout(() => {
                EventBus.$emit("tablaMetodologiaDatos", nombre, proyecto, metod);
            }, 100);
        })
    }
}
</script>