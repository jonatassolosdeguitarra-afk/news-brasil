from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os
import time


load_dotenv()


app = Flask(__name__)

CORS(app)


API_KEY = os.getenv("NEWS_API_KEY")


# Cache das notícias
cache_noticias = []
ultima_atualizacao = 0


TEMPO_CACHE = 600  # 10 minutos



@app.route("/")
def home():

    return """
    <h1>🚀 NEWS BRASIL NOTÍCIAS ONLINE</h1>
    <p>Servidor funcionando!</p>
    """





def buscar_noticias(categoria="brasil"):

    global cache_noticias
    global ultima_atualizacao


    agora = time.time()


    # Retorna cache se ainda estiver válido
    if cache_noticias and (agora - ultima_atualizacao < TEMPO_CACHE):

        return cache_noticias



    if not API_KEY:

        return [

            {
                "titulo": "API não configurada",
                "resumo": "Arquivo .env não encontrado",
                "imagem": "",
                "link": ""
            }

        ]



    url = (

        "https://newsapi.org/v2/everything"

        f"?q={categoria}"

        "&language=pt"

        "&sortBy=publishedAt"

        "&pageSize=10"

        f"&apiKey={API_KEY}"

    )



    try:


        resposta = requests.get(

            url,

            timeout=8

        )


        dados = resposta.json()



        noticias = []



        for item in dados.get("articles", []):


            noticias.append(

                {

                    "titulo": item.get("title"),

                    "resumo": item.get("description"),

                    "imagem": item.get("urlToImage"),

                    "link": item.get("url")

                }

            )



        cache_noticias = noticias

        ultima_atualizacao = agora



        return noticias



    except Exception as erro:


        print("Erro News API:", erro)


        return [

            {

                "titulo": "Erro ao buscar notícias",

                "resumo": "Tente novamente mais tarde",

                "imagem": "",

                "link": ""

            }

        ]







@app.route("/noticias")
def noticias():


    categoria = request.args.get(

        "categoria",

        "brasil"

    )


    return jsonify(

        buscar_noticias(categoria)

    )







@app.route("/api")
def api():


    return jsonify(

        {

            "status": "online",

            "servidor": "News Brasil Notícias"

        }

    )








if __name__ == "__main__":


    print("🚀 NEWS BRASIL NOTÍCIAS ONLINE")


    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )
