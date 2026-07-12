const API_URL = "https://news-brasil-api.onrender.com/noticias";


async function carregarNoticias() {

    const lista = document.getElementById("lista-noticias");


    if (!lista) {
        console.error("Elemento lista-noticias não encontrado");
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


        const noticias = await resposta.json();


        lista.innerHTML = "";


        noticias.forEach(noticia => {


            lista.innerHTML += `

            <article class="card-noticia">


                ${noticia.imagem ? 
                
                `<img src="${noticia.imagem}" alt="Notícia">`
                
                :
                
                ""
                
                }


                <h3>
                    ${noticia.titulo || "News Brasil Notícias"}
                </h3>


                <p>
                    ${noticia.resumo || ""}
                </p>


                <a href="${noticia.link}" target="_blank">
                    Ler notícia
                </a>


            </article>

            `;


        });


    } catch (erro) {


        console.error("Erro:", erro);


        lista.innerHTML = `

        <div class="card-noticia">

            <h3>Erro ao conectar</h3>

            <p>Não foi possível carregar as notícias.</p>

        </div>

        `;


    }

}



document.addEventListener("DOMContentLoaded", () => {

    carregarNoticias();

});