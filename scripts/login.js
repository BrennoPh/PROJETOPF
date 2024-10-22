import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

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
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuário autenticado:", user);
    } else {
        console.log("Usuário não autenticado");
    }
});

// Função para fazer login com Google
const loginComGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Usuário autenticado:", user);
      })
      .catch((error) => {
        console.error("Erro no login com o Google:", error.message);
      });
};

// Exemplo de botão de login
document.getElementById('login-google').addEventListener('click', loginComGoogle);

// Login usuário
const loginUsuario = async (email, senha) => {
    try {
        const usuario = await signInWithEmailAndPassword(auth, email, senha);
        console.log("Usuário logado:", usuario);

        if (usuario.user.emailVerified) {
            console.log("E-mail verificado.");
            alert("Login realizado com sucesso!");
            window.location.href = "./index.html"; // Redireciona para a página principal
        } else {
            await auth.signOut();
            alert("Por favor, verifique seu e-mail antes de fazer login.");
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login: " + error.message);
    }
};

// Evento de submissão do formulário de login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    loginUsuario(email, senha);
});

// Função para enviar e-mail de redefinição de senha
const enviarEmailRedefinicaoSenha = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("E-mail de redefinição de senha enviado! Verifique sua caixa de entrada.");
    } catch (error) {
        console.error("Erro ao enviar e-mail de redefinição de senha:", error);
        alert("Erro ao enviar e-mail: " + error.message);
    }
};

// Adiciona evento ao botão "Esqueci minha senha"
const btnEsqueciSenha = document.getElementById('esqueci-senha');
btnEsqueciSenha.addEventListener('click', () => {
    const email = prompt("Por favor, insira seu e-mail:");
    if (email) {
        enviarEmailRedefinicaoSenha(email);
    }
});

// Função para armazenar dados do usuário
const armazenarDadosUsuario = async (usuarioId, dados) => {
    try {
        await setDoc(doc(db, "usuarios", usuarioId), dados);
        console.log("Dados do usuário armazenados:", dados);
    } catch (error) {
        console.error("Erro ao armazenar dados:", error);
    }
};

// Função para recuperar dados do usuário
const recuperarDadosUsuario = async (usuarioId) => {
    try {
        const docRef = doc(db, "usuarios", usuarioId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Dados do usuário:", docSnap.data());
            return docSnap.data();
        } else {
            console.log("Nenhum dado encontrado!");
        }
    } catch (error) {
        console.error("Erro ao recuperar dados:", error);
    }
};