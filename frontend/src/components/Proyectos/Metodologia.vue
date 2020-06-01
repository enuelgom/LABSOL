<template>
    <div>
        <v-card elevation="6">
            <v-toolbar flat color="white">
                <v-card-title>Cronograma</v-card-title>
                <v-spacer></v-spacer>
                 <v-tooltip bottom  v-if="usuarioLogeado.tipUsuario==='2'">
                    <template v-slot:activator="{on}">
                        <v-btn style="outline:none;" text icon color="success" v-on="on" @click="abrirModalFaseAct">
                        <v-icon>fa fa-pencil-alt</v-icon>
                        </v-btn>
                    </template>
                    <span>Agregar fases y actividades</span>
                </v-tooltip>
                <v-tooltip bottom  v-if="usuarioLogeado.tipUsuario==='2'">
                    <template v-slot:activator="{on}">
                        <v-btn style="outline:none;" text icon color="red" v-on="on" @click="AlertaBorrarCronograma">
                        <v-icon>fa fa-trash</v-icon>
                        </v-btn>
                    </template>
                    <span>Borrar fases y actividades</span>
                </v-tooltip>
            </v-toolbar>

            <v-card-text>
                <b-table  small :fields="fields" :items="DatosFaseAct" responsive="sm">
                    <template v-slot:thead-top>
                        <b-tr>
                            <b-th colspan="18">Repositorio: <a style="color:blue;" target="_blank" :href="repo">{{repo}}  </a>
                                <v-tooltip bottom  v-if="usuarioLogeado.tipUsuario==='2'">
                                    <template v-slot:activator="{on}">
                                        <v-btn style="outline:none;" text icon color="success" v-on="on" @click="editarRepositorio" x-small>
                                        <v-icon small>fa fa-edit</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Cambiar repositorio</span>
                                </v-tooltip>
                            </b-th>
                        </b-tr>
                        <b-tr >
                        <b-th colspan="6">Laboratorio: {{Nombre}}</b-th>
                        <b-th colspan="12">Nombre del proyecto: {{Proyecto}}</b-th>    
                        </b-tr>
                        <b-tr >
                        <b-th colspan="3">Metodologia: {{nomMetod}}
                            <v-tooltip bottom  v-if="usuarioLogeado.tipUsuario==='2'">
                                <template v-slot:activator="{on}">
                                    <v-btn style="outline:none;" text icon color="success" v-on="on" @click="editarMetodologia" x-small>
                                    <v-icon small>fa fa-edit</v-icon>
                                    </v-btn>
                                </template>
                                <span>Editar metodologia</span>
                            </v-tooltip>
                        </b-th>
                        
                        <b-th colspan="7"></b-th>    
                        <b-th colspan="6">Semanas</b-th>
                        <b-th colspan="3"></b-th>
                        </b-tr>
                    </template>

                    <template v-slot:thead-foot>
                        <b-tr>
                            <b-th colspan="17"></b-th>
                            <b-th colspan="1">85</b-th>
                        </b-tr>
                    </template>
                    
                    <template v-slot:cell(1)="{item}">
                        <div v-if="item.semI<=1 && 1 <= item.semF" icon>
                            <v-icon color="success" class="sm">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(2)="{item}">
                        <div v-if="item.semI<=2 && 2 <= item.semF" icon>
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(3)="{item}">
                        <div v-if="item.semI<=3 && 3 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(4)="{item}">
                        <div v-if="item.semI<=4 && 4 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(5)="{item}">
                        <div v-if="item.semI<=5 && 5 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(6)="{item}">
                        <div v-if="item.semI<=6 && 6 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(7)="{item}">
                        <div v-if="item.semI<=7 && 7 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(8)="{item}">
                        <div v-if="item.semI<=8 && 8 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(9)="{item}">
                        <div v-if="item.semI<=9 && 9 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(10)="{item}">
                        <div v-if="item.semI<=10 && 10 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(11)="{item}">
                        <div v-if="item.semI<=11 && 11 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(12)="{item}">
                        <div v-if="item.semI<=12 && 12 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(13)="{item}">
                        <div v-if="item.semI<=13 && 13 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(14)="{item}">
                        <div v-if="item.semI<=14 && 14 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(15)="{item}">
                        <div v-if="item.semI<=15 && 15 <= item.semF">
                            <v-icon color="success">fa fa-circle</v-icon>
                        </div>
                    </template>
                    <template v-slot:cell(evaluacion)="{item}">
                        <div v-if="(((usuarioLogeado.tipUsuario === '2' || usuarioLogeado._id != colaborador) && usuarioLogeado.tipUsuario !='1')) && item.actividades!=null">
                            <span>{{item.evaluacion}}</span>
                        </div>
                        <v-row justify="center"  v-else-if="(usuarioLogeado.tipUsuario === '1' || (usuarioLogeado.tipUsuario === '1.1' && usuarioLogeado._id === colaborador)) && item.actividades!=null"> 
                            <div style="width:100px;">
                                <b-form-select v-model="item.evaluacion" @input="calificar(item.actividades,item.evaluacion)" :options="tipEvaluacion" size="sm" style="font-size:8pt"></b-form-select>
                            </div>
                        </v-row>
                    </template>
                </b-table>
            </v-card-text>
            <v-progress-linear :value="avance" id="progBar" color="light-blue"  height="25" striped>
                 <strong>{{ Math.ceil(avance) }}%</strong>
            </v-progress-linear>
        </v-card>
        <FaseActividad :agregarFaseAct="modalFaseAct" />
        <AgregarMetodologia :modalAlertaMetodologia="editarMetod" :editarMetodologia="abrirEditarMetod" />
        <BorrarCronograma :alertaBorrarCronograma="abrirBorrarCronograma" />
        <Repositorio :agregarRepositorio="abrirModalActRepo" />
    </div>
