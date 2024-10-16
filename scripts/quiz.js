

const perguntas = [
  { 
    nivel: 1,
    tipo: 'pureza',
    pergunta: 'O que caracteriza uma função pura?', 
    opcoes: [
      'Ela sempre retorna o mesmo resultado para os mesmos argumentos.', 
      'Ela modifica o estado de variáveis globais.', 
      'Ela depende de variáveis externas.', 
      'Ela sempre executa um loop.'
    ],
    respostaCorreta: 0
  },
  { 
    nivel: 1,
    tipo: 'pureza',
    pergunta: 'Qual é o resultado da função: const dobro=(x)=> {return x * 2}, chamada com o argumento 4?',
    opcoes: ['2', '4', '8', '10'],
    respostaCorreta: 2
  },
  { 
    nivel: 1,
    tipo: 'pureza',
    pergunta: 'Assinale a alternativa que NÃO é uma característica de funções puras:',
    opcoes: [
      'Imutabilidade de dados.', 
      'Dependência de estado externo.', 
      'Consistência em resultados.', 
      'Reusabilidade'
    ],
    respostaCorreta: 1
  },
  {
    nivel: 1,
    tipo: 'pureza',
    pergunta: 'Qual dos seguintes exemplos representa uma violação do conceito de função pura?',
    opcoes: [
      'const quadrado=(x)=> {return x * x}', 
      'const adicionaTempo=(data, dias)=> {return data + timedelta(days=dias)}',
      'const multiplica=(x, y)=> {return x * y}',
      'const geraId=()=> return random.randint(1, 100)'
    ],
    respostaCorreta: 3
  },
  {
    nivel: 1,
    tipo: 'pureza',
    pergunta: 'Assinale a alternativa que completa corretamente o cálculo do volume de uma esfera, dada pela fórmula V= 4/3 x r³',
    opcoes: [
      '3.14, r**3', 
      'pi=3.14, r*3', 
      'pi=3.14, r**3', 
      '3.14, r*3'
    ],
    respostaCorreta: 2
  },
  {
    nivel: 1,
    tipo: 'pureza',
    pergunta: 'Funções puras facilitam o uso de qual técnica?',
    opcoes: [
      'Programação orientada a objetos.', 
      'Testes unitários.', 
      'Programação assíncrona.', 
      'Manipulação de estado.'
    ],
    respostaCorreta: 1
  },
  {
    nivel: 1,
    tipo: 'pureza',
    pergunta: 'Assinale a alternativa que representa uma função pura:',
    opcoes: [
      'const soma=(x, y)=>{ return x + y + z }(onde z é uma variável global)', 
      'const soma=(x, y)=> {return x + y}', 
      'const incrementa=(x)=> {x + y + 1}(onde y é uma variável global)'
    ],
    respostaCorreta: 1
  },
  {
    nivel: 1,
    tipo: 'pureza',
    pergunta: 'Qual das seguintes operações é considerada um efeito colateral?',
    opcoes: [
      'Retornar o dobro de um número.', 
      'Modificar uma variável global.', 
      'Somar dois números.', 
      'Calcular a raiz quadrada de um número'
    ],
    respostaCorreta: 1
  },
  {
    nivel: 1,
    tipo: 'pureza',
    pergunta: 'Qual das alternativas abaixo é um benefício de usar funções puras?',
    opcoes: [
      'Aumento da complexidade do código.', 
      'Facilidade para testar e depurar.', 
      'Menor legibilidade.', 
      'Dependência de estado global.'
    ],
    respostaCorreta: 1
  },
  {
    nivel: 1,
    tipo: 'pureza',
    pergunta: 'Assinale o comportamento da função abaixo const dividir = (x,y) => { if (y==0) return "ERRO"; return x/y }',
    opcoes: [
      'Retorna erro', 
      'Multiplica x por y', 
      'Divide x por y', 
      'Eleva x a y'
    ],
    respostaCorreta: 2
  },
  { 
      nivel: 2,
      tipo: 'pureza',
      pergunta: 'Considere a função const double=(x)=>{ return 2 * x}. Qual é o efeito colateral dessa função?', 
      opcoes: [
        'Nenhum, é uma função pura.', 
        'Modifica o valor de x.', 
        'Afeta uma variável global.', 
        'Imprime o valor de x.'
      ],
      respostaCorreta: 0
    },
    { 
      nivel: 2,
      tipo: 'pureza',
      pergunta: 'Em uma linguagem funcional, como a imutabilidade se relaciona com funções puras?',
      opcoes: [
        'Funções puras não podem trabalhar com dados mutáveis.',
        'A imutabilidade não afeta a pureza das funções.',
        'Funções puras exigem dados mutáveis para serem eficientes.', 
        'A imutabilidade facilita a criação de funções puras.'
      ],
      respostaCorreta: 3
    },
    { 
      nivel: 2,
      tipo: 'pureza',
      pergunta: 'Se uma função precisa acessar dados de configuração externa, como isso deve ser feito para mantê-la pura?',
      opcoes: [
        'Acessando diretamente a configuração dentro da função.', 
        'Passando a configuração como um parâmetro para a função.', 
        'Armazenando a configuração em uma variável global.', 
        'Modificando a configuração durante a execução da função.'
      ],
      respostaCorreta: 1
    },
    {
      nivel: 2,
      tipo: 'pureza',
      pergunta: 'Quando uma função pura é chamada várias vezes com os mesmos argumentos, o que acontece?',
      opcoes: [
        'Ela pode retornar resultados diferentes.', 
        'O resultado é sempre o mesmo.', 
        'Ela provoca efeitos colaterais diferentes a cada chamada.', 
        'Ela consome mais memória a cada chamada.'
      ],
      respostaCorreta: 1
    },
    {
      nivel: 2,
      tipo: 'pureza',
      pergunta: 'Dada a seguinte função function concatStrings(a, b) { return a + b; } Qual dos seguintes exemplos de chamada mantém a pureza da função?',
      opcoes: [
        'concatStrings("Hello, ", "world!")', 
        'let str = "Hello, "; concatStrings(str, "world!")', 
        'str += "updated"; concatStrings("Hello, ", str)', 
        'Todas as anteriores'
      ],
      respostaCorreta: 3
    },
    {
      nivel: 2,
      tipo: 'pureza',
      pergunta: 'Considere a seguinte função function doubleArray(arr) { return arr.map(num => num * 2); } Essa função é pura ou impura?',
      opcoes: [
        'Pura', 
        'Impura'
      ],
      respostaCorreta: 0
    },
    {
      nivel: 2,
      tipo: 'pureza',
      pergunta: 'Considere a seguinte função function multiplyByTwo(num, multiplier=2) { return num * multiplier } Qual é o resultado ao chamar multiplyByTwo(3)?',
      opcoes: [
        '3', 
        '4', 
        '2', 
        '6'
      ],
      respostaCorreta: 3
    },
    {
      nivel: 2,
      tipo: 'pureza',
      pergunta: 'Dado o código abaixo, qual é a saída da função calculate? function calculate(a, x=10) { return a + x } console.log(calculate(5))',
      opcoes: [
        '5', 
        '10', 
        '15', 
        '20'
      ],
      respostaCorreta: 2
    },
    {
      nivel: 2,
      tipo: 'pureza',
      pergunta: 'No contexto de programação funcional, qual dos seguintes conceitos está mais relacionado à utilização de funções puras?',
      opcoes: [
        'Efeitos colaterais', 
        'Mutabilidade de estado', 
        'Imutabilidade', 
        'Execução sequencial'
      ],
      respostaCorreta: 2
    },
    {
      nivel: 2,
      tipo: 'pureza',
      pergunta: 'Dado o seguinte código, qual é a melhor forma de torná-lo uma função pura? const total = 20 function addToTotal(num) { return total + num }',
      opcoes: [
        'Fazer a função retornar num.', 
        'Passar total como argumento e retornar a soma.', 
        'Utilizar uma variável global para armazenamento.'
      ],
      respostaCorreta: 1
    },
    {
      nivel: 3,
      tipo: 'pureza',
      pergunta: 'Considere a seguinte função em uma linguagem funcional: function filterEven(numbers) { return [n for n in numbers if n % 2 == 0] }. Essa função é considerada pura? Justifique.',
      opcoes: [
        'Sim, porque não altera a lista original de numbers.', 
        'Não, porque depende de uma variável externa.', 
        'Sim, porque sempre retorna uma nova lista.', 
        'Não, porque a operação de filtro pode causar efeitos colaterais.'
      ],
      respostaCorreta: 0
    },
    { 
      nivel: 3,
      tipo: 'pureza',
      pergunta: 'Qual é o impacto do uso de funções puras na implementação de algoritmos recursivos?',
      opcoes: [
        'Aumenta a chance de estouro de pilha devido a chamadas recursivas profundas.', 
        'Permite otimizações como Tail Call Optimization.', 
        'Reduz a legibilidade do código.', 
        'Exige a utilização de variáveis globais para controle de estado.'
      ],
      respostaCorreta: 1
    },
    { 
      nivel: 3,
      tipo: 'pureza',
      pergunta: 'Qual é a principal implicação de usar funções puras em um sistema de múltiplas threads?',
      opcoes: [
        'Aumento do uso de locks para garantir segurança.', 
        'Redução de problemas de concorrência e condições de corrida.', 
        'Necessidade de implementação de um sistema de estado compartilhado.', 
        'Aumento da complexidade do gerenciamento de memória.'
      ],
      respostaCorreta: 1
    },
    {
      nivel: 3,
      tipo: 'pureza',
      pergunta: 'Em programação funcional, como a imutabilidade se relaciona com a definição de funções puras?',
      opcoes: [
        'A imutabilidade é irrelevante para funções puras.', 
        'Funções puras dependem de variáveis mutáveis.', 
        'A imutabilidade garante que funções não causarão efeitos colaterais.', 
        'Funções puras não podem manipular dados imutáveis.'
      ],
      respostaCorreta: 2
    },
    {
      nivel: 3,
      tipo: 'pureza',
      pergunta: 'Em um contexto de programação funcional, o que significa a expressão "referência transparente"?',
      opcoes: [
        'Uma expressão que sempre pode ser substituída por seu valor sem alterar o comportamento do programa.', 
        'Uma expressão que não pode ser usada em funções puras.', 
        'Uma expressão que causa efeitos colaterais em variáveis globais.', 
        'Uma expressão que não pode ser otimizada pelo compilador.'
      ],
      respostaCorreta: 0
    },
    {
      nivel: 3,
      tipo: 'pureza',
      pergunta: 'Qual dos seguintes padrões de design é frequentemente utilizado em conjunto com funções puras para melhorar a composição de funções?',
      opcoes: [
        'Padrão de Singleton', 
        'Funções de ordem superior', 
        'Padrão Observer', 
        'Padrão de Comando'
      ],
      respostaCorreta: 1
    },
    {
      nivel: 3,
      tipo: 'pureza',
      pergunta: 'Por que o conceito de memoization é particularmente relevante para funções puras?',
      opcoes: [
        'Porque funções puras não podem ser otimizadas.', 
        'Porque memoization é uma forma de alterar o estado global.', 
        'Porque memoization pode melhorar o desempenho sem causar efeitos colaterais.', 
        'Porque memoization é irrelevante para funções que dependem de variáveis externas.'
      ],
      respostaCorreta: 2
    },
    {
      nivel: 3,
      tipo: 'pureza',
      pergunta: 'Como as funções puras podem influenciar a arquitetura de um sistema em microserviços?',
      opcoes: [
        'Elas permitem o compartilhamento de estado entre serviços.', 
        'Elas facilitam a testabilidade e a previsibilidade dos serviços.', 
        'Elas aumentam a complexidade da comunicação entre serviços.', 
        'Elas requerem o uso de bancos de dados mutáveis.'
      ],
      respostaCorreta: 1
    },
    {
      nivel: 3,
      tipo: 'pureza',
      pergunta: 'Em uma linguagem que suporta programação funcional, como a imutabilidade afeta a eficiência de funções puras?',
      opcoes: [
        'Imutabilidade pode levar a cópias desnecessárias de dados, diminuindo a eficiência.', 
        'Imutabilidade não tem impacto na eficiência.', 
        'Imutabilidade sempre aumenta a eficiência de funções puras.', 
        'Funções puras são sempre ineficientes por causa da imutabilidade.'
      ],
      respostaCorreta: 0
    },
    {
      nivel: 3,
      tipo: 'pureza',
      pergunta: 'Qual é o papel das funções de ordem superior na implementação de funções puras?',
      opcoes: [
        'Elas são necessárias apenas para funções impuras.', 
        'Elas permitem a criação de funções que podem manipular outras funções como argumentos.', 
        'Elas não têm relação com a pureza das funções.', 
        'Elas aumentam a complexidade da implementação de funções puras.'
      ],
      respostaCorreta: 1
    } 
];

