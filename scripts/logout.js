import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';

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

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// Observa mudanças na autenticação do usuário
onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuário está logado, exibe o botão de logout
      logoutButton.style.display = "block";
    } else {
      // Usuário não está logado, oculta o botão de logout
      logoutButton.style.display = "none";
    }
  });

//   // Função de logout
// logoutButton.addEventListener("click", () => {
//     signOut(auth)
//       .then(() => {
//         // Redireciona para a página de login após o logout
//         window.location.href = "login.html";
//       })
//       .catch((error) => {
//         console.error("Erro ao deslogar:", error);
//       });
//   });


// Função de logout
document.getElementById("logoutButton").addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            // Redireciona para a página de login após o logout
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Erro ao deslogar:", error);
        });
});
