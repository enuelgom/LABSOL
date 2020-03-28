import mongoose from '../db/connections';

const Schema = mongoose.Schema;

const  colaboradorSchema = new Schema({
    nombre: String,
    telefono: String,
    correo: {
        required: true,
        type: String,
        unique: true
    },
    id_lab: String,
    usuario: {
        required: true,
        type: String,
        unique: true
    },
    clave: String
});

const colaborador = mongoose.model('colaborador', colaboradorSchema);
export default colaborador;