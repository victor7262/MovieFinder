const url =
	"https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/";
iniciar();

function iniciar() {
	const getFilmesDisponiveis = axios.get(url);

	getFilmesDisponiveis.then(getFilmesDisponiveisSucesso);
	getFilmesDisponiveis.catch(erroGetFilmesDisponiveis);
}

function getFilmesDisponiveisSucesso(res) {
	if (res.data == null) return;

	for (let index = 0; index < res.data.length; index++) {
		exibirMovie(res.data[index]);
	}
}

function erroGetFilmesDisponiveis(res) {
	console.log("erro...");
	console.log(res);
}

function exibirMovie(movie) {
	const novoMovie = `<div class="movie">
    <img src="${movie.imagem}"/>
    <div class="title">${movie.titulo}</div>
    <button id="${movie.id}" onclick="comprarIngresso(this)">
        Comprar
        <ion-icon name="cart-outline"></ion-icon>
    </button>
</div>`;

	const movies = document.querySelector(".movies");
	movies.innerHTML += novoMovie;
}

function comprarIngresso(elemento) {
	const idMovie = elemento.id;
	const nome = prompt("Informe seu nome:");
	const quantidade = prompt("Qual a quantidade de ingressos?");

	if (Number(quantidade) == NaN) return;

	let dadosDaCompra = new Object();
	dadosDaCompra.nome = nome;
	dadosDaCompra.quantidade = Number(quantidade);

	const promise = axios.post(url + idMovie + "/ingresso", dadosDaCompra);

	promise.then(sucessoComprarIngresso);
	promise.catch(erroComprarIngresso);
}

function sucessoComprarIngresso(params) {
	alert(params.data.mensagem);
}

function erroComprarIngresso(params) {
	if (params.response.status == 409) alert(params.response.data.mensagem);
	else alert("Erro genérico");
}
