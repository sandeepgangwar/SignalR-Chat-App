"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("RecieveMessage", (username, message) => {
    var enCodedmessage = username + "says" + message;
    var li = document.createElement('li');
    li.textContent = enCodedmessage;
    document.getElementById('messsageList').appendChild(li);
});

document.getElementById('sendMessage').addEventListener('click', () => {
    var userInput = document.getElementById('userInput').value;
    var messageInput = document.getElementById('messageInput').value;
    connection.invoke("SendMessage", userInput, messageInput).catch((error) => {
        return console.error(error);
    });
})

connection.start().catch((error) => {
    console.error(error);
});

