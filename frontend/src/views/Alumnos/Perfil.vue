<template>
    <div>
        <navAlum />
        <v-container class="scroll-y">
            <v-layout align-center justify-center>
                <v-flex xs12>
                    <Info />
                    <br>
                    <Proyecto />
                    <br>
                    <Metodologia v-if="visible"/>
                    <br>
                    <v-btn v-scroll="onScroll" fab dark fixed bottom small left color="blue" @click="toIndex" style="outline:none; text-decoration: none;">
                        <!-- :to="{ name: 'ListaLaboratorios'}" -->
                        <v-icon>fa fa-arrow-left</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import navAlum from '@/components/navegacion/navAlum'
import Info from '../../components/Alumnos/Info'
import Proyecto from '@/components/Alumnos/Proyecto'
import { mapMutations, mapState } from "vuex";
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

    computed: {
        ...mapState(["usuarioLogeado"])
    },

    methods: {
        onScroll (e) {
            if (typeof window === 'undefined') return
            const top = window.pageYOffset ||   e.target.scrollTop || 0
            this.fab = top > 20
            },
            toTop () {
            this.$vuetify.goTo(0)
        },
        
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
        },
        
        toIndex(){
            window.location.replace("/proyectos");
        }
    },

    mounted(){
        if (!localStorage.token || this.usuarioLogeado.tipUsuario != '2') {
            window.location.replace("/proyectos");
        }

        EventBus.$on("tablaMetodologiaVisible", (nombre,proyecto, metod)=>{
            this.visible = true;
            setTimeout(() => {
                EventBus.$emit("tablaMetodologiaDatos", nombre, proyecto, metod);
            }, 100);
        })
    }
}
/*
<ifModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /proyectos-labsol
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /proyectos-labsol/ [L]
</ifModule>

*/
</script>