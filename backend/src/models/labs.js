import mongoose from '../db/connections';
import proyectos from './proyectos';

const Schema = mongoose.Schema;

let fechas = {
    fI: String,
    fT: String
}


const  labsSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    siglas: {
        type: String,
        unique: true,
        required: true,
    },
    logo: {
        type: String
    },
    proyectos: [proyectos],
    usuario: {
        type: String,
        required: true,
        unique: true,
    },
    clave: {
        type: String
    },
    tipoLaboratorio: String,
    _status: String,
    fechas: fechas,
});

const labs = mongoose.model('labs', labsSchema);

export default labs;

