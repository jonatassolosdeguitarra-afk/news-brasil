/* =====================================
   BR NEWS BRASIL NOTÍCIAS
   SCRIPT PROFISSIONAL ATUALIZADO
===================================== */


const API_URL =
"https://news-brasil-api.onrender.com/noticias";


const IMAGEM_PADRAO =
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
   DATA E HORA
===================================== */


function atualizarHora(){


if(dataHora){


const agora = new Date();


dataHora.innerHTML =
agora.toLocaleString("pt-BR");


}


}


setInterval(
atualizarHora,
1000
);


atualizarHora();








/* =====================================
   CARREGAR NOTÍCIAS
===================================== */


async function carregarNoticias(){


try{


const resposta =
await fetch(API_URL);



if(!resposta.ok){

throw new Error(
"Erro na API"
);

}



const noticias =
await resposta.json();



todasNoticias = noticias;



mostrarNoticias(noticias);



}

catch(erro){


console.log(
"Erro ao carregar notícias:",
erro
);



if(cardsNoticias){


cardsNoticias.innerHTML = `

<div class="loading">

⚠️ Notícias indisponíveis no momento.

</div>

`;

}


}



}









/* =====================================
   MOSTRAR NOTÍCIAS
===================================== */


function mostrarNoticias(lista){


if(!cardsNoticias){

return;

}



cardsNoticias.innerHTML = "";



if(listaNoticias){

listaNoticias.innerHTML = "";

}



lista
.slice(0,12)
.forEach((noticia,index)=>{



const titulo =

noticia.titulo ||
noticia.title ||
"Notícia sem título";



const descricao =

noticia.descricao ||
noticia.description ||
"Confira todos os detalhes desta notícia.";





let imagem =

noticia.imagem ||
noticia.image ||
noticia.urlToImage ||
IMAGEM_PADRAO;



// evita imagem vazia

if(
imagem === "" ||
imagem === null ||
imagem === undefined
){

imagem = IMAGEM_PADRAO;

}







/* =====================================
   NOTÍCIA PRINCIPAL
===================================== */


if(index === 0){



const imagemPrincipal =

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




if(imagemPrincipal){


imagemPrincipal.src = imagem;



imagemPrincipal.onerror = function(){


this.src =
IMAGEM_PADRAO;


};


}




if(tituloPrincipal){


tituloPrincipal.innerHTML =
titulo;


}



if(textoPrincipal){


textoPrincipal.innerHTML =
descricao;


}



}









/* =====================================
   CARD DE NOTÍCIA
===================================== */


cardsNoticias.innerHTML += `


<article class="card">


<img 
src="${imagem}"
alt="${titulo}"
onerror="this.src='${IMAGEM_PADRAO}'"
>



<div class="conteudo">


<span>

🇧🇷 BR NEWS

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









/* =====================================
   LISTA DE NOTÍCIAS
===================================== */


if(listaNoticias){


listaNoticias.innerHTML += `


<div class="noticia">


<img 

src="${imagem}"

onerror="this.src='${IMAGEM_PADRAO}'"

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
function(){


const texto =

this.value.toLowerCase();



const resultado =

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



mostrarNoticias(resultado);



});


}









/* =====================================
   VÍDEOS
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



if(!resposta.ok){

return;

}



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


Seu navegador não suporta vídeo.


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
"Sem vídeos disponíveis"
);


}



}









/* =====================================
   INICIAR SISTEMA
===================================== */


carregarNoticias();


carregarVideos();





// Atualiza notícias a cada 5 minutos

setInterval(()=>{


carregarNoticias();


},300000);