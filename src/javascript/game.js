// var para retorna a referência do elemento através do seu ID.
const questao = document.getElementById("questao");
const escolha = Array.from(document.getElementsByClassName("opcao"));
const progressText = document.getElementById("progressText");
const pontuacaoText = document.getElementById("pontos");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");


// variável local
let perguntaAtual = {};
let resposta = false;
let pontuacao = 0;
let numeroPerguntas = 0;
let perguntasDisponiveis = [];

/* aquivo JSON  : questoes.json */
let questoes = [];


fetch(
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
)
    .then(res => {
        return res.json();
    })
    .then(loadQuestao => {
        console.log(loadQuestao.resultado);
        questoes = loadQuestao.resultado.map(loadQuestao => {
            const formatarQuestoes = {
                questao: loadQuestao.questao
            };

            const responderOpcao = [...loadQuestao.resposta_incorreta];
            formatarQuestoes.alternativa = Math.floor(Math.random() * 3) + 1;
            responderOpcao.splice(
            formatarQuestoes.alternativa - 1,
            0, 
            loadQuestao.resposta_correta

            );

            responderOpcao.forEach((escolha, index) => {
                formatarQuestoes["escolha" + (index + 1)] = escolha;
            })

            return formatarQuestoes;
        });

        iniciarJogo();
    });
    
    .cath(err => {
        console.error(err);
    });
   

//var constanstes
const bonus = 10;
const max_questoes = 3;

iniciarJogo = () => {
    numeroPerguntas = 0;
    pontuacao = 0;
    perguntasDisponiveis = [...questoes];
    getNewQuestao();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestao = () => {

    if (perguntasDisponiveis.length === 0 || numeroPerguntas >= max_questoes) {
        localStorage.setItem("pontuacaoRecente", pontuacao);
        //ir para pagina final//
        return window.location.assign("../fim-jogo.html");
    }

    numeroPerguntas++;
    progressText.innerHTML = `Questao ${numeroPerguntas}/${max_questoes}`;

    // atualização de progresso da barra 
    progressBarFull.style.width = `${(numeroPerguntas / max_questoes) * 100}%`;

    const questaoIndex = Math.floor(Math.random() * perguntasDisponiveis.length);
    perguntaAtual = perguntasDisponiveis[questaoIndex];
    questao.innerText = perguntaAtual.questao;

    escolha.forEach(escolha => {
        const numero = escolha.dataset["numero"];
        escolha.innerText = perguntaAtual["escolha" + numero];
    });

    perguntasDisponiveis.splice(questaoIndex, 1);

    resposta = true;

};

escolha.forEach(opcao => {
    opcao.addEventListener("click", e => {
        if (!resposta) return;

        resposta = false;

        const selectopcao = e.target;
        const selectresposta = selectopcao.dataset["numero"];

        // var constante para decidir se a resposta esta correta ou incorreta    
        const classFeedback = selectresposta == pergunta.alternativa ? 'correta' : 'incorreta';

        if (classFeedback === "correta") {
            incrementPontuacao(bonus);
        }

        selectopcao.parentElement.classList.add(classFeedback);

        setTimeout(() => {
            selectopcao.parentElement.classList.remove(classFeedback);
            getNewQuestao();
        }, 1000);
    });
});


contagem = num => {
    pontuacao += num;
    pontuacaoText.innerText = pontuacao;
}
