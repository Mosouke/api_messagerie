const socket = io();

// Ons'occupe de nos sélecteurs
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const messages = document.querySelector('#messages');
const pseudo = document.querySelector('#pseudo');

// on va traiter le formulair
form.addEventListener('submit', e => {
    e.preventDefault();
    // on vérifie que l'utilisateur a saisi un message
    if(!input.value || !pseudo.value) {
        return;
    }
    // on envoie le message au serveur
    socket.emit('chat message', input.value, pseudo.value);
    input.value = '';
    input.focus();
});

// Récuper les messages et metre a jour le dom

socket.on('chat message', (msg, pseudo )=> {
    const item = document.createElement('li');
    item.textContent = pseudo + " : " + msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

