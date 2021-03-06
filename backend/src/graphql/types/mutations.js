export const mutations = `
type Mutation{
    deleteAdmin(
        _id: String
    ): String
   
    asignarFechas(
        fI: String,
        fT: String
    ): String

    nuevoLab(
        nombre: String,
        siglas: String,
        logo: String,
        proyectos: String,
        usuario: String,
        clave: String,
        tipoLaboratorio: String,
    ): String

    agregarProyecto(
        proyecto: String,
        objetivo: String,
        requerimientos: String,
        perfiles: String,
        habilidades: String,
        avances: String,
        numAlu: String,
        alumnos: String
    ): String

    agregarAlumno(
        alumno: String
        ape_p: String,
        ape_m: String,
        correo: String,
        telefono: String,
        institucion: String,
        carrera: String,
        semestre_cursado: String,
        domicilio: String,
        usuario: String,
        clave: String
    ): String

    nuevoAdmin(
        nombre: String,
        usuario: String,
        clave: String
    ): String

    addSubAdmin(
        nombre: String,
        usuario: String,
        clave: String,
        privilegios: String,
        correo: String,
        telefono: String
    ): String

    solicitarProyecto(
        nombre: String,
        proyecto: String,
    ): String

    login(
        usuario: String,
        clave: String
    ): String
    
    agregarLista(
        elemento: String
    ): String

    Metodologia(
        nombre: String,
        proyecto: String,
        metodologia: String
    ): String

    asignarAvance(
        nombre: String,
        proyecto: String,
        fase: String,
        actividad: String,
        semanaInicial: String,
        semanaTerminacion: String
    ): String

        
    
    actualizarALumno(
        _id: String,
        alumno: String
        ape_p: String,
        ape_m: String,
        correo: String,
        telefono: String,
        institucion: String,
        carrera: String,
        semestre_cursado: String,
        domicilio: String,
        usuario: String,
        clave: String
    ): String

    logOut: String
    
    aceptarSolicitud(
        nombre: String,
        proyecto: String,
        _id: String,
        accion: String
    ): String

    aceptarNuevoProyecto(
        nombre: String,
        proyecto: String,
        accion: String
    ): String

    cancelarSolicitudAlumno(
        nombre: String,
        proyecto: String
    ): String

    updateAdmin(
        nombre: String,
        usuario: String,
        clave: String,
        correo: String,
        telefono: String
    ): String

    updateLab(
        nombre: String,
        siglas: String,
        usuario: String,
        clave: String,
        tipoLaboratorio: String,
    ): String

    updateProyecto(
        _id: String,
        proyecto: String,
        objetivo: String,
        requerimientos: String,
        perfiles: String,
        habilidades: String,
        avances: String,
        numAlu: String,
    ):String

    eliminarProyecto(
        proyecto: String,
    ): String

    eliminarLaboratorio(
        nombre: String
    ): String

    calificarAvance(
        nombre: String,
        proyecto: String,
        actividad: String,
        calificacion: String
    ): String

    borrarCronograma(
        nombre: String,
        proyecto: String,
    ): String
    
    addColaborador(
        nombre: String,
        telefono: String,
        correo: String,
        usuario: String,
        clave: String
    ): String

    updateColaborador(
        nombre: String,
        telefono: String,
        correo: String,
        usuario: String,
        clave: String
    ): String

    asignarColaborador(
        proyecto: String,
        _id: String
    ): String

    agregarRepositorio(
        nombre: String,
        proyecto: String,
        repositorio: String
    ): String
}
`