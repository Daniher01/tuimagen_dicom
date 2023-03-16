const express = require('express');
// const multer = require('multer');
const axios = require('axios');

const app = express();
app.use(express.static('public'));

// ? Variables de entorno
const PORT = 8000
const API_URL = process.env.API_URL || 'http://192.168.1.114:3000/orthanc'

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// TODO revisar la subida de archivos
app.post('/upload', (req, res) => {
    const file = req.file; // ? variable

    // ? envio de archivo a la api rest
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });

    axios.post(`${API_URL}/studies`, formData, {
        headers: {
          ...formData.getHeaders(),
          //Authorization: 'Bearer ' + token // si es necesario autenticarse en la API REST
        }
      })
      .then(response => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Ocurrió un error al subir el archivo');
      });
  });

app.get('/studies/:uid', (req, res) => {
    const uid = req.params.uid
    axios.get(`${API_URL}/studies/${uid}`)
    .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
        res.send(error);
      });
})  


app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}.`);
  });