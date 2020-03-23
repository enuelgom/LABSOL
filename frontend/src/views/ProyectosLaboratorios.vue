<template>
    <div>
        <Navbar v-if="usuarioLogeado.tipUsuario === '' "/>
        <navAdmin v-else-if="usuarioLogeado.tipUsuario === '0'"/>
        <navLab  v-else-if="usuarioLogeado.tipUsuario === '1' || usuarioLogeado.tipUsuario === '1.1'"/>
        <navAlum  v-else-if="usuarioLogeado.tipUsuario === '2'"/>
        
      <v-container class="scroll-y">
        <v-layout align-center justify-center>
            <v-flex xs12>
                <p class="display-1 text-center">{{ this.nombreLab.toUpperCase() }}</p>
                <hr>
                <tablasProyectos />
                <v-btn v-scroll="onScroll" fab dark fixed bottom small left color="blue" :to="{ name: 'ListaLaboratorios'}" style="outline:none;">
                    <v-icon>fa fa-arrow-left</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import navAlum from '@/components/navegacion/navAlum'
import navAdmin from '@/components/navegacion/navAdmin'
import navLab from '@/components/navegacion/navLab'
import tablasProyectos from '../components/tablasProyectos'
import { mapMutations, mapState } from "vuex"
import gql from 'graphql-tag'
import { EventBus } from '@/EventBus'

export default {
    name: "ProyectoLaboratorios",
    components: { Navbar, tablasProyectos, navAdmin, navAlum, navLab  },
    
    data: () => ({ 
        fab:false,   
        name: "",
        nombreLab: "",
        direccion:"", 
    }),

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

        async getLabName(){
            try {
                const {data} = await this.$apollo.query({
                    query:gql`
                        query($siglas: String!)
                        {
                            getLabName(siglas: $siglas)
                        }
                    `,
                    variables:{
                        siglas: this.name
                    }
                })
                this.nombreLab = data.getLabName
            } catch (error) {
            
            }
        } 
    },
    created(){
        this.guardarUsuarioLog();
    },
    mounted(){
        this.name = this.$route.params.nameLab;
        this.getLabName();

        EventBus.$on("updateNombre", ()=>{
            this.getLabName();
        })
    }
}
</script>
