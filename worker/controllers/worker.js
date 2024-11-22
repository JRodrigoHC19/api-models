const redis = require('redis');
const mongoose = require('mongoose');
const Entregable = require('../models/entregable');  // Asegúrate de tener el modelo correctamente importado

require('dotenv').config("../.env");

console.log('REDIS_HOST:', process.env.REDIS_HOST);  // Verifica que la variable esté correctamente cargada
console.log('REDIS_PORT:', process.env.REDIS_PORT);  // Verifica que la variable esté correctamente cargada
console.log('MONGODB_URI:', process.env.MONGODB_URI); 

// Configurar Redis
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` // Cambié la forma de crear el cliente para la nueva versión
});

redisClient.connect();

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Función para consumir mensajes de Redis
const processQueue = async () => {
    try {
        while (true) {
            // Intentamos obtener un mensaje de la cola
            const taskData = await redisClient.lPop('entregablesQueue');
            
            if (taskData) {
                // Si hay un mensaje, lo procesamos
                const parsedData = JSON.parse(taskData);
                
                // Imprimir la URL del documento
                console.log(`Enviando URL del documento: ${parsedData.archivoPath}`);

                // Guardar el entregable en la base de datos MongoDB
                const nuevoEntregable = new Entregable({
                    estudianteId: parsedData.estudianteId,
                    correoEstudiante: parsedData.correoEstudiante,
                    proyectoId: parsedData.proyectoId,
                    nombreEntregable: parsedData.nombreEntregable,
                    archivoUrl: parsedData.archivoPath,
                });

                // Guardar el documento en MongoDB
                await nuevoEntregable.save();
                console.log('Entregable guardado en la base de datos:', nuevoEntregable);
            } else {
                // Si no hay mensajes, espera un momento y vuelve a intentar
                console.log('Esperando mensajes en la cola...');
                await new Promise(resolve => setTimeout(resolve, 5000));  // Espera de 5 segundos antes de volver a intentar
            }
        }
    } catch (error) {
        console.error('Error al procesar la cola:', error);
    }
};

// Iniciar el worker
processQueue();
