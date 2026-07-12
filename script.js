const API_URL = "https://news-brasil-api.onrender.com/noticias";

async function carregarNoticias() {
    const lista = document.getElementById("lista-noticias");

    if (!lista) {
        console.error("Elemento lista-noticias não encontrado");
        return;
    }

    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro na API");
        }

        const noticias = await resposta.json();

        lista.innerHTML = "";

        noticias.forEach(noticia => {

            const titulo = noticia.titulo || "Notícia News Brasil";

            lista.innerHTML += `
                <article class="card-noticia">

                    ${noticia.imagem ? 
                    `<img src="${noticia.imagem}" alt="${titulo}">`
                    : ""}

                    <h3>${titulo}</h3>

                    <p>${noticia.resumo || ""}</p>

                    <a href="${noticia.link}" target="_blank">
                        Ler notícia
                    </a>

                </article>
            `;
        });

    } catch (erro) {

        console.error(erro);

        lista.innerHTML = `
            <p>Erro ao conectar com o servidor de notícias.</p>
        `;
    }
}


carregarNoticias();

setInterval(carregarNoticias, 600000);