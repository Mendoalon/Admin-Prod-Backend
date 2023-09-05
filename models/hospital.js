const { Schema, model } = require('mongoose');


const HospitalSchema = Schema ({

    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId, //Indica a mongosse que va a ver una relacion de tablas.
        ref: 'Usuario'
    }
},{ collection: 'hospitales' }); //Colocamos el nombre de la colecion.

HospitalSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;

});

module.exports = model('Hospital', HospitalSchema );