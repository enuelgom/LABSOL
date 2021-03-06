export const custom = `

    type AllAdmins {
        _id: String,
        nombre: String,
        correo: String,
        telefono: String,
        privilegios: String
    }

    type SubAdmin {
        usuario: String,
        nombre: String,
        correo: String,
        telefono: String,
    }

    type Laboratorio {
        nombre: String,
        logo: String,
        proyectos: [Proyecto],
        usuario: String,
        clave: String
    }

    type Proyecto {
        _id: String,
        proyecto: String,
        objetivo: String,
        requerimientos: String,
        perfiles: String,
        habilidades: String,
        avances: String,
        status: String,
        numAlu: String,
        alumnosExistentes: String,
        alumnos: [_ids],
        notificaciones: String,
        colaboradores: String
    }

    type Categorias{
        proyecto: String,
        objetivo: String,
        status: String,
        numAlu: String,
    }

    type Alumnos{
        alumno: String,
        ape_p: String,
        ape_m: String,
        correo: String,
        telefono: String,
        institucion: String,
        carrera: String,
        domicilio: String
    }

    type Segimiento{
        Metodologia: String,
        fases: [Fases]
    }

    type Fases{
        fase: String,
        actividades: [Actividades]
    }

    type Actividades{
        actividad: String,
        semanas: [Semanas],
        status_actividad: String
    }
    type Semanas{
        sem_ini: String,
        sem_fin: String
    }
    
    type _alumnos{
        nombre: String,
        institucion: String,
        carrera: String,
        telefono: String,
        correo: String,
        _id: String
    }

    type count{
        nombre: String,
        count: String
    }

    type allLabsCount{
        siglas: String,
        nombre: String,
        count: String,
        notificaciones: String,
        tipoLaboratorio: String,
    }

    type _ids{
        _id: String,
        status: String
    }

    type Solicitudes{
        alumno: String,
        proyecto: String
    }

    type infoAlumno{
        _id: String,
        alumno: String,
        ape_p: String,
        ape_m: String,
        correo: String,
        telefono: String,
        institucion: String,
        semestre_cursado: String,
        carrera: String,
        domicilio: String,
        usuario: String
    }

    type MisSolicitudes{
        nombre: String,
        proyecto: String,
        status: String
    }

    type InfoLab{
        nombre: String,
        siglas: String,
        usuario: String,    
        tipoLaboratorio: String,
    }

    type _Actividades{
        fase: String,
        actividades: String,
        semI: String,
        semF: String,
        evaluacion: String,
        _rowVariant: String
    }

    type _colaboradores{
        _id: String,
        nombre: String,
        telefono: String,
        correo: String,
        usuario: String
    }

`