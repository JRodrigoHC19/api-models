from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
#
from .routes import routes


# SETTINGS
app = FastAPI()
origins = ["*"]


# ROUTES
app.include_router(routes, prefix="/api/recommendations")


# MIDDLEWARES
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)


# INDEX
@app.get("/")
def index():
    return {"message": "Server FastAPI is running"}