import labs from "../models/labs";
import alumnos from "../models/alumnos";
import colaborador from "../models/colaborador";
import fs from "fs";
import jwt from "jsonwebtoken";
import admin from "../models/admin";
import { PubSub } from "graphql-subscriptions";
import bcrypt from "bcrypt";
import blackList from "../models/blackList";
import { verifyExp } from "../auth/index";
import { loadavg } from "os";
import { valueFromAST } from "graphql";
import { addMockFunctionsToSchema } from "graphql-tools";
import { callbackify } from "util";

const  SECRET = fs.readFileSync("./src/private.key");
const pubsub = new PubSub();
let lista = [];

const resolvers = {
    
    Subscription:{
        lista:{ 
            subscribe: () => pubsub.asyncIterator(["LISTA"])
        }
    },
    Query: {
        async datosSubAdmin(root, args, context){
            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();

            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
            
            try {
                const decoded = jwt.decode(token, SECRET);
                const usuario = decoded.usuario;
                const subAdmin = await admin.where({usuario}).findOne();
                return subAdmin;    
            } catch (error) {
            }
        },

        async Colaborador(root, args, context){
            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();

            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
            
            try {
                const decoded = jwt.decode(token, SECRET);
                const _id = decoded._id;
                const colaboradores = await colaborador.where({_id}).findOne();
                return colaboradores;    
            } catch (error) {
                return error
            }
        },

        async Colaboradores(root,args,context){
            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();

            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
            try {
                const decoded = jwt.decode(token, SECRET);
                const {siglas} = decoded;
                const lab = await labs.where({siglas}).findOne();
                const id_lab = lab._id
                const colaboradores = await colaborador.where({id_lab}).find();
                return colaboradores;    
            } catch (error) {
                return error
            }
        },

        async getFaseAct(root, args, context){
            try{
                const {nombre, proyecto} = args;
                const _lab = await labs.where({nombre}).findOne();
                let datos = [];
                for ( let val of _lab.proyectos ) {
                    if(val.proyecto===proyecto){
                        for(let val2 of val.avances.fases){
                            datos.push({fase:val2.fase, _rowVariant:"success"});
                            for(let val3 of val2.actividades){
                                if((val3.evaluacion===null || val3.evaluacion==="")){
                                    datos.push({actividades:val3._actividad,semI:val3.semanaInicio,semF:val3.semanaTerminacion,evaluacion:""})
                                }else{
                                    datos.push({actividades:val3._actividad,semI:val3.semanaInicio,semF:val3.semanaTerminacion,evaluacion:val3.evaluacion}); 
                                }
                            }
                        }
                    }    
                }
                return datos;
            }
            catch(e){
                console.log(e);
                return e;
            }
        },

        async existeMetod(root, args, context){
            try{
                const {nombre, proyecto} = args;
                const _lab = await labs.where({nombre}).findOne();
                for(let val of _lab.proyectos){
                    if (val.proyecto===proyecto) {
                        if(val.avances.metodologia===""){
                            return false
                        }else{
                            return val.avances.metodologia
                        }
                    }
                }
            }
            catch(e){
                return e
            }
        },

        async existeRepo(root, args, context){
            try{
                const {nombre, proyecto} = args;
                const _lab = await labs.where({nombre}).findOne();
                for(let val of _lab.proyectos){
                    if (val.proyecto===proyecto) {
                        if(val.avances.repositorio===""){
                            return false
                        }else{
                            return val.avances.repositorio  
                        }
                    }
                }
            }
            catch(e){
                return e
            }
        },


        async getLabName(root, args, context){
            const {siglas}=args;
            const nameLab = await labs.where({siglas}).findOne();
            let datos = [];

            datos.push(nameLab.nombre);
            datos.push(nameLab.fechas.fI);
            datos.push(nameLab.fechas.fT);
            return datos;
        },

        async allAdmins(root, args, context){
            const _allAdmins = await admin.find()
            let _admins = []
            for (let val of _allAdmins){
                if(val.rol==="subAdmin")
                _admins.push({_id: val._id, nombre: val.nombre, correo: val.correo, telefono: val.telefono, privilegios: val.privilegios})
            }
            return _admins;
        },

        async allLabs(root, args, context){
            const _allLabs = await labs.find();
            let _count=[];
            for(let val of _allLabs){
                let i=0, j=0;
                for (let val2 of val.proyectos){
                    if (val2.status === "Nuevo") {
                        i++
                    }
                    if (val2.status === "Aceptado") {
                        j++
                    }
                }
                if(i===0){i="";}
                if (val._status!="Eliminado") {
                    _count.push({nombre:val.nombre, count: ""+j, notificaciones: i, tipoLaboratorio: val.tipoLaboratorio,siglas:val.siglas});
                }
            }
            return _count;

        },

        async oneLab(root,args, context){
            
            const {nombre, proyectoCategoria} = args;
            const _oneLab = await labs.where({siglas:nombre}).findOne();
            let cat = "" 
            switch (proyectoCategoria) {
                case "Nuevos proyectos": cat ="Nuevo"; break;
                case "Proyectos en catalogo": cat = "Aceptado"; break;
                case "Proyectos en desarrollo": cat = "En desarrollo"; break;
                case "Proyectos finalizados": cat = "Finalizado"; break;
                default: return "";
            }

            let categoria = [];
            for(let val of _oneLab.proyectos){
                if(val.status===cat){
                    let i =0;
                        for(let val2 of val.alumnos){
                            if(val2.status==="Aceptado"){
                                i=i+1;
                            }
                        }
                        categoria.push({_id:val._id,proyecto:val.proyecto,
                        objetivo:val.objetivo,
                        requerimientos:val.requerimientos,
                        perfiles:val.perfiles,
                        habilidades:val.habilidades,
                        avances:val.avances,
                        status:val.status,
                        numAlu:val.numAlu,
                        alumnos:val.alumnos,
                        colaboradores:val.colaboradores
                        ,alumnosExistentes:""+i});
                }
            }
            return categoria;
        },

        async proyecto(root,args,context){
            const {nombre, proyecto} = args;
            const _onepro = await labs.findOne({siglas:nombre});
            let _proyecto = {};
            for (let val of _onepro.proyectos) {
                if (val.proyecto===proyecto) {
                    let i =0;
                    for(let val2 of val.alumnos){

                        if(val2.status==="Aceptado"){
                            i=i+1;
                        }
                    }
                    _proyecto=val;
                    _proyecto["alumnosExistentes"]=""+i;
                }
            }
            return _proyecto
        },

        async alumnos(root, args, context){
            try {
                const{nombre, proyecto, status}= args;
                const laboratorio = await labs.findOne({siglas:nombre});
                let _proyecto = [];
                
                for (let val of laboratorio.proyectos) {
                    if (val.proyecto===proyecto) {
                        _proyecto=val;
                    } 
                }
                
                let nombres=[];
                for(let val of _proyecto.alumnos){
                    if(val.status===status){
                        const nombreAlumno = await alumnos.findOne({_id: val._id});
                        nombres.push({nombre:nombreAlumno.alumno+" "+nombreAlumno.ape_p+" "+nombreAlumno.ape_m, institucion: nombreAlumno.institucion, carrera: nombreAlumno.carrera, telefono:nombreAlumno.telefono, correo: nombreAlumno.correo,_id:nombreAlumno._id });
                    }
                }
                return nombres;
            } catch (error) {
                
            }
        },

        async Count(root, args, context){
            const laboratorios = await labs.find();
            
                        
            let _count=[];
            for(let val of laboratorios){
                _count.push({nombre:val.nombre, count: ""+val.proyectos.length});
            }
            return _count;
        },

        async infoAlumno(root, args, context){
            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();
            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
            const {usuario} =args;
            const alum= await alumnos.findOne({usuario});
            return alum;
        },

        async misSolicitudes(root, args, context){
            const  token  = context.token;
            const decoded = jwt.decode(token, SECRET);
            const alumno = await alumnos.findOne({usuario:decoded["usuario"]})
            let misSolicitudes = [];
            for(let val of alumno.solicitudes){
                try {
                    
                    const laboratorio = await labs.findOne({siglas: val.nombre})
                    for(let val2 of laboratorio.proyectos){
                        if(val2.proyecto === val.proyecto){
                            if(alumno.status!="cancelado"){
                                misSolicitudes.push({nombre: laboratorio.nombre, proyecto:val2.proyecto, status: val._status});
                            }
                        }
                    }
                    
                } catch (error) {
                    console.log(error)
                }
            }
            return misSolicitudes;
        },

        async infoLab(root, args, context){
            const  token  = context.token;
            const decoded = jwt.decode(token, SECRET);
            const _lab = await labs.findOne({usuario:decoded["usuario"]})
            return _lab;
        }
    },

    Mutation: {
        agregarLista(root ,args, context){
            const {elemento} = args;
            lista.push(elemento);
            pubsub.publish("LISTA",{ lista });
            return "agregado";
        },
        async login(root, args, context){
            // const date = new Date(2020,2,18);
            // const dateNow = new Date();
            // if(date > dateNow) console.log("aun no es fecha")

            // console.log(date)

            const {usuario, clave} = args;
            try{
                const alumno = await alumnos.where({ usuario}).findOne();
                const adm = await admin.where({usuario}).findOne();
                const lab = await labs.where({usuario}).findOne();
                const colaboradores = await colaborador.where({usuario}).findOne()

                if(adm) {
                    if (await bcrypt.compare(clave,adm.clave)) {
                        const typeUser = "0";
                        const nombre = adm.nombre
                        if (adm.rol=="subAdmin") {
                            let privilegios="";
                            if (adm.privilegios.includes('Agregar laboratorios')) {
                                privilegios = privilegios+"B"
                            }
                            if (adm.privilegios.includes('Borrar laboratorios')) {
                                privilegios = privilegios+"C"
                            }
                            if (adm.privilegios.includes('Aceptar proyectos')) {
                                privilegios = privilegios+"D"
                            }
                            return jwt.sign({ usuario, nombre, typeUser,privilegios}, SECRET, { expiresIn: '4h' })
                        }else{
                            const privilegios = "A";
                            return jwt.sign({ usuario, nombre, typeUser, privilegios}, SECRET, { expiresIn: '4h' })
                        }
                    }else{
                        return "Contraseña incorrecta";
                    }
                }
                if(lab){
                    if(lab._status=="Eliminado"){
                        return "El usuario no existe";
                    }else
                    if (await bcrypt.compare(clave,lab.clave)) {
                        const typeUser = "1";
                        const nombre = lab.nombre;
                        const siglas = lab.siglas;
                        return jwt.sign({ usuario, nombre, typeUser, siglas }, SECRET, { expiresIn: '4h' })

                    }else{
                        return "Contraseña incorrecta"
                    }
                }

                if(alumno){
                    if (await bcrypt.compare(clave, alumno.clave)) {
                        const typeUser = "2";
                        const nombre = alumno.alumno;
                        const _id = alumno._id;
                        return jwt.sign({usuario, nombre, typeUser, _id}, SECRET, { expiresIn: '2H' })
                    }else{
                        return "Contraseña incorrecta"
                    }
                }

                if(colaboradores){
                    if (await bcrypt.compare(clave, colaboradores.clave)) {
                        const typeUser = "1.1";
                        const lab = await labs.where({_id:colaboradores.id_lab}).findOne();
                        const nombre = lab.nombre;
                        const siglas = lab.siglas;
                        const _id = colaboradores._id;
                        return jwt.sign({nombre, siglas, typeUser, _id}, SECRET, { expiresIn: '4h' })
                    }else{
                        return "Contraseña incorrecta"
                    }
                }
                return "El usuario no existe";
            } catch(err){
                return err
            }
        },

        async logOut(root,args,context){
            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();
            if (!context.token || !_blacklist=="") return "Tu sesion ha expirado";
            await new blackList({ token }).save();
            return "sesion Cerrada";
        },

        async nuevoLab(root, args, context){
            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();
            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
            const {nombre, siglas, usuario, tipoLaboratorio } = args;
            let {clave} = args;
            const passHashed = await bcrypt.hash(clave, 10);
            clave = passHashed;

            if (await labs.where({nombre: nombre}).findOne()) {
                return "Laboratorio existente"
            }
            try {
                await new labs({ nombre,siglas, usuario, clave, tipoLaboratorio }).save();
                return "Laboratorio registrado";
            } catch (error) {
                const msjerror = error.message;
                if(msjerror.includes('siglas')){
                    return "Siglas existentes";
                }else
                if(msjerror.includes('usuario')){
                    return "Usuario existente";
                }

            }
        },

        async eliminarLaboratorio(root, args, context){

            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();
            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";

            const {nombre} = args;
            const laboratorio = await labs.where({siglas: nombre}).findOneAndUpdate();
            try{
                let stat = "Eliminado";            
                laboratorio._status=stat;
                await laboratorio.save();
                return "hecho";
            }catch(er){
                
            }



        },

        async updateLab(root, args, context){
            try {
                const  token  = context.token;
                const _blacklist = await blackList.find({token}).findOne();
                if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
                const {clave} = args;
                const Clave = await bcrypt.hash(clave,10);
                const decoded = jwt.decode(token, SECRET);
                const user = decoded["usuario"]
                const _usuario = args["usuario"];
                const updateLab = await labs.where({usuario:user}).findOneAndUpdate();
                const chAdmins = await admin.where({usuario:_usuario}).findOne();
                const chAlumnos = await alumnos.where({usuario:_usuario}).findOne();
                const chcolaborador = await colaborador.where({usuario:_usuario}).findOne();
                if(!chAlumnos==""||!chAdmins==""||!chcolaborador==""){
                    return "Usuario existente"
                }
                const Datos= ["nombre", "siglas", "usuario", "tipoLaboratorio"];
                for(let val of Datos){
                    if (args[val]!=""||args[val]!=null) {
                        updateLab[val]=args[val];                  
                    }
                }
                if (clave!="") {
                    updateLab["clave"]=Clave;
                }
                const typeUser = "1";
                const nombre = updateLab.nombre;
                const usuario= updateLab.usuario;
                const siglas = updateLab.siglas;
                await updateLab.save();
                return jwt.sign({ usuario, siglas, nombre, typeUser}, SECRET, { expiresIn: '5h' })
            } catch (error) {
                const msjerror = error.message;
                if(msjerror.includes('usuario')){
                    return "Usuario existente";
                }else
                if(msjerror.includes('siglas')){
                    return "Sigla existente";
                }
            }
        },

        async agregarProyecto(root,args, context){
            try {
                const  token  = context.token;
                const decoded = jwt.decode(token, SECRET);       
                const _blacklist = await blackList.find({token}).findOne();
                if (!context.token || verifyExp(token) || !_blacklist==""){
                    return "Tu sesion ha expirado";
                }
                const {proyecto, objetivo, requerimientos, habilidades, perfiles, numAlu} = args;
                const status = "Nuevo"
                const usuario = decoded["usuario"];
                const laboratorio = await labs.where({usuario: usuario}).findOneAndUpdate()
                const date = new Date();
                const fecha = date.valueOf();
                for (let val of laboratorio.proyectos){
                    if(val.proyecto == proyecto){
                        return "Nombre del priyecto existente";

                    }else{
                        laboratorio.proyectos.unshift({ proyecto, objetivo, requerimientos, perfiles, habilidades,  status, numAlu, fecha });
                        laboratorio.save();
                        return "Proyecto registrado";
                    }
                }
                if (laboratorio.proyectos=="") {
                    laboratorio.proyectos.unshift({ proyecto, objetivo, requerimientos, perfiles, habilidades, status, numAlu, fecha });
                    laboratorio.save();
                    return "Proyecto registrado";
                }
            } catch (error) {
                return error;
            }
        },

        async updateProyecto(root, args, context){
            const  token  = context.token;
                const decoded = jwt.decode(token, SECRET);       
                const _blacklist = await blackList.find({token}).findOne();
                if (!context.token || verifyExp(token) || !_blacklist==""){
                    return "Tu sesion ha expirado";
            }
            const usuario = decoded["usuario"];
            const {proyecto} = args;
            const id = args["_id"];
            const laboratorio = await labs.where({usuario: usuario}).findOneAndUpdate()
            const datos =["proyecto", "objetivo", "requerimientos", "habilidades", "perfiles", "numAlu"];
            try{
                for(let val of laboratorio.proyectos){
                    if(val._id==id){
                        const oldpro = val.proyecto;
                        for(let data of datos){
                            if (args[data]!="") {
                                val[data]=args[data];
                            }
                            await laboratorio.save();
                        }
                        for(let alumno of val.alumnos){
                            const _alumno = await alumnos.where({_id:alumno["id"]}).findOneAndUpdate();
                            for(let findalum of _alumno.solicitudes){
                                if (findalum.proyecto === oldpro) {
                                    findalum.proyecto =proyecto;
                                }
                            }
                            await _alumno.save();
                        }

                    }

                }
                return "hola";
            }
            catch(er){

            }

        },

        async eliminarProyecto(root, args, context){
            const token = context.token;
            const _blacklist = await blackList.find({token}).findOne();
            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
            try{
                const decoded = jwt.decode(token, SECRET);
                const _proyecto = args["proyecto"];
                const laboratorio = await labs.where({siglas:decoded["siglas"] }).findOneAndUpdate();
                for(let val of laboratorio.proyectos){
                    if(val.proyecto==_proyecto){
                        val.status="Eliminado";
                    }
                }
                await laboratorio.save();
                return "eliminado"
            }catch(er){

            }

        },

        async agregarAlumno(root,args, context){
            try {
                
                const { alumno, ape_p, ape_m, correo, telefono, institucion, carrera, semestre_cursado, domicilio, usuario } = args;
                let {clave} = args
                const passHashed = await bcrypt.hash(clave,10);
                clave = passHashed;
                if (await alumnos.findOne({"correo": correo} )) {
                    if (await alumnos.findOne({"usuario": usuario} )) {
                        return "Usuario y correo existentes "
                    }
                    return "Correo existente"
                }else
                if (await alumnos.findOne({"usuario": usuario} )) {
                    return "Usuario existente"
                }
                await new alumnos ({ alumno, ape_p, ape_m, correo, telefono, institucion, carrera, semestre_cursado, domicilio, usuario, clave }).save();
                return "Usuario registrado";
            } catch (error) {
                return error;
            }
        },

        async actualizarALumno(root, args, context){
            const token = context.token;
            const _blacklist = await blackList.find({token}).findOne();
            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
            let {_id} = args
            let {clave} = args
            const Clave = await bcrypt.hash(clave,10);
            try {
                let _alumno=["alumno", "ape_p", "ape_m", "correo", "telefono", "institucion", "carrera", "semestre_cursado", "domicilio", "usuario"];
                const Alumno = await alumnos.where({_id}).findOneAndUpdate();
                const chAdmins = await admin.where({usuario:args["usuario"]}).findOne();
                const chLabs = await labs.where({usuario:args["usuario"]}).findOne();
                if(!chLabs==""||!chAdmins==""){
                    return "Usuario existente"
                }
                
                for (let val of _alumno){
                    if(args[val]!=""){
                        Alumno[val]=args[val]
                    }
                }

                if(clave!=""){
                    Alumno["clave"]=Clave;
                }
                const typeUser = "2";
                const nombre = Alumno.alumno;
                const usuario= Alumno.usuario;
                await Alumno.save();
                return jwt.sign({ usuario, nombre, typeUser, _id}, SECRET, { expiresIn: '2h' })

            } catch (error) {
                const msjerror = error.message;
                if(msjerror.includes('usuario')){ 
                    return "Usuario existente";
                }else if(msjerror.includes('correo')){
                    return "Correo existente";
                }
            }
        },
        async updateAdmin(root, args, context){
            const Alumno = await alumnos.where({usuario:args["usuario"]}).findOne();
            const chcolaborador = await colaborador.where({usuario:args["usuario"]}).findOne();
            const chLabs = await labs.where({usuario:args["usuario"]}).findOne();
            if(!chLabs==""||!chcolaborador==""||!Alumno==""){
                return "Usuario existente"
            }

            try{
                const token = context.token;
                const decoded = jwt.decode(token, SECRET);
                const user = decoded.usuario;
                const _blacklist = await blackList.find({token}).findOne();
                if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
                let {clave} = args
                const Clave = await bcrypt.hash(clave, 10);
                const _admin = await admin.where({usuario:user}).findOneAndUpdate();
                let newData = ["nombre", "usuario"];

                for(let val of newData){
                    if (args[val]!="" || args[val]!=null) {
                        _admin[val]=args[val];
                    }
                }
                
                if (clave!="") {
                    _admin["clave"] = Clave;
                }

                if (args['telefono']!="") {
                    _admin["telefono"] = args['telefono'];
                }

                if (args['correo']!="") {
                    _admin["correo"] = args['correo'];
                }

                await _admin.save();
                const typeUser = "0"
                const usuario = _admin["usuario"];
                const nombre = _admin["nombre"];
                const privilegios = decoded.privilegios
                console.log(privilegios);
                return jwt.sign({ usuario, nombre, typeUser, privilegios}, SECRET, { expiresIn: '2h' })
            }catch(e){
                console.log(error)
                const msjerror = e.message;
                if(msjerror.includes('usuario')){ 
                    return "Usuario existente";
                }else if(msjerror.includes('correo')){
                    return "Correo existente";
                }
            }
        },

        async nuevoAdmin(root, args, context){
            try {
                const { nombre, usuario}=args;
                let {clave} = args;
                const passHashed= await bcrypt.hash(clave,10);
                clave = passHashed;
                await new admin ({ nombre, usuario, clave }).save();
                return "guardado";
            } catch (error) {
                return error
            }
        },

        async solicitarProyecto(root, args, context){
            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();

            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
            
            const decoded = jwt.decode(context.token, SECRET);
            const { nombre, proyecto} = args;
            const alumno = decoded["usuario"];

            const alum = await alumnos.where({usuario:alumno}).findOneAndUpdate();
            const laboratorio = await labs.where({siglas:nombre}).findOneAndUpdate();

            for (let val of laboratorio.proyectos) {
                if (val["proyecto"] == proyecto){
                    val.alumnos.push({_id: alum._id, status: "En espera"});
                }
            }
            const _status = "En espera";
            alum.solicitudes.push({nombre,proyecto,_status});
            
             await laboratorio.save();
             await alum.save();

            return "hola";
        },

        async aceptarSolicitud(root, args, context){
            const {nombre, proyecto, _id, accion} = args;

            const laboratorio = await labs.where({siglas:nombre}).findOneAndUpdate();
            for(let val of laboratorio.proyectos){
                if(val.proyecto === proyecto){
                    for(let val2 of val.alumnos){
                        if(val2._id===_id){
                            const alum = await alumnos.where({_id}).findOneAndUpdate();
                            for(let val3 of alum.solicitudes){
                                if(val3.proyecto===proyecto && val3.nombre===nombre){
                                    val3._status = accion;
                                }
                            }
                            await alum.save();
                            val2.status=accion;
                        }
                    }
                }
            }
            await laboratorio.save();
            return "hecho..."
        },

        async aceptarNuevoProyecto(root, args, context){
            const {nombre, proyecto, accion} = args;
            const laboratorio = await labs.where({siglas:nombre}).findOneAndUpdate();
            for (let val of laboratorio.proyectos) {
                if(val.proyecto === proyecto){
                    val.status=accion;
                }
            }
            await laboratorio.save();
        },

        async cancelarSolicitudAlumno(root, args, context){
            const {nombre, proyecto} = args;

            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();
            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
            const decoded = jwt.decode(token, SECRET);
            const alumno = await alumnos.where({usuario:decoded["usuario"]}).findOneAndUpdate()
            for(let val of alumno.solicitudes){
                if(val.proyecto === proyecto){
                    val._status="cancelado";
                }
            }
            
            await alumno.save();
            const laboratorio = await labs.where({nombre}).findOneAndUpdate();
            for(let val of laboratorio.proyectos){
                if (val.proyecto===proyecto) {
                    for(let val2 of val.alumnos){
                        if(val2._id===alumno._id){
                            val2.status="cancelado"
                        }
                    }
                }
            }
            await laboratorio.save()
            return "Hecho"
        },

        async Metodologia(root, args, context){
            const {nombre, proyecto, metodologia} = args;
            const lab = await labs.where({nombre}).findOneAndUpdate()
            try{
                for(let val of lab.proyectos){
                    if(val.proyecto===proyecto){
                        if(val.avances.metodologia!=""){
                            console.log("gola")
                            val.avances.metodologia=metodologia
                        }else{
                            val.avances=({metodologia:metodologia})
                        }
                    }
                }
                await lab.save();
                return "Metodologia agregada"
            }catch(e){
                return e;
            }
        },

        async asignarAvance(root, args, context){
            const {nombre, proyecto,fase,actividad,semanaInicial,semanaTerminacion} = args;
            const lab = await labs.where({nombre}).findOneAndUpdate();
            try{
                for(let val of lab.proyectos){
                    if(val.proyecto===proyecto){
                        let existe = false;
                        if(val.avances.fases.length>0){
                            // console.log("si hay datos");
                            for(let val2 of val.avances.fases){
                                if(val2.fase===fase){
                                    // console.log("funciona!");
                                    existe=true;
                                    val2.actividades.push({_actividad:actividad, semanaInicio:semanaInicial,semanaTerminacion:semanaTerminacion, evaluacion:null});
                                }
                            }
                            if (!existe) {
                                // console.log("no existe la fase");
                                val.avances.fases.push({fase:fase, actividades:{_actividad:actividad, semanaInicio:semanaInicial,semanaTerminacion:semanaTerminacion,evaluacion:null}});
                            }
                        }else{
                            // console.log("no hay ni una fase");
                            val.avances.fases.push({fase:fase, actividades:{_actividad:actividad, semanaInicio:semanaInicial,semanaTerminacion:semanaTerminacion, evaluacion:null}});
                        }
                    }
                }
                await lab.save();
                return "Hecho"
            }catch(e){
                return e
            }
        },
        
        async calificarAvance(root, args, context){
            const {nombre, proyecto, actividad, calificacion} = args;
            const lab = await labs.where({nombre}).findOneAndUpdate();
            try{
                for(let val of lab.proyectos){
                    if(val.proyecto===proyecto){
                            for(let val2 of val.avances.fases){
                                for(let val3 of val2.actividades){
                                    if (val3._actividad===actividad) {
                                        val3.evaluacion=calificacion;
                                    }
                                }
                            }
                    }
                }
                await lab.save();
                return "Hecho"
            }catch(e){
                return e
            }
        },

        async borrarCronograma(root,args,context){
            const {nombre, proyecto, actividad, calificacion} = args;
            const lab = await labs.where({nombre}).findOneAndUpdate();
            try{
                for(let val of lab.proyectos){
                    if(val.proyecto===proyecto){
                        val.avances.fases=[];
                    }
                }
                await lab.save();
                return "Hecho"
            }catch(e){
                return e
            }          
        },
         
        async addColaborador(root, args, context){
            
            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();

            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";

            const {nombre, telefono, correo, usuario} = args;
            let {clave} = args;
            const passHashed= await bcrypt.hash(clave,10);
            clave = passHashed;

            const decoded = jwt.decode(token, SECRET);
            try {
                const chAdmins = await admin.where({usuario:args["usuario"]}).findOne();
                const chLabs = await labs.where({usuario:args["usuario"]}).findOne();
                const chAlum = await alumnos.where({usuario:args["usuario"]}).findOne();
                if(!chLabs==""||!chAdmins=="" || !chAlum==""){
                    return "Usuario existente"
                }

                const _nombre = decoded["nombre"]
                const lab = await labs.where({nombre:_nombre}).findOne();
                const id_lab = lab._id;
                await new colaborador ({nombre, telefono, correo, id_lab, usuario, clave}).save();
                return "hecho";
                
            } catch (error) {
                const msjerror = error.message;
                if(msjerror.includes('usuario')){
                    return "Usuario existente";
                }else
                if(msjerror.includes('correo')){
                    return "Correo existente";
                }
            }
        },

        async updateColaborador(root, args, context){
            const token = context.token;
            const _blacklist = await blackList.find({token}).findOne();
            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";
            const decoded = jwt.decode(token, SECRET);
            let {clave} = args
            const Clave = await bcrypt.hash(clave,10);
            const id = decoded._id
            
            try {
                const _colaborador = await colaborador.where({_id:id}).findOneAndUpdate();

                  const lab= await labs.where({_id:_colaborador.id_lab}).findOne();
                  console.log(lab);
                  
                  let Datos=["nombre", "telefono", "correo", "usuario"];
                  const Alumno = await alumnos.where({usuario:args["usuario"]}).findOne();
                  const chAdmins = await admin.where({usuario:args["usuario"]}).findOne();
                  const chLabs = await labs.where({usuario:args["usuario"]}).findOne();
                  if(!chLabs==""||!chAdmins==""||!Alumno==""){
                      return "Usuario existente"
                  }

                  for (let val of Datos){
                      if(args[val]!=""){
                          _colaborador[val]=args[val]
                      }
                  }

                  if(clave!=""){
                      _colaborador["clave"]=Clave;
                  }

                  await _colaborador.save();
                  return "hecho"

            } catch (error) {
                const msjerror = error.message;
                if(msjerror.includes('usuario')){ 
                    return "Usuario existente";
                }else if(msjerror.includes('correo')){
                    return "Correo existente";
                }
                return error;
            }
        },

        async asignarColaborador(root, args, context){
            const {proyecto, _id} = args
            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();

            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";

            const decoded = jwt.decode(token, SECRET);
            const nombre = decoded["nombre"];

            try {
                const lab = await labs.where({nombre:nombre}).findOneAndUpdate();
                
                for (let val of lab.proyectos){
                    if(val.proyecto===proyecto){
                        if(val.colaboradores!=_id){
                            val.colaboradores = _id;   
                        }else{
                            val.colaboradores = "";
                            await lab.save()
                            return "";
                        }
                    }
                }
                await lab.save()
                return _id;
            } catch (error) {
                return error
            }
        },

        async agregarRepositorio(root,args,context){
            try {
                const {nombre, proyecto,repositorio} = args;

                const lab = await labs.where({nombre}).findOneAndUpdate();
                for(let val of lab.proyectos){
                    if(val.proyecto===proyecto){
                        val.avances.repositorio=repositorio;
                        await lab.save();
                    }

                }
                return "hecho";
            } catch (error) {
                return error;
            }
        },

        async addSubAdmin(root, args, context){
            try {
                const Alumno = await alumnos.where({usuario:args["usuario"]}).findOne();
                  const chcolaborador = await colaborador.where({usuario:args["usuario"]}).findOne();
                  const chLabs = await labs.where({usuario:args["usuario"]}).findOne();
                  if(!chLabs==""||!chcolaborador==""||!Alumno==""){
                      return "Usuario existente"
                  }

                const { nombre, usuario, privilegios ,telefono ,correo } = args;
                let {clave} = args;
                const passHashed= await bcrypt.hash(clave,10);
                clave = passHashed;
                await new admin ({ rol:"subAdmin", nombre, usuario, clave, privilegios, telefono, correo }).save();
                return "guardado";
            } catch (error) {
                const msjerror = error.message;
                if(msjerror.includes('usuario')){ 
                    return "Usuario existente";
                }else if(msjerror.includes('correo')){
                    return "Correo existente";
                }
                return error;
            }
        },

        async deleteAdmin(root, args, context){
            try {
                const {_id} = args;
                const _admins = await admin.where({_id}).findOneAndRemove();
                return "hecho";
            } catch (error) {
                return error;
            }
        },


        async asignarFechas(root, args, context){
            const {fI, fT} = args
            const  token  = context.token;
            const _blacklist = await blackList.find({token}).findOne();

            if (!context.token || verifyExp(token) || !_blacklist=="") return "Tu sesion ha expirado";

            const decoded = jwt.decode(token, SECRET);
            const nombre = decoded["nombre"];
            try {
                const _lab = await labs.where({nombre}).findOneAndUpdate();
                _lab.fechas=({fI,fT});
                _lab.save();    
                return "hecho";
            } catch (error) {
                console.log(error);
            }
            



        }
    }
}

export default resolvers;