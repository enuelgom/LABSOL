<template>
    <div>
        <Navbar v-if="usuarioLogeado.tipUsuario === '' "/>
        <navAdmin v-else-if="usuarioLogeado.tipUsuario === '0'"/>
        <navLab  v-else-if="usuarioLogeado.tipUsuario === '1'"/>
        <navAlum  v-else-if="usuarioLogeado.tipUsuario === '2'"/>
        
      <v-container>
        <p class="display-1 text-center">{{ this.nombreLab.toUpperCase() }}</p>
        <hr>
        <tablasProyectos />
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

export default {
    name: "ProyectoLaboratorios",
    components: { Navbar, tablasProyectos, navAdmin, navAlum, navLab  },
    
    data: () => ({    
        name: "",
        nombreLab: "",
        direccion:"", 
    }),

    computed: {
        ...mapState(["usuarioLogeado"])
    },

    methods: {
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
    }
}
</script>
