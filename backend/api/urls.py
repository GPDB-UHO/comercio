from django.urls import include, path

from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    GraficaDiasSinProductoView,
    GraficaDiasSinProductoBodegaView,
    GraficaCantidadProductoView,
)
from .viewsets import (
    MyTokenObtainPairView,
    MyTokenVerifyView,
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

app_name = "api"
urlpatterns = [
    path("", include(router.urls)),
    path(
        "graficas/",
        include(
            [
                path(
                    "dias-sin-producto/<int:producto>",
                    GraficaDiasSinProductoView.as_view(),
                    name="grafica-dias-sin-producto",
                ),
                path(
                    "dias-sin-producto-bodega/<int:producto>/<int:oficoda>",
                    GraficaDiasSinProductoBodegaView.as_view(),
                    name="grafica-dias-sin-producto-bodega",
                ),
                path(
                    "cantidad-producto/<int:producto>/<int:dias>",
                    GraficaCantidadProductoView.as_view(),
                    name="grafica-cantidad-producto",
                ),
            ],
        ),
    ),
    path("token/", MyTokenObtainPairView.as_view(), name="token-obtain"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("token/verify/", MyTokenVerifyView.as_view(), name="token-verify"),
]
