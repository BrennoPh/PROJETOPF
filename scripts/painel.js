import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { getUserId } from './pontuacao.js'; // Supondo que você tenha uma função para pegar o ID do usuário
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

const auth = getAuth();
const db = getFirestore();

const criarUsuarioNoFirestore = async (userId) => {
    const usuarioRef = doc(db, 'usuarios', userId);

    // Verifica se o documento do usuário já existe
    const usuarioDoc = await getDoc(usuarioRef);
    if (!usuarioDoc.exists()) {
        // Se o documento não existir, cria um novo
        await setDoc(usuarioRef, {
            progresso: {
                pureza: 0,
                imutabilidade: 0,
                altaOrdem: 0,
                recursividade: 0,
                currying: 0,
                compFuncao: 0,
            }
        });
        console.log("Usuário criado no Firestore:", userId);
    } else {
        console.log("Usuário já existe no Firestore:", userId);
    }
};

// Use esta função após o login ou registro do usuário
auth.onAuthStateChanged(async (user) => {
    if (user) {
        await criarUsuarioNoFirestore(user.uid);
        await exibirProgressoGrafico(); // Chama a função após criar ou garantir que o usuário existe
    }
});

const progressoUsuario = {
    pureza: 0,
    imutabilidade: 0,
    altaOrdem: 0,
    recursividade: 0,
    currying: 0,
    compFuncao: 0,
};

const salvarProgresso = async (tipoQuiz, pontuacao) => {
    // Atualiza o progresso do usuário de acordo com o tipo de quiz
    switch (tipoQuiz) {
        case 'pureza':
            progressoUsuario.funcoesPuras = pontuacao;
            break;
        case 'imutabilidade':
            progressoUsuario.imutabilidade = pontuacao;
            break;
        case 'altaOrdem':
            progressoUsuario.funcoesAltaOrdem = pontuacao;
            break;
        case 'recursividade':
            progressoUsuario.recursao = pontuacao;
            break;
        case 'currying':
            progressoUsuario.currying = pontuacao;
            break;
        case 'compFuncoes':
            progressoUsuario.composicaoFuncoes = pontuacao;
            break;
        default:
            console.error('Tipo de quiz não reconhecido:', tipoQuiz);
            return;
    }

    const userId = await getUserId(); // Aguarda a resolução da Promise
    if (!userId || typeof userId !== 'string') {
        console.error("ID do usuário não encontrado ou inválido:", userId);
        return;
    }

    try {
        // Salva o progresso no Firestore
        await setDoc(doc(db, 'usuarios', userId), {
            progresso: progressoUsuario
        }, { merge: true });

        console.log('Progresso salvo com sucesso:', progressoUsuario);
    } catch (error) {
        console.error("Erro ao salvar progresso:", error);
    }
};

const fornecerFeedback = (pontuacao) => {
    if (pontuacao >= 80) {
        return "Excelente trabalho! Você está se saindo muito bem.";
    } else if (pontuacao >= 60) {
        return "Bom trabalho! Continue assim!";
    } else {
        return "Não desista! Pratique mais e você vai melhorar.";
    }
};

// Função para chamar ao final do quiz
const finalizarQuiz = (tipoQuiz, pontuacaoFinal) => {
    salvarProgresso(tipoQuiz, pontuacaoFinal)
        .then(() => {
            const feedback = fornecerFeedback(pontuacaoFinal);
            alert(`Quiz finalizado! Sua pontuação: ${pontuacaoFinal}. ${feedback}`);
        })
        .catch((error) => {
            console.error("Erro ao salvar progresso:", error);
        });
};

// Exporta a função para uso em quiz.js
export { finalizarQuiz };


const exibirProgressoGrafico = async () => {
    const userId = await getUserId(); // Certifique-se de aguardar a Promise
    if (!userId) {
        console.error('ID do usuário não encontrado.');
        return;
    }

    const usuarioRef = doc(db, 'usuarios', userId);
    const usuarioDoc = await getDoc(usuarioRef);

    if (usuarioDoc.exists()) {
        const progresso = usuarioDoc.data().progresso;
        console.log('Dados de progresso do Firestore:', progresso); // Verificação dos dados

        // Gráfico de Pizza
        const ctxPizza = document.getElementById('progressoPizza').getContext('2d');
        const progressoPizzaChart = new Chart(ctxPizza, {
            type: 'pie', // Tipo de gráfico: pizza
            data: {
                labels: [
                    'Funções Puras',
                    'Imutabilidade',
                    'Funções de Alta Ordem',
                    'Recursão',
                    'Currying',
                    'Composição de Funções'
                ],
                datasets: [{
                    label: 'Progresso do Usuário (Pizza)',
                    data: [
                        progresso.pureza,
                        progresso.imutabilidade,
                        progresso.altaOrdem,
                        progresso.recursividade,
                        progresso.currying,
                        progresso.compFuncao
                    ],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Progresso do Usuário - Gráfico de Pizza'
                    }
                }
            }
        });

        // Gráfico de Barras
        const ctxBarra = document.getElementById('progressoBarra').getContext('2d');
        const progressoBarraChart = new Chart(ctxBarra, {
            type: 'bar', // Tipo de gráfico: barra
            data: {
                labels: [
                    'Funções Puras',
                    'Imutabilidade',
                    'Funções de Alta Ordem',
                    'Recursão',
                    'Currying',
                    'Composição de Funções'
                ],
                datasets: [{
                    label: 'Progresso do Usuário (Barras)',
                    data: [
                        progresso.pureza,
                        progresso.imutabilidade,
                        progresso.altaOrdem,
                        progresso.recursividade,
                        progresso.currying,
                        progresso.compFuncao
                    ],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Progresso do Usuário - Gráfico de Barras'
                    }
                }
            }
        });
    } else {
        console.error('Usuário não encontrado no Firestore.');
    }
};

// Chama a função ao carregar a página
window.onload = () => {
    exibirProgressoGrafico();
};


