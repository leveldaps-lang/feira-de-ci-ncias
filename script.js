// ==========================================
// CHAT DO 3º ANO 2
// ==========================================


// ELEMENTOS DO HTML

const chatArea = document.getElementById("chatArea");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const micButton = document.getElementById("micButton");
const soundButton = document.getElementById("soundButton");

const ratingArea = document.getElementById("ratingArea");
const stars = document.querySelectorAll(".stars button");
const selectedRating = document.getElementById("selectedRating");


// CONFIGURAÇÕES

let voiceEnabled = true;
let ratingShown = false;
let conversationCount = 0;


// ==========================================
// ENVIAR MENSAGEM
// ==========================================

function sendMessage() {

    const text = messageInput.value.trim();

    if (text === "") {
        return;
    }

    addUserMessage(text);

    messageInput.value = "";

    conversationCount++;

    showTyping();

    setTimeout(function () {

        removeTyping();

        const response = generateResponse(text);

        addBotMessage(response);

        if (voiceEnabled) {
            speak(response);
        }

        if (conversationCount >= 1 && !ratingShown) {

            setTimeout(function () {

                ratingArea.classList.add("show");

                ratingShown = true;

                scrollChat();

            }, 500);

        }

    }, 900);
}


// ==========================================
// ENTER PARA ENVIAR
// ==========================================

messageInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// BOTÃO ENVIAR

sendButton.addEventListener("click", function () {

    sendMessage();

});


// ==========================================
// MENSAGEM DO USUÁRIO
// ==========================================

function addUserMessage(text) {

    const message = document.createElement("div");

    message.className = "message user-message";

    message.innerHTML = `
        <div class="message-content">

            <div class="message-bubble">
                ${escapeHTML(text)}
            </div>

            <span class="time">
                agora
            </span>

        </div>
    `;

    chatArea.appendChild(message);

    scrollChat();
}


// ==========================================
// MENSAGEM DO BOT
// ==========================================

function addBotMessage(text) {

    const message = document.createElement("div");

    message.className = "message bot-message";

    message.innerHTML = `
        <div class="avatar-small">
            🤖
        </div>

        <div class="message-content">

            <div class="message-bubble">
                ${formatText(text)}
            </div>

            <span class="time">
                agora
            </span>

        </div>
    `;

    chatArea.appendChild(message);

    scrollChat();
}


// ==========================================
// ANIMAÇÃO "DIGITANDO"
// ==========================================

function showTyping() {

    const typing = document.createElement("div");

    typing.className = "message bot-message";

    typing.id = "typing";

    typing.innerHTML = `
        <div class="avatar-small">
            🤖
        </div>

        <div class="message-content">

            <div class="message-bubble typing-bubble">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>
    `;

    chatArea.appendChild(typing);

    scrollChat();
}


function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) {
        typing.remove();
    }

}


// ==========================================
// INTELIGÊNCIA / RESPOSTAS
// ==========================================

function generateResponse(text) {

    const message = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");


    // SAUDAÇÕES

    if (
        message.includes("oi") ||
        message.includes("ola") ||
        message.includes("eai") ||
        message.includes("e ai") ||
        message.includes("bom dia") ||
        message.includes("boa tarde") ||
        message.includes("boa noite")
    ) {

        return "Olá!   Seja muito bem-vindo à nossa apresentação! Eu sou o Chat do 3º Ano 2. Pode conversar comigo à vontade!";

    }


    // QUEM É VOCÊ

    if (
        message.includes("quem e voce") ||
        message.includes("quem e vc") ||
        message.includes("o que voce e") ||
        message.includes("o que e voce")
    ) {

        return "Eu sou o chatbot criado para a Feira de Ciências pelo 3º Ano 2! 🤖 Minha função é conversar com os visitantes e demonstrar como a inteligência artificial pode interagir com as pessoas.";

    }


    // INTELIGÊNCIA ARTIFICIAL

    if (
        message.includes("inteligencia artificial") ||
        message.includes("inteligencia") ||
        message === "ia"
    ) {

        return "A Inteligência Artificial é uma tecnologia que permite aos computadores analisar informações, reconhecer padrões e realizar tarefas que normalmente exigiriam inteligência humana. ";

    }


    // APRESENTAÇÃO

    if (
        message.includes("apresentacao") ||
        message.includes("trabalho") ||
        message.includes("projeto") ||
        message.includes("feira")
    ) {

        return "Nossa apresentação tem como objetivo mostrar, de uma forma prática e interativa, como a Inteligência Artificial pode conversar e interagir com as pessoas.";

    }


    // ELOGIOS

    if (
        message.includes("legal") ||
        message.includes("muito bom") ||
        message.includes("excelente") ||
        message.includes("incrivel") ||
        message.includes("gostei") ||
        message.includes("parabens") ||
        message.includes("bom trabalho")
    ) {

        return "Fico muito feliz que você tenha gostado! Agora queremos saber uma coisa importante: de 0 a 10, que nota você daria para nossa apresentação? ";

    }


    // COMO FUNCIONA

    if (
        message.includes("como funciona") ||
        message.includes("como voce funciona")
    ) {

        return "Nesta demonstração, minhas respostas foram programadas usando JavaScript. Eu analiso o que você escreveu, identifico algumas palavras e escolho uma resposta relacionada.";

    }


    // ESCOLA

    if (
        message.includes("escola") ||
        message.includes("colegio")
    ) {

        return "Nós somos o 3º Ano 2 e estamos participando da Feira de Ciências.  Nosso objetivo é apresentar a tecnologia de uma maneira simples, divertida e interativa.";

    }


    // AGRADECIMENTOS

    if (
        message.includes("obrigado") ||
        message.includes("obrigada") ||
        message.includes("valeu")
    ) {

        return "Eu que agradeço pela visita!  Esperamos que você tenha gostado da nossa apresentação. Não esqueça de deixar sua nota!";

    }


    // PERGUNTAS

    if (
        message.includes("?") ||
        message.includes("por que") ||
        message.includes("porque") ||
        message.includes("quando") ||
        message.includes("onde") ||
        message.includes("como")
    ) {

        return "Essa é uma pergunta interessante! Eu sou um chatbot demonstrativo da nossa feira, então meu conhecimento é limitado. Mas posso conversar com você sobre Inteligência Artificial, tecnologia e sobre o nosso projeto.";

    }


    // RESPOSTA PADRÃO

    const responses = [

        "Interessante!  Continue conversando comigo. Quero saber o que você achou da nossa apresentação!",

        "Entendi!  Você pode me perguntar sobre Inteligência Artificial, tecnologia ou sobre o nosso projeto.",

        "Legal!  Estamos demonstrando como um chatbot consegue interagir com visitantes.",

        "Boa pergunta!  Continue conversando comigo para conhecer melhor nosso projeto."

    ];

    const randomIndex = Math.floor(
        Math.random() * responses.length
    );

    return responses[randomIndex];
}


