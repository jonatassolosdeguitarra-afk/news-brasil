from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os


load_dotenv()


app = Flask(__name__)
CORS(app)


API_KEY = os.getenv("NEWS_API_KEY")


@app.route("/")
def home():
    return """
    <h1>🚀 NEWS BRASIL NOTÍCIAS ONLINE</h1>
    <p>Servidor funcionando!</p>
    """



def buscar_noticias():

    if not API_KEY:
        return [{
            "titulo": "API não configurada",
            "resumo": "Arquivo .env não encontrado",
            "imagem": "",
            "link": ""
        }]


    url = (
        "https://newsapi.org/v2/everything"
        "?q=Brasil"
        "&language=pt"
        "&sortBy=publishedAt"
        "&pageSize=10"
        f"&apiKey={API_KEY}"
    )


    resposta = requests.get(url, timeout=15)

    dados = resposta.json()


    print("====================")
    print("STATUS NEWS API:", resposta.status_code)
    print(dados)
    print("====================")


    noticias = []


    for item in dados.get("articles", []):

        noticias.append({

            "titulo": item.get("title"),
            "resumo": item.get("description"),
            "imagem": item.get("urlToImage"),
            "link": item.get("url")

        })


    return noticias



@app.route("/noticias")
def noticias():

    return jsonify(buscar_noticias())



@app.route("/api")
def api():

    return jsonify({
        "status":"online"
    })



if __name__ == "__main__":

    print("🚀 NEWS BRASIL NOTÍCIAS ONLINE")

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )