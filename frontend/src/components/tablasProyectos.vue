<template>
    <div>
        <v-snackbar color="green" v-model="fechaDisponible" top>¡{{fechaLimite}}!<v-btn style="outline:none;" color="white" text @click="fechaDisponible=false">Cerrar</v-btn></v-snackbar>
        <v-snackbar color="red" v-model="fechaExpirada" top>¡{{fechaLimite}}!<v-btn style="outline:none;" color="white" text @click="fechaExpirada=false">Cerrar</v-btn></v-snackbar>
        <v-container>
            <!-- Selector de categorias -->
            <v-row justify="center" v-if="labExistente===1">
                <!-- v-if="(usuarioLogeado.tipUsuario === '0' || usuarioLogeado.tipUsuario === '1') && labExistente===1" -->
                <v-col cols="12" sm="4">
                    <v-select v-if="(usuarioLogeado.siglas != this.$route.params.nameLab && (usuarioLogeado.tipUsuario==='1.1')) || usuarioLogeado.tipUsuario==='2' || usuarioLogeado.tipUsuario===''" v-model="proyectosNuevos" :items="options2" @input="categorias" outlined label="Seleccione la categoria"/>
                    <v-select v-else v-model="proyectosNuevos" :items="options" @input="categorias" outlined label="Seleccione la categoria"/>
                </v-col>
            </v-row>
            
            <v-row justify="center" v-if="labExistente===1">
                <v-card  class="my-4">
                    <v-card-title>Lista de proyectos
                        <v-spacer />
                        <v-text-field prepend-icon="fa fa-search" label="Buscar proyecto por nombre" v-model="filtro"></v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" v-if="usuarioLogeado.tipUsuario === '1' && usuarioLogeado.siglas === this.$route.params.nameLab"
                    :search="filtro" 
                    no-data-text="No existen proyectos disponibles" 
                    class="elevation-1" 
                    :loading="loading"
                    loading-text="Cargando... Espere por favor"
                    no-results-text="Proyecto no encontrado"
                    :footer-props="{itemsPerPageText:'Paginación'}"
                    :items="proyectos">
                        <!-- <template v-slot:item.acciones="{item}" v-if="usuarioLogeado.tipUsuario === '' || usuarioLogeado.tipUsuario === '2'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="primary" v-on="on" @click="verInfo(item)">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="green" v-on="on" @click="solicitarProyecto(item)">
                                    <v-icon>fa fa-paper-plane</v-icon>
                                    </v-btn>
                                </template>
                                <span>Solicitar proyecto</span>
                            </v-tooltip>
                        </template> -->

                        <!-- <template v-slot:item.acciones="{item}" v-else-if="usuarioLogeado.tipUsuario === '0'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="primary" v-on="on" @click="verInfo(item)">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                        </template> -->

                        <template v-slot:item.acciones="{item}" v-if="usuarioLogeado.tipUsuario === '1'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="primary" v-on="on" @click="verInfo(item)">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}" >
                                    <v-btn style="outline:none;" text icon color="success" v-on="on" @click="actualizarProyecto(item)">
                                    <v-icon>fa fa-edit</v-icon>
                                    </v-btn>
                                </template>
                                <span>Editar proyecto</span>
                            </v-tooltip>
                             <v-tooltip bottom v-if="item['status']!='Nuevo'">
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="orange" v-on="on" @click="agregarColaborador(item)">
                                    <v-icon>fa fa-user-plus</v-icon>
                                    </v-btn>
                                </template>
                                <span>Añadir colaborador</span>
                            </v-tooltip>
                            <v-tooltip bottom v-if="selected==='Proyectos en catalogo'">
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="error" v-on="on" @click="borrarProyecto(item)">
                                    <v-icon>fa fa-trash</v-icon>
                                    </v-btn>
                                </template>
                                <span>Borrar proyecto</span>
                            </v-tooltip>
                            <v-tooltip bottom v-if="selected==='Proyectos en catalogo'">
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="teal darken-4" v-on="on" @click="iniciarDesarrollo(item['proyecto'], 'En desarrollo', '¿Desea iniciar el desarrollo de este proyecto?')">
                                    <v-icon>fa fa-cogs</v-icon>
                                    </v-btn>
                                </template>
                                <span>Iniciar desarrollo</span>
                            </v-tooltip>
                            <v-tooltip bottom v-if="selected==='Proyectos en desarrollo'">
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="teal darken-4" v-on="on" @click="iniciarDesarrollo(item['proyecto'], 'Finalizado', '¿Desea finalizar el desarrollo de este proyecto?')">
                                    <v-icon>fa fa-thumbs-up</v-icon>
                                    </v-btn>
                                </template>
                                <span>Finalizar proyecto</span>
                            </v-tooltip>
                        </template>
                        <template v-slot:item.notificaciones="{item}" v-if="usuarioLogeado.tipUsuario === '1'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text color="blue" v-on="on" @click="verSolicitudes(item)">
                                        <v-badge :content="item['notificaciones']" :value="item['notificaciones']" color="red" overlap>
                                            <v-icon>fa fa-bell</v-icon>
                                        </v-badge>
                                    </v-btn>
                                </template>
                                <span>Ver solicitudes</span>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                    
                    <!-- Para cuando no es el propietaro Alumno y token vacio-->
                    <v-data-table :headers="headers2" v-else
                    :search="filtro" 
                    no-data-text="No existen proyectos disponibles" 
                    :loading="loading" 
                    loading-text="Cargando... Espere por favor"
                    class="elevation-1" 
                    no-results-text="Proyecto no encontrado"
                    :footer-props="{itemsPerPageText:'Paginación'}"
                    :items="proyectos"> 
                        <template v-slot:item.status="{item}" v-if="usuarioLogeado.tipUsuario === '' || usuarioLogeado.tipUsuario === '2'">
                            <v-tooltip v-if="item['alumnosExistentes'] < item['numAlu']" right>
                                <template v-slot:activator="{on}">
                                    <v-chip v-on="on" color="green" dark>Disponible</v-chip>
                                </template>
                                <span>El proyecto aún recibe solicitudes</span>
                            </v-tooltip>
                            <v-tooltip right v-else>
                                <template v-slot:activator="{on}">
                                    <v-chip v-on="on" color="red" dark>No disponible</v-chip>
                                </template>
                                <span>El proyecto ya cuenta con los alumnos requeridos</span>
                            </v-tooltip>
                        </template>
                        <template v-slot:item.acciones="{item}" v-if="(usuarioLogeado.tipUsuario === '' || usuarioLogeado.tipUsuario === '2')">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="primary" v-on="on" @click="verInfo(item)">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="green" :disabled="comprobarSolicitud(item.proyecto, item.numAlu, item.alumnosExistentes)" v-on="on" @click="solicitarProyecto(item)">
                                    <v-icon>fa fa-paper-plane</v-icon>
                                    </v-btn>
                                </template>
                                <span>Solicitar proyecto</span>
                            </v-tooltip>
                        </template>

                        <template v-slot:item.acciones="{item}" v-else-if="usuarioLogeado.tipUsuario === '0'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="primary" v-on="on" @click="verInfo(item)">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                            <v-tooltip bottom v-if="selected ==='Nuevos proyectos'">
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" :disabled="!privilegios.d" text icon color="green" v-on="on" @click="iniciarDesarrollo(item['proyecto'], 'Aceptado', '¿Desea aceptar la solicitud de proyecto del laboratorio?')">
                                    <v-icon>fa fa-check</v-icon>
                                    </v-btn>
                                </template>
                                <span>Aceptar proyecto</span>
                            </v-tooltip>
                            <v-tooltip bottom v-if="selected ==='Nuevos proyectos'">
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" :disabled="!privilegios.d" text icon color="red" v-on="on" @click="iniciarDesarrollo(item['proyecto'], 'Rechazado', '¿Desea rechazar la solicitud de este proyecto')">
                                    <v-icon>fa fa-times</v-icon>
                                    </v-btn>
                                </template>
                                <span>Rechazar proyecto</span>
                            </v-tooltip>
                        </template>

                        <template v-slot:item.acciones="{item}" v-else-if="usuarioLogeado.tipUsuario === '1' || usuarioLogeado.tipUsuario === '1.1'">
                            <v-tooltip bottom v-if="usuarioLogeado._id===item['colaboradores']">
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="primary" v-on="on" @click="verInfo(item)" >
                                    <v-icon>fa fa-check-square</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver mi proyecto</span>
                            </v-tooltip>
                            <v-tooltip bottom v-else>
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon :color="obtenerColor(item['colaboradores'])" v-on="on" @click="verInfo(item)">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                </v-card>
            </v-row>
            <v-container style="display: flex; justify-content: center;" v-else-if="labExistente===2">   
                <v-card color="grey lighten-4" width="400">
                    <v-toolbar color="red" dark>
                        <v-row class="justify-center">
                            <v-card-title >¡Error 404!</v-card-title> 
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <h3 class="text-center">El laboratorio no existe</h3>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn style="outline:none; text-decoration: none;" block color="red" outlined to="/">Regresar al inicio</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-container>

        <Login :openModel="abrirLogin" />
        <Loading :openLoading="open" />
        <informacion :visible="mostrarInfProyecto" :nomProyecto="nombreProyecto"/>
        <Solicitudes :mostrarSolocitudes="abrirModalSolicitud"/>
        <Editar :actualizarInfoProyecto="ActualizarInfoProyecto" />
        <Eliminar :confirmacionBorrar="abrirAlertaBorrar" />
        <SolicitudEnviada :msjAvisoSolicitud="msjAvisoSolicitudProyecto" />
        <ListaColaboradores :listaColaboradores="abrirListaColab" />
        <IniciarDesarrollo :iniciarDesarrollo="msjIniciarDesarrollo" />

    </div>
