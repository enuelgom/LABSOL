import mongoose from '../db/connections';

const Schema = mongoose.Schema;

const  adminSchema = new Schema({
    rol: String,
    nombre: String,
    usuario: {
        type: String,
        unique: true
    },
    clave: String,
    privilegios: String,
    telefono: String,
    correo: String
});

const admin = mongoose.model('admin', adminSchema);
export default admin;