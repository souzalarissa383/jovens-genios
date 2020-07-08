
const usuario = document.getElementById("usuario");
const salvarPontos = document.getElementById("salvarPontos");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");
const pontuacaoRecente = localStorage.getItem("pontuacaoRecente ");

const pontuacaoMaxima = JSON.parse(localStorage.getItem("pontuacaoMaxima")) || [];

const maximo = 5;

pontuacaoFinal.innerText = pontuacaoRecente;

usuario.addEventListener("keyup", () => {
    salvarPontos.disabled = !usuario.value;
});

salvarPontos = e => {
    console.log("click para salvar !");
    e.preventDefault();

    const pontos = {
        score: pontuacaoRecente,
        name: usuario.value
    };

    pontuacaoMaxima.push(pontos);
    pontuacaoMaxima.sort((a, b) => b.pontos - a.pontos);
    pontuacaoMaxima.splice(8);

    localStorage.setItem("pontuacaoMaxima", JSON.stringify(pontuacaoMaxima));
    window.location.assign("../../");

}