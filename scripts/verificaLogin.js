// Importando o Firebase Auth
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Configurações do Firebase (substitua com suas próprias configurações)
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
const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {
    // Inicialmente, não ocultamos o conteúdo até que a verificação de autenticação seja concluída
    const containerCursos = document.querySelector(".courses-container");

    // Verificando o estado de autenticação
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Exibe o email do usuário logado e mostra o conteúdo
            document.getElementById("usuarioInfo").textContent = `Bem-vindo, ${user.email}`;
            containerCursos.style.display = "block"; // Mostra o conteúdo dos cursos

            // Verifica no console se o usuário está logado
            console.log("Usuário está logado:", user);
        } else {
            // Se não estiver logado, redireciona para a página de login
            console.log("Nenhum usuário logado. Redirecionando para login...");
            window.location.href = "login.html";
        }
    });
});