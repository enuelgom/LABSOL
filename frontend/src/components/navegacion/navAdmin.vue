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
            <v-toolbar-title id="letraResp">{{ usuarioLogeado.nombre.toUpperCase() }}</v-toolbar-title>
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
                    <v-btn style="outline:none;" :disabled="!privilegios.addAdmin" text icon v-on="on" @click="abrirModalAgregarAdmin">
                        <v-icon>fa fa-user-plus</v-icon>
                    </v-btn>
                </template>
                <span>Agregar administradores</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn style="outline:none;" :disabled="!privilegios.b" text icon v-on="on" @click="abrirModalRegLab">
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
    <SesionExpirada :sesionExpirada="expSession"/>
    </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import NuevoLaboratorio from '@/components/Admins/NuevoLaboratorio'
import { mapState } from "vuex"
import Logout from '../Logout'
import EditarCuenta from '@/components/Admins/EditarCuenta'
import AgregarAdministrador from '@/components/Admins/AgregarAdministrador'
import SesionExpirada from '../Alertas/SesionExpirada'

export default {
    name: 'navAdmin',
    components: { NuevoLaboratorio, Logout, EditarCuenta, AgregarAdministrador, SesionExpirada },

    data: () => ({
        abrirRegistroLab: false,
        abrirLogout: false,
        editarDatos: false,
        agregarNuevosAdmins: false,
        expSession: false,
        privilegios: {
            addAdmin: false,
            b: false,
            c: false,
            d: false
        }

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
        },

        sessexp(){
            this.expSession = true;
        }
    },

    computed:{
        ...mapState(["usuarioLogeado"])
    },

    mounted(){

        if (this.usuarioLogeado.p.includes("A")) {
            this.privilegios.b=true;
            this.privilegios.c=true;
            this.privilegios.d=true;
            this.privilegios.addAdmin=true;
        }else{
            if (this.usuarioLogeado.p.includes("B")) {
                this.privilegios.b=true;
            }
            if (this.usuarioLogeado.p.includes("C")) {
                this.privilegios.c=true;
            }
            if (this.usuarioLogeado.p.includes("D")) {
                this.privilegios.d=true;
            }
        }

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

        EventBus.$on("sessionExpiredAdm", ()=>{
            this.expSession = true;
        })
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

  @media screen and (max-width: 550px) {
    #letraResp {
        font-size: 0.7rem;
    }
  }
  @media screen and (max-width: 360px) {
    #letraResp {
        font-size: 0.8rem;
    }
  }
</style>