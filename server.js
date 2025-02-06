const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const { json } = require('stream/consumers');
const { log } = require('console');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Middleware para processar JSON
app.use(bodyParser.json());

// Rota para servir o formulário HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/cristalino', (req, res) => {
    res.sendFile(path.join(__dirname, 'cristalino.html'));
});



const readFile = () => {
    const content = fs.readFileSync('./dados.json', 'utf-8');
    return JSON.parse(content);
}

// Rota para receber os dados do formulário
app.post('/save-data', (req, res) => {
    const data = req.body;
   const currentContent = readFile()
    // Salva os dados em um arquivo JSON
    currentContent.push(data);
    fs.writeFileSync('./dados.json', JSON.stringify(currentContent), 'utf-8') 
       
        console.log(currentContent);
        res.status(200).send(currentContent);
    

        //console.log(data)  

    });




// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
