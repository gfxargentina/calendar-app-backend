const  Mongoose  = require("mongoose");


const dbConnection = async() => {
    try {
        await Mongoose.connect( process.env.DB, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB conectada')

    } catch (error) {
        console.log(error)        ;
        throw new Error('Error en la conexion de la DB')
    }
}

module.exports = dbConnection;



