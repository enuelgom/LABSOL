<template>
  <div>
    <v-snackbar color="green" v-model="msjsuccess" top>¡Datos actualizados! <v-btn style="outline:none;" color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
    <v-snackbar color="red" v-model="msjerror" top>¡{{ msjErrorRegistro }}! <v-btn style="outline:none;" color="white" text @click="msjerror=false">Cerrar</v-btn></v-snackbar>

    <v-card elevation="6">
      <v-toolbar>
        <v-card-title>Datos personales</v-card-title>
        <v-spacer />
        <v-icon>fa fa-user</v-icon>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="esValido">
          <v-container fluid>
            <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 5px;"><strong>Información del alumno</strong></v-card-subtitle>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :rules="nombre" :disabled="actualizar" prepend-icon="fa fa-user" label="Nombre" v-model="datoAlumno.alumno" dense />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :rules="apellidoP" :disabled="actualizar" prepend-icon="fa fa-id-card" label="Apellido paterno" v-model="datoAlumno.ape_p" dense />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :rules="apellidoM" :disabled="actualizar" prepend-icon="fa fa-id-card" label="Apellido materno" v-model="datoAlumno.ape_m" dense />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :rules="reglaDomicilio" :disabled="actualizar" prepend-icon="fa fa-map-marker" label="Domicilio" v-model="datoAlumno.domicilio" dense />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :rules="reglaTelefono" v-mask="mask" :disabled="actualizar" prepend-icon="fa fa-phone" label="Número de telefono" v-model="datoAlumno.telefono" dense />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :rules="reglaCorreo" :disabled="actualizar" prepend-icon="fa fa-envelope" label="Correo" v-model="datoAlumno.correo" dense />
              </v-col>
            </v-row>
            <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 5px;"><strong>Información escolar</strong></v-card-subtitle>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :rules="reglaInstitucion" :disabled="actualizar" prepend-icon="fa fa-university" label="Institución" v-model="datoAlumno.institucion" dense />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :rules="reglaCarrera" :disabled="actualizar" prepend-icon="fa fa-graduation-cap" label="Carrera" v-model="datoAlumno.carrera" dense />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :rules="reglaSemestre" v-mask="mask1" :disabled="actualizar" type="text" prepend-icon="fa fa-sort" label="Semestre" v-model="datoAlumno.semestre_cursado" min="1" max="13" dense />
              </v-col>
            </v-row>
            <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 5px;"><strong>Cuenta</strong></v-card-subtitle>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :rules="reglaUsuario" :disabled="actualizar" prepend-icon="fa fa-user" label="Usuario" v-model="datoAlumno.usuario" dense />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :rules="pswAlumno" :disabled="actualizar" prepend-icon="fa fa-lock" label="Contraseña" v-model="datoAlumno.psw" dense
                :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"/>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field :disabled="actualizar" :rules="confirmacionPsw" v-model="pswConfirm" prepend-icon="fa fa-lock" label="Contraseña" dense
                :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"/>
              </v-col>
            </v-row>
            <v-row  justify="center" v-if="actualizar">
              <v-col cols="12" sm="4" md="4" lg="4">
                  <v-btn style="outline:none;" block outlined @click="cancelarActualizacion" color="orange darken-2">Modificar</v-btn>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12" sm="6" md="6" lg="6" >
                  <v-btn style="outline:none;" block outlined @click="cancelarActualizacion" color="red">Cancelar</v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                  <v-btn style="outline:none;" block outlined color="success" :disabled="!esValido"  @click="actualizarDatos">Actualizar</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { apolloClient } from '../../graphql/apollo'
import gql from 'graphql-tag'
import { mapState, mapMutations } from "vuex"
import { mask, mask1 } from "vue-the-mask"

