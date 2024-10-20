import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
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

// Função para gerar e retornar o userId do usuário
const getUserId = async () => {
    const user = auth.currentUser;
    if (user) {
        return user.uid; // Retorna o userId se o usuário estiver autenticado
    } else {
        console.error('Usuário não autenticado');
        return null;
    }
};

// Listener para monitorar o estado de autenticação
auth.onAuthStateChanged(async (user) => {
    if (user) {
        console.log("Usuário autenticado:", user.uid);
        // Aqui você pode chamar suas funções que dependem do userId
        await exibirPontuacao(); // Exibir pontuação assim que o usuário estiver autenticado
    } else {
        console.log("Usuário não autenticado");
    }
});

// Função para atualizar a pontuação do usuário no Firestore
const atualizarPontuacao = async (nivel) => {
  const userId = await getUserId();
  console.log(`User ID: ${userId}`); // Verifique o userId

  if (!userId) {
      console.error("Usuário não identificado.");
      return;
  }

  const pontosPorNivel = { 1: 1, 2: 2, 3: 3 };
  const pontos = pontosPorNivel[nivel] || 0;

  const docRef = doc(db, 'usuarios', userId);
  const docSnap = await getDoc(docRef);
  console.log(`Documento encontrado: ${docSnap.exists()}`); // Verifique se o documento existe

  if (docSnap.exists()) {
      const pontuacaoAnterior = docSnap.data().pontuacao || 0;
      const novaPontuacao = pontuacaoAnterior + pontos;
      console.log(`Pontuação anterior: ${pontuacaoAnterior}, Adicionando: ${pontos}, Nova Pontuação: ${novaPontuacao}`);
      await setDoc(docRef, { pontuacao: novaPontuacao }, { merge: true });
  } else {
      console.log("Criando novo documento de pontuação.");
      await setDoc(docRef, { pontuacao: pontos });
  }
  
  await exibirPontuacao();
};

// Função para exibir a pontuação do usuário
const exibirPontuacao = async () => {
  const userId = await getUserId();
  console.log("User ID:", userId); // Verifique o valor do userId
  if (!userId) {
      console.error("Usuário não foi identificado.");
      return; // Sai da função se não houver userId
  }

  const docRef = doc(db, 'usuarios', userId); // Referência ao documento do usuário
  const docSnap = await getDoc(docRef); // Obtém o documento

  if (docSnap.exists()) {
      // Se o documento existir, pega a pontuação
      const pontuacao = docSnap.data().pontuacao || 0; // Define a pontuação como 0 se não existir
      // Mostra a pontuação em um elemento HTML com ID 'pontuacao'
      const pontuacaoElement = document.getElementById('pontuacao');
      if (pontuacaoElement) {
          pontuacaoElement.textContent = `Sua Pontuação: ${pontuacao}`; // Atualiza o conteúdo do elemento com a pontuação
      } else {
          console.error("Elemento para exibir a pontuação não encontrado.");
      }
  } else {
      console.log("Usuário ainda não possui pontuação.");
      // Exibe uma mensagem padrão ou inicializa a pontuação, se desejado
      const pontuacaoElement = document.getElementById('pontuacao');
      if (pontuacaoElement) {
          pontuacaoElement.textContent = `Sua Pontuação: 0`; // Exibe 0 se não houver pontuação
      }
  }
};

export { atualizarPontuacao, getUserId, exibirPontuacao };
