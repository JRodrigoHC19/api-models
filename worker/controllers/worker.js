const redis = require('redis');
const mongoose = require('mongoose');
const axios = require('axios'); 
const Entregable = require('../models/entregable');  // Asegúrate de tener el modelo correctamente importado


// require('dotenv').config({ path: "../.env" });  // Si el archivo está en el directorio raíz  // Asegúrate de que esto esté al principio
console.log('REDIS_HOST:', process.env.REDIS_HOST);  // Verifica que la variable esté correctamente cargada
console.log('REDIS_PORT:', process.env.REDIS_PORT);  // Verifica que la variable esté correctamente cargada
console.log('MONGODB_URI:', process.env.MONGODB_URI); 
console.log('API_ENDPOINT:', process.env.API_ENDPOINT);


// Configurar Redis
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` // Cambié la forma de crear el cliente para la nueva versión
});

redisClient.connect();

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI)
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
                console.log(`Procesando entregable para archivoUrl: ${parsedData.archivoPath}`);

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
                try {
                    // Construir la URL completa del PDF
                    const pdfUrl = `${process.env.DIRECCION}${parsedData.archivoPath}`;
                    console.log("URL del archivo PDF:", pdfUrl);
                
                    // Construir la URL con los parámetros
                    const apiUrl = `${process.env.API_ENDPOINT}?pdf_url=${encodeURIComponent(pdfUrl)}&usuario_id=example123&nombre=example&email=example@example.com`;
                    console.log("URL del archivo PDF:", apiUrl);
                    // Enviar la solicitud GET con los parámetros en la URL
                    const apiResponse = await axios.post(apiUrl);
                    console.log('Respuesta de la API:', apiResponse.data);
                } catch (apiError) {
                    console.error('Error al enviar solicitud a la API:', apiError.message);
                }
                
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