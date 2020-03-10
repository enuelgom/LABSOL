 <template>
    <div>
        <v-toolbar color="primary" dark >
            <v-toolbar-items>
                <v-img class="my-4" src="@/assets/cozyt.png"  style="height: 35px; width: 180px;" />
                <v-img class="mt-1 mb-1 mx-3" style="position: relative; height: 52px; width: 42px;" src="@/assets/labsol.png" />
                <v-img class="pb-3" style="position: relative; height: 60px; width: 90px;" src="@/assets/ILN.png" />
            </v-toolbar-items>
            <v-spacer />
            <v-toolbar-title>{{ usuarioLogeado.nombre.toUpperCase() }}</v-toolbar-title>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" v-on="on" @click="abrirModalEditar">
                        <v-icon>fa fa-edit</v-icon>
                    </v-btn>
                </template>
                <span>Editar cuenta</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" v-on="on" @click="abrirModalRegLab">
                        <v-icon>fa fa-plus</v-icon>
                    </v-btn>
                </template>
                <span>Agregar laboratorio</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" v-on="on" @click="logOut">
                        <v-icon>fa fa-sign-out-alt</v-icon>
                    </v-btn>
                </template>
                <span>Cerrar sesion</span>
            </v-tooltip>
        </v-toolbar>
    <NuevoLaboratorio :agregarLaboratorio="abrirRegistroLab"/>
    <Logout :confirmacionLogout="abrirLogout"/>
    <EditarCuenta :modalEditarDatos="editarDatos"/>
    </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import NuevoLaboratorio from '@/components/Admins/NuevoLaboratorio'
import { mapState } from "vuex"
import Logout from '../Logout'
import EditarCuenta from '@/components/Admins/EditarCuenta'

export default {
    name: 'navAdmin',
    components: { NuevoLaboratorio, Logout, EditarCuenta },

    data: () => ({
        abrirRegistroLab: false,
        abrirLogout: false,
        editarDatos: false
    }),

    methods: {
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



    }
}
</script>