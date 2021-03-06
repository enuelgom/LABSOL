import { subirImagen } from "./multer";
import { Router } from "express";
import labs from "../models/labs";

const filesRoutes = Router();
try {
    filesRoutes.post('/upload', subirImagen.single("imagen"), async (req, res) =>{
        const imagenRuta = req.file.path;
        console.log(req.headers);
        const lab = await labs.where({nombre: req.headers.labname}).findOneAndUpdate();
        console.log(lab);
        lab.logo=imagenRuta;
        await lab.save();
        res.send({'message': 'Aquita'});  

    })
} catch (error) {
    console.log(error);   
}

filesRoutes.get('/sendImg/:lab',async(req, res) => {
    try {
        const {lab} = req.params;
        const _lab = await labs.where({nombre: lab}).findOne()
        res.download(_lab.logo);
    } catch (error) {
        return error
    }
})

export {filesRoutes};