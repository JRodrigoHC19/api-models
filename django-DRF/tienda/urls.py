from django.urls import path

from . import views

app_name = 'tienda'

urlpatterns = [
    path('', views.index, name='index'),
    path('producto/<int:producto_id>/', views.producto, name='producto'),
    path('categoria/<str:producto_cat>/', views.listado, name='listado'),
    path('api/productos', views.ProductosView.as_view()),
    path('api/categorias', views.CategoriasView.as_view()),
]