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


const getUserId = async () => {
    const user = auth.currentUser; // Obtém o usuário atual
    return user ? user.uid : null; // Retorna o ID ou null
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
  if (!userId) {
      console.error("Usuário não foi identificado.");
      return;
  }

  const docRef = doc(db, 'usuarios', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      const pontuacao = docSnap.data().pontuacao || 0;
      const pontuacaoElement = document.getElementById('pontuacao');
      if (pontuacaoElement) {
          pontuacaoElement.textContent = `Sua Pontuação do Site: ${pontuacao}`;
          return 
      } else {
          console.error("Elemento para exibir a pontuação não encontrado.");
      }
  } else {
      console.log("Usuário ainda não possui pontuação.");
      const pontuacaoElement = document.getElementById('pontuacao');
      if (pontuacaoElement) {
          pontuacaoElement.textContent = `Sua Pontuação: 0`;
      }
  }
};


const atualizarPontuacaoQuiz = async (tipoQuiz, pontuacaoAtualQuiz) => {
    const userId = await getUserId();
    if (!userId) {
        console.error("Usuário não identificado.");
        return;
    }
  
    // Verifica se o documento do usuário já existe no Firestore
    const docRef = doc(db, 'usuarios', userId);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
        const progressoUsuario = docSnap.data().progresso || {}; // Obtém o progresso existente ou cria um objeto vazio
  
        // Atualiza o progresso apenas para o quiz específico (substituindo a pontuação anterior)
        progressoUsuario[tipoQuiz] = pontuacaoAtualQuiz;
  
        // Salva o progresso atualizado no Firestore
        await setDoc(docRef, { progresso: progressoUsuario }, { merge: true });
        console.log(`Pontuação atualizada para o quiz ${tipoQuiz}: ${pontuacaoAtualQuiz}`);
    } else {
        // Se o documento do usuário não existir, cria um novo com a pontuação inicial
        const progressoUsuario = { [tipoQuiz]: pontuacaoAtualQuiz };
        await setDoc(docRef, { progresso: progressoUsuario });
        console.log(`Documento criado com pontuação para o quiz ${tipoQuiz}: ${pontuacaoAtualQuiz}`);
    }
    
    // Exibe a pontuação ou chama outras funções relacionadas após a atualização
    await exibirPontuacao();
  };


export { atualizarPontuacao,atualizarPontuacaoQuiz, getUserId, exibirPontuacao};
