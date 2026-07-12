async function carregarCategoria(categoria) {

    const lista = document.getElementById("lista-noticias");


    if (!lista) {
        return;
    }


    lista.innerHTML = `

    <div class="card-noticia">

        <h3>
        Carregando ${categoria}...
        </h3>

        <p>
        Buscando notícias atualizadas.
        </p>

    </div>

    `;



    try {


        const resposta = await fetch(
            API_URL + "?categoria=" + categoria
        );



        const noticias = await resposta.json();



        lista.innerHTML = "";



        noticias.forEach(noticia => {



            lista.innerHTML += `


            <article class="card-noticia">


                ${
                noticia.imagem

                ?

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


        console.error(erro);


        lista.innerHTML = `

        <div class="card-noticia">

            <h3>
            Erro ao carregar notícias
            </h3>

        </div>

        `;


    }


}