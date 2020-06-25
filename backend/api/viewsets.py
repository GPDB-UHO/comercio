from rest_framework import viewsets, permissions

from .models import Oficoda, Reparto, Bodega, Distribucion, Producto
from .serializers import (
    OficodaSerializer,
    RepartoSerializer,
    BodegaSerializer,
    DistribucionSerializer,
    ProductoSerializer,
)


class OficodaViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Oficoda.objects.all()
    serializer_class = OficodaSerializer
    permission_classes = [permissions.IsAuthenticated]


class RepartoViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Reparto.objects.all()
    serializer_class = RepartoSerializer
    permission_classes = [permissions.IsAuthenticated]


class BodegaViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Bodega.objects.all()
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