// Função para checar se a resposta está correta
const checarResposta = (indiceResposta, pergunta) => {
  console.log("Índice da resposta correta:", pergunta.respostaCorreta); // Verificação do índice correto
  console.log("Índice da resposta escolhida:", indiceRespostaEscolhida); // Verificação do índice escolhido
  return indiceResposta === pergunta.respostaCorreta;
};

// Função para calcular o nível com base nos acertos
const calcularNivel = (historicoRespostas) => {
  const acertos = historicoRespostas.reduce((total, resposta) => 
    resposta === true ? total + 1 : total, 0);
    
  const novoNivel = Math.min(1 + Math.floor(acertos / 5), 3); // Aumenta o nível a cada 5 acertos, até o nível 3
  return novoNivel;
};

// Função para agrupar perguntas por nível
const agruparPorNivel = (perguntas) => {
  console.log("Agrupando perguntas para o nível:", nivelAtual); // Verificação do nível
  const agregar = (perguntas, niveis = {}) => {
    if (perguntas.length === 0) {
      return niveis;
    }
    const [primeira, ...resto] = perguntas;
    const nivel = primeira.nivel;

    if (!niveis[nivel]) {
      niveis[nivel] = [];
    }
    niveis[nivel].push(primeira);
    return agregar(resto, niveis);
  };
  
  return agregar(perguntas);
};

