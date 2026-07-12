const API_URL = "https://news-brasil-api.onrender.com/noticias";


async function carregarNoticias() {

    const lista = document.getElementById("lista-noticias");


    if (!lista) {
        console.log("Lista não encontrada");
        return;
    }


    lista.innerHTML = `
        <div class="card-noticia">
            <h3>Carregando notícias...</h3>
            <p>Aguarde alguns segundos.</p>
        </div>
    `;


    try {


        const resposta = await fetch(API_URL);


        if (!resposta.ok) {

            throw new Error("Erro ao conectar API");

        }


        const noticias = await resposta.json();


        lista.innerHTML = "";


        noticias.forEach(noticia => {


            lista.innerHTML += `

            <article class="card-noticia">


                ${
                noticia.imagem
                ?
                `<img src="${noticia.imagem}" loading="lazy" alt="Notícia">`
                :
                ""
                }


                <h3>
                ${noticia.titulo || "News Brasil Notícias"}
                </h3>


                <p>
                ${noticia.resumo || "Sem resumo disponível"}
                </p>


                <a 
                href="${noticia.link}" 
                target="_blank">

                Ler notícia

                </a>


            </article>


            `;


        });


    } catch(error) {


        console.error(error);


        lista.innerHTML = `

        <article class="card-noticia">

            <h3>Erro ao carregar notícias</h3>

            <p>
            Não foi possível conectar ao servidor.
            </p>

        </article>

        `;


    }

}




document.addEventListener(
"DOMContentLoaded",
()=>{

    carregarNoticias();

});