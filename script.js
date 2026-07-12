// ==========================================
// NEWS BRASIL NOTÍCIAS
// script.js
// ==========================================

const API_URL = "https://news-brasil-api.onrender.com/noticias";

async function carregarNoticias() {

    const lista = document.getElementById("lista-noticias");

    if (!lista) {
        console.error("Elemento #lista-noticias não encontrado.");
        return;
    }

    lista.innerHTML = "<p>Carregando notícias...</p>";

    try {

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Servidor respondeu: " + resposta.status);
        }

        const noticias = await resposta.json();

        lista.innerHTML = "";

        if (!Array.isArray(noticias) || noticias.length === 0) {

            lista.innerHTML = `
                <div class="card">
                    <h3>Nenhuma notícia encontrada</h3>
                    <p>A API retornou uma lista vazia.</p>
                </div>
            `;

            return;
        }

        noticias.forEach(noticia => {

            const card = document.createElement("article");

            card.className = "card";

            card.innerHTML = `
                ${
                    noticia.imagem
                    ? `<img src="${noticia.imagem}" alt="Imagem da notícia">`
                    : ""
                }

                <h3>${noticia.titulo}</h3>

                <p>${noticia.resumo}</p>

                <a href="${noticia.link}" target="_blank">
                    <button class="btn-noticia">
                        Ler notícia completa
                    </button>
                </a>
            `;

            lista.appendChild(card);

        });

    }

    catch (erro) {

        console.error(erro);

        lista.innerHTML = `
            <div class="card">

                <h3>Erro ao conectar</h3>

                <p>${erro}</p>

                <p>
                    Verifique se o Flask está rodando em
                    <br>
                    https://news-brasil-api.onrender.com
                </p>

            </div>
        `;

    }

}

document.addEventListener("DOMContentLoaded", () => {

    carregarNoticias();

    // Atualiza a cada 10 minutos
    setInterval(carregarNoticias, 600000);

});
