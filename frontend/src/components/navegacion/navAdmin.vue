 <template>
    <div>
        <v-toolbar color="white" class="mostrarNavbar">
            <v-row justify="center">
                <v-toolbar-items>
                    <v-img aspect-ratio="2" contain class="mt-1 mb-1 mx-3" style="position: relative; height: 52px; width: 42px;" src="../../assets/labsol.png" />
                    <v-img aspect-ratio="2" contain class="mt-2" src="../../assets/cozyt.png" style="height: 45px; width: 220px;" />
                    <v-img class="pb-3" style="position: relative; height: 60px; width: 90px;" src="../../assets/ILN.png" />
                </v-toolbar-items>
            </v-row>
        </v-toolbar>

        <v-toolbar color="secondary">
            <v-toolbar-items class="ocultarDiv">
                <v-img aspect-ratio="2" contain src="../../assets/cozyt.png"  style="height: 70px; width: 260px;"/>
                <v-img aspect-ratio="2" contain class="mt-1 mb-1 mx-3" style="position: relative; height: 52px; width: 42px;" src="../../assets/labsol.png" />
                <v-img class="pb-3" style="position: relative; height: 60px; width: 90px;" src="../../assets/ILN.png" />
            </v-toolbar-items>
            <v-spacer />
            <v-toolbar-title>{{ usuarioLogeado.nombre.toUpperCase() }}</v-toolbar-title>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" text icon v-on="on" @click="abrirModalEditar">
                        <v-icon>fa fa-edit</v-icon>
                    </v-btn>
                </template>
                <span>Editar cuenta</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" text icon v-on="on" @click="abrirModalAgregarAdmin">
                        <v-icon>fa fa-user-plus</v-icon>
                    </v-btn>
                </template>
                <span>Agregar administradores</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" text icon v-on="on" @click="abrirModalRegLab">
                        <v-icon>fa fa-plus</v-icon>
                    </v-btn>
                </template>
                <span>Agregar laboratorio</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" text icon v-on="on" @click="logOut">
                        <v-icon>fa fa-sign-out-alt</v-icon>
                    </v-btn>
                </template>
                <span>Cerrar sesion</span>
            </v-tooltip>
        </v-toolbar>
    <NuevoLaboratorio :agregarLaboratorio="abrirRegistroLab"/>
    <Logout :confirmacionLogout="abrirLogout"/>
    <EditarCuenta :modalEditarDatos="editarDatos"/>
    <AgregarAdministrador :agregarAdministrador="agregarNuevosAdmins" />
    </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import NuevoLaboratorio from '@/components/Admins/NuevoLaboratorio'
import { mapState } from "vuex"
import Logout from '../Logout'
import EditarCuenta from '@/components/Admins/EditarCuenta'
import AgregarAdministrador from '@/components/Admins/AgregarAdministrador'

export default {
    name: 'navAdmin',
    components: { NuevoLaboratorio, Logout, EditarCuenta, AgregarAdministrador },

    data: () => ({
        abrirRegistroLab: false,
        abrirLogout: false,
        editarDatos: false,
        agregarNuevosAdmins: false
    }),

    methods: {
        abrirModalAgregarAdmin(){
            this.agregarNuevosAdmins = true;
        },

        abrirModalRegLab(){
            this.abrirRegistroLab = true;
        },
        
        logOut(){
            this.abrirLogout = true;
        },

        abrirModalEditar(){
            this.editarDatos = true;
        }
    },

    computed:{
        ...mapState(["usuarioLogeado"])
    },

    mounted(){
        EventBus.$on("cerrarRegistroLab", () => {
            this.abrirRegistroLab = false;
        });

        EventBus.$on("cerrarModelNuevoLaboratorio", () => {
            this.abrirRegistroLab = false;
        });

        EventBus.$on("cerrarLogoutAdmin", ()=>{
            this.abrirLogout = false;
        });

        EventBus.$on("cerrarModalEditarAdmin", ()=>{
            this.editarDatos = false;
        });

        EventBus.$on("cerrarModalAddAdmin", ()=>{
            this.agregarNuevosAdmins = false;
        });
    }
}
</script>

<style scoped>
  @media screen and (max-width: 805px) {
    .ocultarDiv{
      display: none;
    }
  }

  @media screen and (max-width: 805px) {
    .mostrarNavbar{
      visibility: visible;
    }
  }

  @media screen and (min-width: 805px){
    .mostrarNavbar{
     display: none;
    }
  } 
</style>