</template>

<script>
import Login from '@/components/Login'
import Loading from '@/components/Loader/Loading'
import informacion from '../components/Proyectos/informacion'
import { EventBus } from '@/EventBus'
import { mapState } from "vuex"
import { apolloClient } from '../graphql/apollo'
import gql from 'graphql-tag'
import Solicitudes from '@/components/Laboratorio/Solicitudes'
import Editar from '@/components/Proyectos/Editar'
import Eliminar from '../components/Alertas/Eliminar'
import SolicitudEnviada from '@/components/Alertas/SolicitudEnviada'
import ListaColaboradores from '@/components/Laboratorio/ListaColaboradores'
import IniciarDesarrollo from './Alertas/IniciarDesarrollo'

export default {
    name: 'tablasProyectos',
    components: {Login, Loading, informacion, Solicitudes, Editar, Eliminar, SolicitudEnviada, ListaColaboradores, IniciarDesarrollo},
    
    data: () => ({
        privilegios: {
            d: false
        },
        fechas: {
            fI: "",
            fT: ""
        },
        dateNow: "",
        fechaLimite: "",
        fechaDisponible: false,
        fechaExpirada: false,
        abrirAlertaBorrar: false,
        abrirListaColab: false,
        msjAvisoSolicitudProyecto: false,
        ActualizarInfoProyecto: false,
        msjIniciarDesarrollo: false,
        labExistente: 0,
        proyectosNuevos: "Nuevos proyectos",
        nombreRuta: "",
        total: "",
        filtro: "",
        loading: true,
        abrirLogin: false,
        open: null,
        mostrarInfProyecto: false,
        abrirModalSolicitud: false,
        nombreProyecto: "",
        nomProyecto2: "",
        nomProyecto: "",
        idProyecto: "",
        metodologia: false,
        selected: "Nuevos proyectos",
        comodin: [],
        headers: [
            {text: "Número", value: "numero", filerable: false},
            {text: "Nombre", value: "proyecto", sortable: false},
            {text: "Alumnos requeridos", value: "numAlu", sortable: false, align: 'center', value: 'numAlu', filerable: false},
            {text: "Estatus", value: "status", sortable: false, align: 'center', filerable: false},
            {text: "Acciones", value: "acciones", filerable: false, align: 'center', sortable: false, value: 'acciones'},
            {text: "Solicitudes", value: "notificaciones", filerable: false, align: 'center', sortable: false, value: 'notificaciones'}
        ],
        headers2: [
            {text: "Número", value: "numero", filerable: false},
            {text: "Nombre", value: "proyecto", sortable: false},
            {text: "Alumnos requeridos", value: "numAlu", sortable: false, align: 'center', filerable: false, value: 'numAlu'},
            {text: "Estatus", value: "status", sortable: false, filerable: false, align: 'center'},
            {text: "Acciones", value: "acciones", sortable: false, filerable: false, align: 'center', value: 'acciones'},
        ],
        com: [],
        proyectos: [],
        options: ['Nuevos proyectos', 'Proyectos en catalogo', 'Proyectos en desarrollo', 'Proyectos finalizados'],
        options2: ['Proyectos en catalogo', 'Proyectos en desarrollo', 'Proyectos finalizados'],

    }),

    computed:{
        ...mapState(["usuarioLogeado"])
    },

    methods: {
        iniciarDesarrollo(proyecto, estatus, mensaje){
            EventBus.$emit("iniciarDesarrollo", proyecto, estatus, mensaje)
            this.msjIniciarDesarrollo = true;
            //solicitudProyecto(item['proyecto'], 'En desarrollo')
        },

        obtenerColor(colaboradores){
            if(this.usuarioLogeado._id === colaboradores){
                return "green"
            }else{
                return "primary"
            }
        },

        // Abrir modal agregar colaborador
        agregarColaborador(item){
            this.nomProyecto2 = item.proyecto;
            EventBus.$emit("eviarNomProyectoColaborador", this.nomProyecto2, item.colaboradores);
            this.abrirListaColab = true;
        }, 

        // Abrir alerta de borrar proyecto
        borrarProyecto(item){
            this.idProyecto = item.proyecto;
            EventBus.$emit("enviarIDProyecto", this.idProyecto);
            this.abrirAlertaBorrar = true;
        },
        
        // Abrir modal actualizar proyecto
        actualizarProyecto(item){
            this.nomProyecto = item.proyecto;
            EventBus.$emit("ActualizarInfoProyectos", this.nomProyecto)
            this.ActualizarInfoProyecto = true;
        },

        categorias(item){
            this.proyectos=[];
            this.selected = item;
            if(item==="Proyectos en catalogo") {
                this.headers = this.com
            }else{
                this.headers = this.headers2
            }
            this.obtenerProyectos();
        },
        
        //Aceptar o rechazar proyectos de laboratorios
        async solicitudProyecto(proyecto, estatus){
            try {
                const {data} = await apolloClient.mutate({
                    mutation: gql`
                        mutation($proyecto: String!, $nombre: String!, $estatus: String!)
                        {
                            aceptarNuevoProyecto(proyecto: $proyecto, nombre: $nombre, accion: $estatus)
                        }
                    `,
                    variables: {
                        proyecto: proyecto,
                        nombre: this.$route.params.nameLab,
                        estatus: estatus
                    }
                })
                this.proyectos=[];
                this.obtenerProyectos();
            } catch (error) {
                
            }
        },

        comprobarSolicitud(proyecto, numAlumnos, alumnosExist){
            if (!this.fechas.fI <= this.dateNow && !this.dateNow <=this.fechas.fT) {
                return true;
            }

            if (numAlumnos <= alumnosExist) {
                return true;
            }
            for(let val of this.proyectos){
                if(val.proyecto===proyecto){
                    for(let val2 of val.alumnos){
                        if(val2._id===this.usuarioLogeado._id){
                            
                            return true;    
                        }
                    }
                }
            }
        },

        // Obtener los proyectos de los laboratorios
        async obtenerProyectos(){
        
        //this.proyectos=[];
            this.loading=true;
            try {
                const { data } = await this.$apollo.query({
                    query:gql`
                        query($nombre: String!, $proyectoCategoria: String!){
                            oneLab(nombre: $nombre, proyectoCategoria: $proyectoCategoria){
                                proyecto
                                status
                                objetivo
                                numAlu
                                colaboradores
                                alumnosExistentes
                                alumnos{
                                    _id
                                }
                            }
                        }
                    `,
                    variables:{
                        nombre: this.$route.params.nameLab,
                        proyectoCategoria: this.selected
                    }
                }) 
                
                if(data.oneLab!=null) {
                    this.labExistente=1;
                }else{
                    this.labExistente=2;
                }
                let j =0;
                for (let val of data.oneLab){
                    j=j+1;
                    var numero="numero";
                    var value = ""+j;
                    val[numero]=value;
                }

                this.comodin = data.oneLab;
                this.notificaciones();
                
            } catch (error) {
               
            }
        },
        async notificaciones(){
            let k =0;
            for(let val of this.comodin){
            let i = 0;
                try{
                    const { data } = await this.$apollo.query({
                        query:gql`
                            query($nombre: String!, $proyecto: String!){
                                proyecto(nombre: $nombre, proyecto: $proyecto){
                                    alumnos{
                                        status
                                    }
                                }
                            }    
                        `,
                        variables:{
                            nombre: this.$route.params.nameLab,
                            proyecto: val.proyecto
                        }
                    })
                    
                    for(let val2 of data.proyecto.alumnos){
                        if(val2.status==="En espera") i++
                    }
                    if (i===0) {
                        i="";
                    }

                    val["notificaciones"]=""+i;
                    if(this.proyectos[k]){
                        this.proyectos[k]=val;
                    }else{
                        this.proyectos.push(val);
                    }
                }catch(err){
                    console.log(err)
                }
                k=k+1;
            }
            //this.proyectos = this. comodin
            this.loading = false;
        },
       
        async solicitarProyecto(proyecto){
            if (localStorage.getItem("token")===null) {
                this.abrirLogin = true;
            }else{
                try{
                    this.open=true;
                    const { data } = await apolloClient.mutate({
                        mutation:gql`
                                mutation($nombre: String!, $proyecto: String!)
                                {
                                    solicitarProyecto(nombre: $nombre, proyecto: $proyecto)
                                }    
                            `,
                            variables:{
                                nombre: this.$route.params.nameLab,
                                proyecto: proyecto.proyecto
                            }
                        })
                    this.msjAvisoSolicitudProyecto = true;
                    this.obtenerProyectos();
                    }
                catch(error){
                    
            }
            }
        },

        verInfo(proyecto){
            setTimeout(() => {
                EventBus.$emit("VerInfoProyecto",this.usuarioLogeado.nombre, proyecto.proyecto, proyecto.status, proyecto.colaboradores);
                this.nombreProyecto = proyecto.proyecto;
                this.mostrarInfProyecto = true;   
            }, 500);
        },

        verSolicitudes(proyecto){
            this.nombreProyecto = proyecto.proyecto;
            EventBus.$emit("verSolicitudesProyecto", this.nombreProyecto)
            this.abrirModalSolicitud = true;
        }
    },
    mounted(){
        try {
            if (this.usuarioLogeado.p.includes("A")) {
                this.privilegios.d=true;
            }else{
                if (this.usuarioLogeado.p.includes("D")) {
                    this.privilegios.c=true;
                }
            }
        } catch (error) {
            
        }

        this.com = this.headers;
        this.headers = this.headers2;
        if((this.usuarioLogeado.tipUsuario === '2' || this.usuarioLogeado.tipUsuario === '' || this.usuarioLogeado.siglas != this.$route.params.nameLab || this.usuarioLogeado.tipUsuario === '1.1') && this.usuarioLogeado.tipUsuario != '0'){
            this.selected = 'Proyectos en catalogo'
            this.proyectosNuevos = 'Proyectos en catalogo'
            this.obtenerProyectos();
        }
        EventBus.$on("cerrarLoginTabla",() => {
           setTimeout(()=>{
            this.abrirLogin = false;
            },1500)
        });

        this.obtenerColor();

        EventBus.$on("closeLoader",() => {
            this.open = false;
        });

        EventBus.$on("closeLoginTachita",()=>{
            this.abrirLogin =false;
        });
        
        EventBus.$on("CerrarVerProyecto", () => {
            this.mostrarInfProyecto = false;
        });

        EventBus.$on("cerrarModalSolicitud",()=>{
            this.abrirModalSolicitud = false;
            this.notificaciones();
        });

        EventBus.$on("ActualizarTablaProyectos", ()=>{
            this.obtenerProyectos();
        });

        EventBus.$on("cerrarModalActualizarInfoProyecto",()=>{
            this.ActualizarInfoProyecto = false;
        });

        EventBus.$on("actualizarInfoDeProyecto", ()=>{
            setTimeout(() => {
                this.ActualizarInfoProyecto = false
            }, 1500);
            this.obtenerProyectos();
        });

        EventBus.$on("cerrarAlertaEliminarPro", ()=>{
            this.abrirAlertaBorrar = false;
        });

        EventBus.$on("updateTableProject", ()=>{
            this.obtenerProyectos();
        });

        EventBus.$on("cerrarModalAvisoSolicitud", ()=>{
             this.msjAvisoSolicitudProyecto = false;
        });

        EventBus.$on("cerrarModalListColab", ()=>{
            this.abrirListaColab = false;
        });

        EventBus.$on("recargate", (proyecto,colaborador)=>{
            for(let val of this.proyectos){
                if(val.proyecto===proyecto){
                    val.colaboradores=colaborador
                }
            }
        });

        EventBus.$on("VerificarAlumRequeridos",()=>{
            this.obtenerProyectos();
        });

        EventBus.$on("verificarFecha",(fI,fT)=>{
            this.fechas.fI = fI;
            this.fechas.fT = fT;

            let date = new Date();
            let day="";
            let month= "";
            if (date.getMonth()<=8) {
                month="0"+(date.getMonth()+1)
            }else{
                month=date.getMonth()+1;
            }
            if (date.getDate()<=9) {
                day = "0"+(date.getDate());
            }else{
                day=date.getDate();
            }           
            this.dateNow = date.getFullYear()+"-"+month+"-"+day
                let dt = new Date(fT)
                 let di = new Date(fI)
                 dt.setDate(dt.getDate()+1)
                 di.setDate(di.getDate()+1)
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                try {
                    
                    if (this.fechas.fI <= this.dateNow && this.dateNow <=this.fechas.fT) {
                        this.fechaLimite = "Solicitudes abiertas hasta el "+dt.toLocaleDateString('es-MX', options)
                    this.fechaDisponible = true;
                    setTimeout(() => {
                        this.fechaDisponible = false;
                    }, 5000);

                    }else{
                        if (this.dateNow<=fI) {
                            this.fechaLimite = "Las solicitudes comienzan el "+di.toLocaleDateString('es-MX', options)
                        }else{
                            this.fechaLimite = "Solicitudes cerradas"
                        }
                        this.fechaExpirada = true;
                        setTimeout(() => {
                            this.fechaExpirada = false;
                        }, 5000);
                    }
                } catch (error) {

                }

        });

        EventBus.$on("iniciarDesarrolloConfirm",(proyecto, estatus)=>{
            this.solicitudProyecto(proyecto, estatus);
            this.msjIniciarDesarrollo =false;
        });
        EventBus.$on("cerrarConfirmacionMsjIniciarDesarrollo",()=>{
            this.msjIniciarDesarrollo = false;
        });

        
        
    },
    created(){
        this.obtenerProyectos();
        this.name = this.$route.params.nameLab
    }
}
</script>
