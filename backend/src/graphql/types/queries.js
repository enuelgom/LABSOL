export const queries = `
    type Query {
        allAdmins: [AllAdmins]

        allLabs: [allLabsCount]

        oneLab(
            nombre: String,
            proyectoCategoria: String
        ): [Proyecto]
        
        proyecto(
            nombre: String
            proyecto: String
        ): Proyecto

        alumnos(
            nombre: String
            proyecto: String
            status: String
        ): [_alumnos]

        Count: [count]

        solicitudes(
            nombre: String
        ): [Solicitudes]

        infoAlumno(
            usuario: String
        ): infoAlumno

        misSolicitudes: [MisSolicitudes]

        infoLab: InfoLab

        getLabName(
            siglas: String
        ): [String]

        existeMetod(
            nombre: String,
            proyecto: String
        ): String

        existeRepo(
            nombre: String,
            proyecto: String
        ): String

        getFaseAct(
            nombre: String,
            proyecto: String
        ): [_Actividades]

        Colaboradores: [_colaboradores]

        Colaborador: _colaboradores

        datosSubAdmin: SubAdmin
    }
`