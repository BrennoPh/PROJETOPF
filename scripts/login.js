// login.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
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
// Inicialize o provedor do Google
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuário está autenticado
      console.log("Usuário autenticado:", user);
      // Aqui você pode redirecionar o usuário ou mostrar informações
    } else {
      // Usuário não está autenticado
      console.log("Usuário não autenticado");
    }
  });
  

// Função para fazer login com Google
const loginComGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Usuário logado com sucesso
        const user = result.user;
        console.log("Usuário autenticado:", user);
      })
      .catch((error) => {
        // Tratar erros
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
        const usuarioId = usuario.user.uid;
        await recuperarDadosUsuario(usuarioId);
        // Redireciona para a página index.html após o login bem-sucedido
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Erro ao logar:", error);
    }
};

const armazenarDadosUsuario = async (usuarioId, dados) => {
    try {
        await setDoc(doc(db, "usuarios", usuarioId), dados);
        console.log("Dados do usuário armazenados:", dados);
    } catch (error) {
        console.error("Erro ao armazenar dados:", error);
    }
};

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

// Manipulação do formulário de login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita o envio do formulário padrão
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    loginUsuario(email, senha);
});