</template>

<script>
import { apolloClient } from '../../graphql/apollo'
import bootstrap from "@/plugins/Bootstrap-vue"
import { mapState } from "vuex"
import { EventBus } from '@/EventBus'
import FaseActividad from '@/components/Proyectos/FaseActividad'
import gql from 'graphql-tag'
import AgregarMetodologia from '@/components/Alertas/AgregarMetodologia'
import BorrarCronograma from '@/components/Alertas/BorrarCronograma'
import Repositorio from '@/components/Proyectos/Repositorio'

export default {
    name: 'Metodologia',
    components: { FaseActividad, AgregarMetodologia, BorrarCronograma, Repositorio },
  
    data: () => ({
        abrirBorrarCronograma: false,
        abrirEditarMetod: false,
        abrirModalActRepo: false,
        tipEvaluacion: [
            {value:  "", text: 'Seleccione'},
            {value: '4', text:'Exelente'},
            {value: '3', text:'Bueno'},
            {value: '2', text:'Regular'},
            {value: '1', text:'Deficiente'}
        ],
        evaluacion: null,
        avance: 0,
        colaborador: '',
        totalAvance: 0,
        totalFinalizado: 0,
        editarMetod: false,
        modalFaseAct: false,
        nomMetod: '',
        Nombre: '',
        Proyecto: '',
        repo: "",
        DatosFaseAct: [],
        fields: [
            { key:'fase', label: 'Fase'},
            { key:'actividades', label: 'Actividades'},
            { key:'1', label: '1'},
            { key:'2', label: '2'},
            { key:'3', label: '3'},
            { key:'4', label: '4'},
            { key:'5', label: '5'},
            { key:'6', label: '6'},
            { key:'7', label: '7'},
            { key:'8', label: '8'},
            { key:'9', label: '9'},
            { key:'10', label: '10'},
            { key:'11', label: '11'},
            { key:'12', label: '12'},
            { key:'13', label: '13'},
            { key:'14', label: '14'},
            { key:'15', label: '15'},
            { key:'evaluacion', label:'Evaluación', class: 'text-center'}
        ]
    }),

    computed:{
        ...mapState(["usuarioLogeado"])
    },

    methods: {

        async getRepo(){
            try {
                const {data} = await this.$apollo.query({
                    query: gql`
                        query($nombre: String!, $proyecto: String!)
                        {
                            existeRepo(nombre:$nombre, proyecto:$proyecto)
                        }
                    `,
                    variables: {
                        nombre: this.Nombre,
                        proyecto: this.Proyecto
                    }
                })
                this.repo = data.existeRepo;
            } catch (error) {
                
            }
        }
        ,
        // Abrir alerta para borrar el cronograma
        AlertaBorrarCronograma(){
            this.abrirBorrarCronograma = true;
        },
        
        editarRepositorio(){
            EventBus.$emit('cambiarVariableRepositorio2', this.Nombre,this.Proyecto);
            this.abrirModalActRepo = true;
        },
        // Calificar las actividades del cronograma de actividades
        async calificar(act, cali){
            if(cali===null)cali='';
            try {
                const {data} = this.$apollo.mutate({
                    mutation: gql`
                        mutation($nombre: String!, $proyecto: String!, $actividad: String!, $calificacion: String!)
                        {
                            calificarAvance(nombre: $nombre, proyecto:$proyecto, actividad:$actividad, calificacion:$calificacion)
                        }
                    `,
                    variables: {
                        nombre: this.Nombre,
                        proyecto: this.Proyecto,
                        actividad: act,
                        calificacion: cali
                    }
                })
                setTimeout(() => {
                    this.obtenerFaseAct();
                }, 700);
            } catch (error) {
                
            }
        },
        
        //Borrar el cronograma de actividades
        async borrarCronograma(){
            try {
                const {data} = this.$apollo.mutate({
                    mutation: gql`
                        mutation($nombre: String!, $proyecto: String!)
                        {
                            borrarCronograma(nombre: $nombre, proyecto: $proyecto)
                        }
                    `,
                    variables: {
                        nombre: this.Nombre,
                        proyecto: this.Proyecto,
                    }   
                })
                this.obtenerFaseAct();
            } catch (error) {
                console.log(error)
            }
        }, 

        // Editar metodologia 
        editarMetodologia(){
            this.abrirEditarMetod = true;
            EventBus.$emit("datosMetodologia",this.Nombre, this.Proyecto);
        },
        
        abrirModalFaseAct(){
            this.modalFaseAct = true;
            EventBus.$emit("datosProyectoAndLab",this.Nombre, this.Proyecto);
        },

        async obtenerFaseAct(){
            try {
                const {data} = await this.$apollo.query({
                    query: gql`
                        query($nombre: String!, $proyecto: String!)
                        {
                            getFaseAct(nombre:$nombre, proyecto:$proyecto){
                                fase
                                actividades
                                semI
                                semF
                                evaluacion
                                _rowVariant
                            }
                        }
                    `,
                    variables: {
                        nombre: this.Nombre,
                        proyecto: this.Proyecto
                    }
                })
                
                
                this.totalAvance= 0;
                this.totalFinalizado= 0;

                for(let val of data.getFaseAct){
                    if (val.actividades==='' || val.actividades===null){} else{
                        this.totalAvance=this.totalAvance+1;
                    }
                    if (val.evaluacion===null || val.evaluacion==='') {}else{
                        this.totalFinalizado=this.totalFinalizado+1;
                    }

                    if (this.usuarioLogeado.tipUsuario==="2" || (this.usuarioLogeado._id!=this.colaborador && this.usuarioLogeado.tipUsuario === '1.1')) {

                      switch (val.evaluacion) {
                            case "4": 
                                val.evaluacion = "Exelente"; 
                                break;
                            case "3": 
                                val.evaluacion = "Bueno"; 
                                break;
                            case "2": 
                                val.evaluacion = "Regular"; 
                                break;
                            case "1": 
                                val.evaluacion = "Deficiente"; 
                                break;
                            case "":
                                val.evaluacion="Sin calificar"; 
                                break; 
                                                      
                        }
                    }
                }

                setTimeout(() => {
                    this.DatosFaseAct = data.getFaseAct;
                    setTimeout(() => {
                        let total=((this.totalFinalizado/this.totalAvance)*100);
                        this.avance = total;
                    }, 900);
                }, 100);

            } catch (error) {
                
            }
        }
    },
    
    mounted(){
        EventBus.$on("cerrarModalFaseAct",()=>{
            this.modalFaseAct = false;
        });

        EventBus.$on("cerrarModalAlertaMetodologia", ()=>{
            this.editarMetod = false;
        });

        EventBus.$on("cerrarBorrarCronogramaAct", ()=>{
            this.abrirBorrarCronograma = false;
        });

        EventBus.$on("borrarCronogramaDeAct", ()=>{
            this.borrarCronograma();
            setTimeout(() => {
               this.abrirBorrarCronograma = false;
               this.obtenerFaseAct();
            }, 1000);
        });

        EventBus.$on("tablaMetodologiaDatos", (nombre, proyecto, Metod, colaborador)=>{
            this.Nombre = nombre;
            this.Proyecto = proyecto;
            this.nomMetod = Metod;
            this.colaborador = colaborador;
            
            setTimeout(() => {
                console.log("hecho")
                this.obtenerFaseAct();
                this.getRepo();
            }, 100);
        });

        EventBus.$on("actualizarCronogramaAct", ()=>{
            this.obtenerFaseAct();
            this.getRepo();
        });

        EventBus.$on("vaciarTablaActividades", ()=>{
            this.DatosFaseAct=[]
        });

        EventBus.$on("cerrarModalEditarMetodologia", ()=>{
            this.abrirEditarMetod = false;
        });

        EventBus.$on("cerrarModalActRepositorio", ()=>{
            this.abrirModalActRepo = false;
        });
        
    }
}
</script>