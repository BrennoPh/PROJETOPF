// registro.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyB20oXuHGDHTEIl6PjVSiD9vGiOwDsaJ3s",
    authDomain: "plataforma-edtech-b4f7d.firebaseapp.com",
    projectId: "plataforma-edtech-b4f7d",
    storageBucket: "plataforma-edtech-b4f7d.appspot.com",
    messagingSenderId: "447721692450",
    appId: "1:447721692450:web:9c567f7b645dab7d01d97b",
    measurementId: "G-CHWEEQGZCR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registrarUsuario = async (email, senha, nome) => {
    try {
        const usuario = await createUserWithEmailAndPassword(auth, email, senha);
        console.log("Usuário registrado:", usuario);
        const usuarioId = usuario.user.uid;
        const dados = { nome: nome, pontuacao: 0 }; // Inicialize a pontuação como 0 ou o que for apropriado
        await setDoc(doc(db, "usuarios", usuarioId), dados);
        console.log("Dados do usuário armazenados:", dados);
        alert("Usuário registrado com sucesso!");
        window.location.href = "./login.html"; // Redireciona para a página de login
    } catch (error) {
        console.error("Erro ao registrar:", error);
        alert("Erro ao registrar: " + error.message);
    }
};

const registroForm = document.getElementById('registroForm');
registroForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita o envio do formulário padrão
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const nome = document.getElementById('nome').value; // Obtém o nome do usuário
    registrarUsuario(email, senha, nome);
});