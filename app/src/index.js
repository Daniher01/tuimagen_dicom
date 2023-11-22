const express = require('express');
const multer = require('multer');
const axios = require('axios');

const app = express();
app.use(express.static('public'));

// ? Variables de entorno
const PORT = 8000
const API_URL = process.env.API_URL || 'http://localhost:3000/orthanc'


// ? MULTER
// Configuración de multer para procesar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); 
})

// TODO revisar la subida de archivos
// Manejador de la solicitud POST para subir estudios a Orthanc
app.post('/upload', upload.single('study'), async (req, res) => {
  const studyFile = req.file.buffer; // Obtiene el archivo ZIP del campo "study"
  const url = `${API_URL}/instances`; // URL de la API REST de Orthanc
  console.log('Enviando Archivo ...');
  try {
    // Envía el archivo ZIP a la API REST de Orthanc utilizando axios
    const response = await axios.post(url, studyFile, {
      headers: {
        'Content-Type': 'application/zip'
      }
    });
    console.log('Estudio enviado correctamente a Orthanc');
    res.send(response);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.get('/studies/:uid', (req, res) => {
    const uid = req.params.uid
    axios.get(`${API_URL}/studies/${uid}`)
    .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
        res.send(data); 
      });
})  


const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}.`);
  });

server.timeout = 30000;