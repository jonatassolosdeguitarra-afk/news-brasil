
const API_URL = "https://news-brasil-api.onrender.com/noticias";


// Carrega notícias iniciais

async function carregarNoticias() {

    buscarNoticias("");

}



// Carregar por categoria

async function carregarCategoria(categoria) {


    buscarNoticias(categoria);


}




// Busca notícias na API

async function buscarNoticias(categoria) {


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


        let url = API_URL;



        if (categoria) {

            url += "?categoria=" + categoria;

        }



        const resposta = await fetch(url);



        if (!resposta.ok) {

            throw new Error("Erro na API");

        }



        const noticias = await resposta.json();



        lista.innerHTML = "";



        if (!Array.isArray(noticias) || noticias.length === 0) {


            lista.innerHTML = `

            <div class="card-noticia">

                <h3>Nenhuma notícia encontrada</h3>

                <p>Tente outra categoria.</p>

            </div>

            `;


            return;

        }





        noticias.forEach(noticia => {



            lista.innerHTML += `


            <article class="card-noticia">


                ${
                noticia.imagem

                ?

                `<img src="${noticia.imagem}" 
                alt="Imagem da notícia">`

                :

                ""

                }



                <h3>

                ${noticia.titulo || "News Brasil Notícias"}

                </h3>



                <p>

                ${noticia.resumo || "Confira esta notícia."}

                </p>




                <a href="${noticia.link}" target="_blank">

                    Ler notícia

                </a>



            </article>


            `;



        });



    }


    catch(error) {



        console.error(error);



        lista.innerHTML = `


        <div class="card-noticia">


            <h3>

            Erro ao conectar

            </h3>



            <p>

            Não foi possível carregar as notícias.

            </p>


        </div>


        `;


    }



}




// Executa quando abre o site

document.addEventListener("DOMContentLoaded", () => {


    carregarNoticias();



    // Atualiza a cada 10 minutos

    setInterval(() => {


        carregarNoticias();


    },600000);



});
```
