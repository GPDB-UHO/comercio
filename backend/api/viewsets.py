from django.db.models import Prefetch
from rest_framework import viewsets, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView

from .models import Oficoda, Reparto, Bodega, Distribucion, Producto
from .serializers import (
    MyTokenObtainPairSerializer,
    MyTokenVerifySerializer,
    OficodaSerializer,
    RepartoSerializer,
    BodegaSerializer,
    DistribucionSerializer,
    ProductoSerializer,
)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MyTokenVerifyView(TokenVerifyView):
    serializer_class = MyTokenVerifySerializer


class OficodaViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Oficoda.objects.all()
    serializer_class = OficodaSerializer
    permission_classes = [permissions.IsAuthenticated]


class RepartoViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Reparto.objects.all()
    serializer_class = RepartoSerializer
    permission_classes = [permissions.IsAuthenticated]


class BodegaPagination(PageNumberPagination):
    page_size = 999999


class BodegaViewset(viewsets.ReadOnlyModelViewSet):
    pagination_class = BodegaPagination
    queryset = Bodega.objects.all().prefetch_related(
        Prefetch("distribuciones", queryset=Distribucion.objects.order_by("fecha"))
    )
    serializer_class = BodegaSerializer
    permission_classes = [permissions.IsAuthenticated]


class DistribucionViewset(viewsets.ModelViewSet):
    queryset = Distribucion.objects.all()
    serializer_class = DistribucionSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductoViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated]
