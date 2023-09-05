const { Schema, model } = require('mongoose');


const MedicoSchema = Schema ({

    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId, //Indica a mongosse que va a ver una relacion de tablas.
        ref: 'Usuario',
        required: true,
    },
    hospital: {
        type: Schema.Types.ObjectId, //Indica a mongosse que va a ver una relacion de tablas.
        ref: 'Hospital',
        required: true,
    }
}); //Colocamos el nombre de la colecion.

MedicoSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;

});

module.exports = model('Medico', MedicoSchema );