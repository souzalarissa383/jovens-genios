const rackingsList = document.getElementById(" rackingsList ");
const pontosMax = JSON.parse(localStorage.getItem("pontosMax")) || [];
 
pontosMax.innerHTML = rackingsList 
    .map(pontuacao => {
        return `<li class="high-score">${pontuacao.name} - ${pontuacao.pontuacao}</li>`;
    })
    .join("");