// ==========================================
// AVALIAÇÃO
// ==========================================

stars.forEach(function (star) {

    star.addEventListener("mouseenter", function () {

        const value = Number(this.dataset.value);

        stars.forEach(function (item) {

            const itemValue = Number(item.dataset.value);

            if (itemValue <= value) {

                item.classList.add("active");

            } else {

                item.classList.remove("active");

            }

        });

    });


    star.addEventListener("click", function () {

        const value = Number(this.dataset.value);

        stars.forEach(function (item) {

            const itemValue = Number(item.dataset.value);

            if (itemValue <= value) {

                item.classList.add("active");

            } else {

                item.classList.remove("active");

            }

        });


        selectedRating.textContent =
            `Você deu nota ${value}/10 ⭐`;


        setTimeout(function () {

            const response =
                `Muito obrigado pela sua avaliação! Você deu nota ${value} de 10 para nossa apresentação. Sua opinião é muito importante para o 3º Ano 2!`;

            addBotMessage(response);

            if (voiceEnabled) {
                speak(response);
            }

        }, 500);

    });

});


// ==========================================
// VOZ DO CHATBOT
// ==========================================

function speak(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    speechSynthesis.cancel();

    const cleanText = text.replace(/[*_#]/g, "");

    const voice = new SpeechSynthesisUtterance(cleanText);

    voice.lang = "pt-BR";

    voice.rate = 1;

    voice.pitch = 1;

    speechSynthesis.speak(voice);
}


// ==========================================
// BOTÃO DE SOM
// ==========================================

soundButton.addEventListener("click", function () {

    voiceEnabled = !voiceEnabled;

    if (voiceEnabled) {

        soundButton.textContent = "🔊";

        addBotMessage(
            "🔊 Voz ativada! Agora vou falar minhas respostas."
        );

    } else {

        speechSynthesis.cancel();

        soundButton.textContent = "🔇";

        addBotMessage(
            "🔇 Voz desativada. Agora vou responder somente por texto."
        );

    }

});


// ==========================================
// MICROFONE
// ==========================================

let recognition = null;

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.lang = "pt-BR";

    recognition.continuous = false;

    recognition.interimResults = false;


    recognition.onstart = function () {

        micButton.classList.add("recording");

        micButton.textContent = "🔴";

        messageInput.placeholder = "Estou ouvindo...";

    };


    recognition.onresult = function (event) {

        const transcript =
            event.results[0][0].transcript;

        messageInput.value = transcript;

        micButton.classList.remove("recording");

        micButton.textContent = "🎤";

        messageInput.placeholder =
            "Digite sua mensagem...";

        sendMessage();

    };


    recognition.onerror = function () {

        micButton.classList.remove("recording");

        micButton.textContent = "🎤";

        messageInput.placeholder =
            "Digite sua mensagem...";

    };


    recognition.onend = function () {

        micButton.classList.remove("recording");

        micButton.textContent = "🎤";

        messageInput.placeholder =
            "Digite sua mensagem...";

    };


    micButton.addEventListener("click", function () {

        try {

            recognition.start();

        } catch (error) {

            console.log("Microfone já está ativo.");

        }

    });

} else {

    micButton.addEventListener("click", function () {

        alert(
            "Seu navegador não suporta reconhecimento de voz. Use o Google Chrome."
        );

    });

}


// ==========================================
// ROLAR CHAT PARA BAIXO
// ==========================================

function scrollChat() {

    setTimeout(function () {

        chatArea.scrollTop =
            chatArea.scrollHeight;

    }, 50);

}


// ==========================================
// PROTEGER TEXTO DIGITADO
// ==========================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ==========================================
// FORMATAR RESPOSTAS
// ==========================================

function formatText(text) {

    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");
}