export default {
  name: "InfoDelAlumno",

  directives:{
    mask,
    mask1
  },

  data: ()=>({
    esValido: true,
    actualizar: true,
    msjsuccess: false,
    msjerror: false,
    msjErrorRegistro: "",
    show: false,
    show1:false,
    mask: '(###)-###-####',
    mask1: '##',
    modificar: true,
    pswConfirm: "",
    datoAlumno: {
      _id: "",
      alumno: "",
      ape_p: "",
      ape_m: "",
      correo: "",
      telefono: "",
      institucion: "",
      carrera: "",
      semestre_cursado: "",
      domicilio: "",
      usuario: "",
      psw: ""
    },
    nombre: [
      value => !!value || "El nombre es requerido",
      value => {
        const nombre = /[`~!@#$%^&*()_°¬|+\-=?;:'"1234567890,<>\{\}\[\]\\\/]/gi;
        return !nombre.test(value) || "Solo se permiten letras";
      }
    ],
    apellidoP: [
      value => !!value || "El apellido paterno es requerido",
      value => {
        const nombre = /[`~!@#$%^&*()_°¬|+\-=?;:'"1234567890,<>\{\}\[\]\\\/]/gi;
        return !nombre.test(value) || "Solo se permiten letras";
      }
    ],
    apellidoM: [
      value => !!value || "El apellido materno es requerido",
      value => {
        const nombre = /[`~!@#$%^&*()_°¬|+\-=?;:'"1234567890,<>\{\}\[\]\\\/]/gi;
        return !nombre.test(value) || "Solo se permiten letras";
      }
    ],
    reglaDomicilio: [
      value => !!value || "El domicilio es requerido",
    ],
    reglaTelefono: [
      value => !!value || "El número de teléfono es requerido",
      value => (value || "").length === 14 || "Solo se permiten 10 digitos"
    ],
    reglaCorreo: [
      value => !!value || "El correo es requerido",
      value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Correo invalido'
      },
      value => /.+@.+/.test(value) || "El correo debe de ser valido"
    ],
    reglaInstitucion: [
      value => !!value || "La institución es requerida",
      value => {
        const nombre = /[`~!@$%^&*()_°¬|+\-=?;:'",<>\{\}\[\]\\\/]/gi;
        return !nombre.test(value) || "Solo se permiten letras";
      }
    ],
    reglaCarrera: [
      value => !!value || "La carrera es requerida",
      value => {
        const nombre = /[`~!@#$%^&*()_°¬|+\-=?;:'"1234567890,<>\{\}\[\]\\\/]/gi;
        return !nombre.test(value) || "Solo se permiten letras";
      }
    ],
    reglaSemestre: [
      value => !!value || "El semestre es requerido",
       value => (value || "") >= 1 || "Semestre incorrecto",
      value => (value || "") <= 12 || "Semestre incorrecto"
    ],
    reglaUsuario: [
      value => !!value || "El usuario es requerido",
      value => (value || "").length > 7 || "Minimo 8 caracteres"
    ],
    pswAlumno: [
      value => (value || "").length > 7 || (value || "").length == 0 || "Minimo 8 caracteres"
    ] 
    
  }),

  computed:{
    ...mapState(["usuarioLogeado"]),

    confirmacionPsw(){
      return [
          this.datoAlumno.psw === this.pswConfirm || "La contraseña no coincide"
      ]
    }
  },

  methods: {
    //Cancelar actualización
        cancelarActualizacion() {
          console.log("acc")
            this.obtenerDatosAlumno();
            this.datoAlumno.psw = "";
            this.pswConfirm = "";
            this.actualizar = !this.actualizar;
            this.desactivar = !this.desactivar;
        },

     ...mapMutations(['guardarUsuarioLog']),

    async obtenerDatosAlumno(){
      try {
        const { data } = await this.$apollo.query({
          query:gql`
              query($usuario: String!)
              {
                infoAlumno(usuario: $usuario){
                  _id
                  alumno
                  ape_p
                  ape_m
                  correo
                  telefono
                  institucion
                  carrera
                  semestre_cursado
                  domicilio
                  usuario
                }
              }    
          `,
          variables:{
              usuario: this.usuarioLogeado.nom_usuario
          }
      })
      this.datoAlumno._id = data.infoAlumno._id
      this.datoAlumno.alumno = data.infoAlumno.alumno
      this.datoAlumno.ape_p = data.infoAlumno.ape_p
      this.datoAlumno.ape_m = data.infoAlumno.ape_m
      this.datoAlumno.correo = data.infoAlumno.correo
      this.datoAlumno.telefono = data.infoAlumno.telefono
      this.datoAlumno.institucion = data.infoAlumno.institucion
      this.datoAlumno.carrera = data.infoAlumno.carrera
      this.datoAlumno.semestre_cursado = data.infoAlumno.semestre_cursado
      this.datoAlumno.domicilio = data.infoAlumno.domicilio
      this.datoAlumno.usuario = data.infoAlumno.usuario
      } catch (error) {
        console.log(error)
      }
    },

    async actualizarDatos({commit, state}){
      
      try {
        const { data } = await apolloClient.mutate({
          mutation: gql`
            mutation($_id: String!, $alumno: String!, $ape_p: String!, $ape_m: String!, $correo: String!, $telefono: String!, $institucion: String!, $carrera: String!, $semestre_cursado: String!, $domicilio: String!, $usuario: String!, $clave: String!)
            {
              actualizarALumno(_id: $_id, alumno: $alumno, ape_p: $ape_p, ape_m: $ape_m, correo: $correo, telefono: $telefono, institucion: $institucion, carrera: $carrera, semestre_cursado: $semestre_cursado, domicilio: $domicilio, usuario: $usuario, clave: $clave)
            }
          `,
          variables: {
            _id: this.datoAlumno._id,
            alumno: this.datoAlumno.alumno,
            ape_p: this.datoAlumno.ape_p,
            ape_m: this.datoAlumno.ape_m,
            correo: this.datoAlumno.correo,
            telefono: this.datoAlumno.telefono,
            institucion: this.datoAlumno.institucion,
            carrera: this.datoAlumno.carrera, 
            semestre_cursado: this.datoAlumno.semestre_cursado,
            domicilio: this.datoAlumno.domicilio,
            usuario: this.datoAlumno.usuario,
            clave: this.datoAlumno.psw
          }
        })
        
        const msj = data.actualizarALumno;
        console.log(msj)
        switch (msj) {
          case "Usuario existente":
            this.msjErrorRegistro = msj;
            this.msjerror=true
            break;
          case "Correo existente": 
            this.msjErrorRegistro = msj;
            this.msjerror=true
            break;
          default:
            this.msjsuccess = true;
            localStorage.setItem("token", data.actualizarALumno);
            this.guardarUsuarioLog();
            break;
        }
        this.obtenerDatosAlumno();
      } catch (error) {
        console.log(error)
      }
    }
  },

  mounted(){
    this.obtenerDatosAlumno();
  }
}
</script>
