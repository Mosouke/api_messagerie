// Je vais utiliser express pour créer mon server
// Pour utiliser express, il faut l'instaler avec (npm i express)
const express = require('express');
// on va utiliser socket.io pour créer une conexion en temps réel entre le serveur e le clien
// Pour utiliser socket.io, il faut l'instaler avec (npm i socket.io
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { join } = require('node:path');

// Instancier l'application
const app = express();

// Create server HTTP
const server = createServer(app);

// Instancier socket.io
const io = new Server(server);

//on va gerer l'ajout  de fichier static (css, js, images,etc.)
app.use(express.static(join(__dirname, 'public')));

// Le point d'entrée du serveur qui va renvoyer le fichier index.html front
app.get('/', (req, res) => {
    // Envoyer le fichier index.html
    res.sendFile(join(__dirname, 'index.html'));
});

// On ecoute les connexion entrantes
io.on('connection', socket => {
    // On lui dit le type dévenment qu'on attend 
    socket.on('chat message', (msg ,pseudo) => {
        // Envoyer le message au client
        io.emit('chat message', msg, pseudo);
    });
});

// Lancer le serveur sur le port 3000
server.listen(3000, () => {
    console.log('Le serveur est lancé sur le port 3000 at http://localhost:3000');
});

