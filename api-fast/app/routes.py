import os
#
from fastapi.exceptions import HTTPException
from fastapi.routing import APIRouter
from fastapi import status, File, UploadFile
from PyPDF2 import PdfReader
#
from .database import client
from .utils import cargar_modelo, classify_pdf, guardar_habilidades, abs_url, classify_pdf_from_url


# SETTINGS
routes = APIRouter()
BASE_DIR = os.path.dirname(os.path.realpath(__file__))
db_usuarios = client["usuarios"]  # Nombre de la colección


# MODELS
pkl_model = cargar_modelo(abs_url(BASE_DIR, "./models/modelo_habilidades.pkl"))
pkl_vectorizer = cargar_modelo(abs_url(BASE_DIR, "./models/vectorizador.pkl"))
pkl_categories = cargar_modelo(abs_url(BASE_DIR, "./models/categorias.pkl"))


@routes.post("/", status_code=status.HTTP_200_OK)
async def my_route(
    archivo: UploadFile = File(...), 
    correoEstudiante: str = "example@example.com", 
    proyectoId: str = "example123",
    estudianteId: str = "example123", 
    nombreEntregable: str = "example"
    # proyectoId: str = "project123"
    ):

    if archivo.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="El archivo no es un PDF válido.")
    
    try:
        habilidades = classify_pdf(archivo, pkl_model, pkl_vectorizer, pkl_categories)
        guardar_habilidades(estudianteId, nombreEntregable, correoEstudiante, habilidades, db_usuarios)

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


@routes.post("/from-url", status_code=status.HTTP_200_OK)
async def process_pdf_from_url(pdf_url: str, usuario_id: str = "example123", nombre: str = "example", email: str = "example@example.com"):
    try:
        # Clasifica texto desde la URL usando utils.py
        habilidades = classify_pdf_from_url(pdf_url, pkl_model, pkl_vectorizer, pkl_categories)
        guardar_habilidades(usuario_id, nombre, email, habilidades, db_usuarios)
        
        return {
            "message": "Habilidades detectadas desde URL:",
            "habilidades": habilidades,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"Error al procesar el PDF desde la URL: {e}"
        )