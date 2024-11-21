from sklearn.feature_extraction.text import TfidfVectorizer
from PyPDF2 import PdfReader
import spacy
import pickle
import os

def abs_url(dir, ruta):
    return os.path.join(dir, ruta)
    

def cargar_modelo(ruta):
    if not os.path.exists(ruta):
        raise FileNotFoundError(f"El archivo '{ruta}' no existe.")
    try:
        with open(ruta, "rb") as f:
            return pickle.load(f)
    except Exception as e:
        raise RuntimeError(f"Error al cargar '{ruta}': {e}")


# Preprocesar texto completo
def preprocess_text(text):
    # Cargar el modelo de lenguaje SpaCy
    nlp = spacy.load("es_core_news_sm")
    
    # Preprocesar texto completo
    doc = nlp(text.lower())
    tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
    return ' '.join(tokens)


# Leer y clasificar texto completo del PDF
def classify_pdf(file, pkl_model, pkl_vectorizer, pkl_categories):
    pdf_reader = PdfReader(file.file)
    full_text = ""        

    for page in pdf_reader.pages:
        full_text += page.extract_text()

    # Preprocesar todo el texto del PDF
    preprocessed_text = preprocess_text(full_text)

    # Vectorizar el texto preprocesado
    vectorized_text = pkl_vectorizer.transform([preprocessed_text])

    # Hacer predicción
    predictions = pkl_model.predict(vectorized_text)

    # Identificar categorías detectadas
    habilidades_detectadas = [pkl_categories[i] for i, val in enumerate(predictions[0]) if val > 0]

    return habilidades_detectadas


def guardar_habilidades(usuario_id, nombre, email, habilidades, coleccion):
    usuario = coleccion.find_one({"_id": usuario_id})
    if not usuario:
        usuario = {
            "_id": usuario_id,
            "nombre": nombre,
            "email": email,
            "habilidades": []
        }

    for habilidad in habilidades:
        habilidad_existente = next((h for h in usuario["habilidades"] if h["nombre"] == habilidad), None)
        if habilidad_existente:
            habilidad_existente["puntaje"] += 1
        else:
            usuario["habilidades"].append({"nombre": habilidad, "puntaje": 1})

    coleccion.replace_one({"_id": usuario_id}, usuario, upsert=True)

    return usuario
