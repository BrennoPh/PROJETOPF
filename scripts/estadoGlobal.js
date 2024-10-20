// estadoGlobal.js

// Objeto global para armazenar o estado
export const estadoGlobal = {
  userId: null, // Inicialmente, userId é nulo
  email: null // Inicialmente, email é nulo
};

// Função para armazenar o userId no Firestore
export const armazenarUserIdNoFirestore = async (user) => {
  estadoGlobal.userId = user.uid; // Armazena o UID do usuário no objeto global
  estadoGlobal.email = user.email; // Armazena o email do usuário no objeto global

  // Armazenar o userId no Firestore
  try {
      await setDoc(doc(db, "usuarios", estadoGlobal.userId), {
          email: estadoGlobal.email, // Usa o email armazenado no objeto global
          timestamp: new Date() // Armazena a data de registro
      });
      console.log("userId armazenado no Firestore com sucesso.");
  } catch (error) {
      console.error("Erro ao armazenar o userId no Firestore:", error);
  }
};

