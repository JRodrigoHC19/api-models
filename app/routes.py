import os
#
from fastapi.exceptions import HTTPException
from fastapi.routing import APIRouter
from fastapi import status, File, UploadFile
from PyPDF2 import PdfReader
#
from .database import client
from .utils import cargar_modelo, classify_pdf, guardar_habilidades, abs_url


# SETTINGS
routes = APIRouter()
BASE_DIR = os.path.dirname(os.path.realpath(__file__))
db_usuarios = client["usuarios"]  # Nombre de la colección


# MODELS
pkl_model = cargar_modelo(abs_url(BASE_DIR, "./models/modelo_habilidades.pkl"))
pkl_vectorizer = cargar_modelo(abs_url(BASE_DIR, "./models/vectorizador.pkl"))
pkl_categories = cargar_modelo(abs_url(BASE_DIR, "./models/categorias.pkl"))


@routes.post("/", status_code=status.HTTP_200_OK)
async def my_route(file: UploadFile = File(...), usuario_id: str = "example123", nombre: str = "example", email: str = "example@example.com"):

    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="El archivo no es un PDF válido.")
    
    try:
        habilidades = classify_pdf(file, pkl_model, pkl_vectorizer, pkl_categories)
        guardar_habilidades(usuario_id, nombre, email, habilidades, db_usuarios)

        # Mostrar el vocabulario para depuración (opcional)
        # vocabulario = pkl_vectorizer.get_feature_names_out()
        
        return {
            "message": "Habilidades detectadas:", 
            "habilidades": habilidades,
            # "vocabulario": f"{vocabulario}"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"Error al procesar el PDF: {e}"
        )
