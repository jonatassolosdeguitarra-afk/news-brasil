/* =====================================
   BR NEWS BRASIL NOTÍCIAS
   JAVASCRIPT PROFISSIONAL 4.0
===================================== */


const API_URL =
"https://news-brasil-api.onrender.com/noticias";


const imagemPadrao =
"imagens/fundo.jpg";


let todasNoticias = [];



const cardsNoticias =
document.getElementById("cardsNoticias");


const listaNoticias =
document.getElementById("noticias");


const campoPesquisa =
document.getElementById("campoPesquisa");


const dataHora =
document.getElementById("dataHora");



const listaVideos =
document.getElementById("listaVideos");







/* =====================================
   RELÓGIO
===================================== */


function atualizarHora(){


if(dataHora){


const data = new Date();


dataHora.innerHTML =
data.toLocaleString("pt-BR");


}


}



setInterval(
atualizarHora,
1000
);


atualizarHora();









/* =====================================
   BUSCAR NOTÍCIAS
===================================== */


async function carregarNoticias(){


try{


const resposta =
await fetch(API_URL);



if(!resposta.ok){

throw new Error(
"API offline"
);

}



const dados =
await resposta.json();



todasNoticias = dados;



mostrarNoticias(dados);



}

catch(erro){


console.log(
erro
);



if(cardsNoticias){


cardsNoticias.innerHTML = `

<div class="loading">

Não foi possível carregar notícias.

</div>

`;


}



}



}









/* =====================================
   MOSTRAR NOTÍCIAS
===================================== */


function mostrarNoticias(noticias){


if(!cardsNoticias){

return;

}



cardsNoticias.innerHTML="";



if(listaNoticias){

listaNoticias.innerHTML="";

}



noticias
.slice(0,12)
.forEach((noticia,index)=>{


const titulo =

noticia.titulo ||
noticia.title ||
"Sem título";



const descricao =

noticia.descricao ||
noticia.description ||
"Confira essa notícia completa.";



const imagem =

noticia.imagem ||
noticia.image ||
noticia.urlToImage ||
imagemPadrao;



const categoria =

noticia.categoria ||
"Brasil";







/* ======================
   DESTAQUE
====================== */


if(index===0){


const img =
document.querySelector(
".noticia-principal img"
);


const tituloPrincipal =
document.querySelector(
".noticia-principal h2"
);


const textoPrincipal =
document.querySelector(
".noticia-principal p"
);



if(img){

img.src=imagem;

}


if(tituloPrincipal){

tituloPrincipal.innerHTML=titulo;

}



if(textoPrincipal){

textoPrincipal.innerHTML=descricao;

}



}









/* ======================
   CARD
====================== */



cardsNoticias.innerHTML += `


<article class="card">


<img 
src="${imagem}"
onerror="this.src='${imagemPadrao}'"
>



<div class="conteudo">


<span>

🇧🇷 ${categoria}

</span>



<h3>

${titulo}

</h3>



<p>

${descricao}

</p>



<button onclick="abrirNoticia(${index})">

Ler notícia

</button>



</div>


</article>


`;










/* ======================
   LISTA
====================== */


if(listaNoticias){



listaNoticias.innerHTML += `


<div class="noticia">


<img 
src="${imagem}"
onerror="this.src='${imagemPadrao}'"
>



<div>


<h3>

${titulo}

</h3>



<p>

Atualizado pelo BR NEWS

</p>


</div>



</div>


`;



}



});



}









/* =====================================
   ABRIR NOTÍCIA COMPLETA
===================================== */


function abrirNoticia(id){


const noticia = 
todasNoticias[id];



localStorage.setItem(

"noticiaSelecionada",

JSON.stringify(noticia)

);



window.location.href =
"noticia.html";


}









/* =====================================
   PESQUISA
===================================== */


if(campoPesquisa){


campoPesquisa.addEventListener(
"input",
()=>{


const texto =

campoPesquisa.value
.toLowerCase();



const filtradas =

todasNoticias.filter(
(noticia)=>{


const titulo =

(
noticia.titulo ||
noticia.title ||
""
)
.toLowerCase();



return titulo.includes(texto);



});



mostrarNoticias(filtradas);



});


}









/* =====================================
   VÍDEOS AUTOMÁTICOS
===================================== */


async function carregarVideos(){



if(!listaVideos){

return;

}



try{


const resposta =
await fetch(
"videos/videos.json"
);



const videos =
await resposta.json();



listaVideos.innerHTML="";



videos.forEach(video=>{


listaVideos.innerHTML += `


<div class="video-card">


<video controls>


<source 
src="videos/${video.arquivo}"
type="video/mp4"
>


</video>



<div class="video-info">


<h3>

${video.titulo}

</h3>



<p>

${video.descricao}

</p>



</div>


</div>


`;



});



}

catch(erro){


console.log(
"Vídeos não encontrados"
);



}



}









/* =====================================
   INICIAR
===================================== */


carregarNoticias();


carregarVideos();





/* Atualiza a cada 5 minutos */


setInterval(()=>{


carregarNoticias();


},300000);