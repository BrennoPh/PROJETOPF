// login.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
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

// Objeto global para armazenar o estado
export const estadoGlobal = {
    userId: null, // Inicialmente, userId é nulo
    email: null, // Inicialmente, email é nulo
    pontuacao: 0 // Inicialmente, pontuação é 0
};

// Função para armazenar o userId no Firestore
export const armazenarUserIdNoFirestore = async (user) => {
    estadoGlobal.userId = user.uid; // Armazena o UID do usuário no objeto global
    estadoGlobal.email = user.email; // Armazena o email do usuário no objeto global

    // Armazenar o userId no Firestore
    try {
        await setDoc(doc(db, "usuarios", estadoGlobal.userId), {
            email: estadoGlobal.email, // Usa o email armazenado no objeto global
            timestamp: new Date(), // Armazena a data de registro
            pontuacao: 0 // Inicializa a pontuação
        });
        console.log("userId armazenado no Firestore com sucesso.");
    } catch (error) {
        console.error("Erro ao armazenar o userId no Firestore:", error);
    }
};

// Função para atualizar a pontuação no Firestore
export const atualizarPontuacao = async (nivel) => {
    // Define a pontuação com base no nível
    const pontos = nivel === 1 ? 1 : nivel === 2 ? 2 : nivel === 3 ? 3 : 0;
    
    // Incrementa a pontuação atual
    estadoGlobal.pontuacao += pontos;

    try {
        await setDoc(doc(db, "usuarios", estadoGlobal.userId), {
            pontuacao: estadoGlobal.pontuacao // Armazena a nova pontuação
        }, { merge: true }); // Usa o merge para não sobrescrever outros dados
        console.log("Pontuação atualizada com sucesso:", estadoGlobal.pontuacao);
    } catch (error) {
        console.error("Erro ao atualizar a pontuação:", error);
    }
};