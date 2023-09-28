const { response, request } = require("express");
const path   = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const { actualizarImagen } = require("../helpers/actualiza-imagen");

const fileUpload = (req = request, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ["hospitales", "medicos", "usuarios"];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: "No es un médico, usuario u hospital (tipo)",
        });
    }

    //Validar que exista un archivo.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            OK: false,
            msg: "No hay ningún archivo",
        });
    }

    //Procesar la imagen.
    const file = req.files.imagen;

    const nombreCortado = file.name.split(".");
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar la extension.
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            OK: false,
            msg: "No es una extension permitida",
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;


    //Path para guardar la imagen.
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen.
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

    //Actualizar base de datos.
    actualizarImagen(tipo, id, nombreArchivo);   


        res.json({
            ok: true,
            msg: 'Imagen guardada',
            nombreArchivo
        });

    });
};

const retornaImagen = (req, res) => {
    const { tipo, foto } = req.params;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
  
    // Verifica si la imagen existe
    if (fs.existsSync(pathImg)) {
      res.sendFile(pathImg);
    } else {
      // Si la imagen no existe, envía la imagen de respaldo
      const pathNoImg = path.join(__dirname, `../uploads/no-img.jpg`);
      res.sendFile(pathNoImg);
    }
  };

module.exports = {
    fileUpload,
    retornaImagen
};
