from django.urls import include, path

from rest_framework import routers

from .viewsets import (
    OficodaViewset,
    RepartoViewset,
    BodegaViewset,
    DistribucionViewset,
    ProductoViewset,
)

router = routers.DefaultRouter()
router.register(r"oficoda", OficodaViewset)
router.register(r"reparto", RepartoViewset)
router.register(r"bodega", BodegaViewset)
router.register(r"distribucion", DistribucionViewset)
router.register(r"producto", ProductoViewset)

app_name = 'api'
urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
]