// Função para renderizar perguntas
const renderizarPergunta = (indice, historicoRespostas, nivelAtual, perguntasAgrupadas) => {
  const perguntasFiltradas = perguntasAgrupadas[nivelAtual] || [];
  
  const exibirPergunta = (indice) => {
    if (indice < perguntasFiltradas.length && indice < 20) {
      const perguntaDiv = document.getElementById('pergunta');
      const opcoesDiv = document.getElementById('opcoes');

      const perguntaAtual = perguntasFiltradas[indice];

      perguntaDiv.innerHTML = `<strong>Nível ${nivelAtual}</strong><br>${perguntaAtual.pergunta}`;
      opcoesDiv.innerHTML = ''; // Limpa as opções anteriores

      // Renderiza as opções de resposta
      renderizarOpcoes(perguntaAtual.opcoes, indice, historicoRespostas, nivelAtual, perguntasAgrupadas);
    } else {
      // Exibe a pontuação final
      document.getElementById('pergunta').innerText = 'Quiz finalizado.';
      document.getElementById('opcoes').innerHTML = ''; // Limpa as opções
    }
  };

  exibirPergunta(indice);
};

// Função para renderizar opções de forma recursiva
const renderizarOpcoes = (opcoes, perguntaIndice, historicoRespostas, nivelAtual, perguntasAgrupadas) => {
  const opcoesDiv = document.getElementById('opcoes');

  const renderizarRecursivo = (index) => {
    if (index < opcoes.length) {
      const botaoOpcao = document.createElement('button');
      botaoOpcao.innerText = opcoes[index];
      botaoOpcao.addEventListener('click', () => {
        const respostaCorreta = perguntas[perguntaIndice].respostaCorreta;
        const resposta = checarResposta(index, perguntas[perguntaIndice]);
        
        historicoRespostas.push(resposta); // Adiciona a resposta ao histórico

        if (resposta) {
          alert('Resposta correta!');
        } else {
          alert(`Resposta errada. A correta era: ${opcoes[respostaCorreta]}`);
        }

        // Atualiza o nível do usuário baseado no desempenho
        const novoNivel = calcularNivel(historicoRespostas);
        
        // Incrementa o índice para a próxima pergunta
        const proximoIndice = perguntaIndice + 1;

        // Se o nível mudou, reinicia o índice para 0 do novo nível
        if (novoNivel !== nivelAtual) {
          renderizarPergunta(0, historicoRespostas, novoNivel, perguntasAgrupadas);
        } else {
          // Se o nível não mudou, continua para a próxima pergunta
          renderizarPergunta(proximoIndice, historicoRespostas, nivelAtual, perguntasAgrupadas);
        }
      });
      opcoesDiv.appendChild(botaoOpcao);
      renderizarRecursivo(index + 1); // Chama para o próximo índice
    }
  };

  renderizarRecursivo(0); // Inicia a renderização
};

// Array para armazenar o histórico de respostas
const historicoRespostas = [];

// Nível inicial do usuário
const nivelAtual = 1;

// Agrupa as perguntas por nível
const perguntasAgrupadas = agruparPorNivel(perguntas);

// Inicia o quiz exibindo a primeira pergunta
renderizarPergunta(0, historicoRespostas, nivelAtual, perguntasAgrupadas);
