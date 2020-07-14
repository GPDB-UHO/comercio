from datetime import timedelta

from django.db.models import F, Value, DateField
from django.utils import timezone
from rest_framework import permissions, views
from rest_framework.response import Response

from .models import Oficoda, Reparto, Bodega, Distribucion, Producto


class GraficaDiasSinProductoOficodaView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, producto):
        data = []
        now = timezone.now()
        for oficoda in Oficoda.objects.all():
            ultima_distribucion = (
                Distribucion.objects.filter(bodegas__oficoda=oficoda, producto=producto)
                .annotate(
                    dias_ultima_distribucion=Value(now, output_field=DateField())
                    - F("fecha")
                )
                .order_by("-fecha")
                .first()
            )
            data.append(
                {
                    "id": oficoda.id,
                    "nombre": oficoda.nombre,
                    "reparto": oficoda.reparto.nombre,
                    "fecha_ultima_distribucion": ultima_distribucion.fecha
                    if ultima_distribucion
                    else None,
                    "dias_ultima_distribucion": ultima_distribucion.dias_ultima_distribucion.days
                    if ultima_distribucion
                    else None,
                }
            )
        return Response(data)


class GraficaDiasSinProductoBodegaView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, producto, oficoda):
        data = []
        now = timezone.now()
        for bodega in Bodega.objects.filter(oficoda=oficoda):
            ultima_distribucion = (
                Distribucion.objects.filter(bodegas=bodega, producto=producto)
                .annotate(
                    dias_ultima_distribucion=Value(now, output_field=DateField())
                    - F("fecha")
                )
                .order_by("-fecha")
                .first()
            )
            data.append(
                {
                    "id": bodega.id,
                    "unidad": bodega.nombre,
                    "nombre": bodega.nombre,
                    "oficoda": bodega.oficoda.nombre,
                    "reparto": bodega.oficoda.reparto.nombre,
                    "fecha_ultima_distribucion": ultima_distribucion.fecha
                    if ultima_distribucion
                    else None,
                    "dias_ultima_distribucion": ultima_distribucion.dias_ultima_distribucion.days
                    if ultima_distribucion
                    else None,
                }
            )
        return Response(data)


class GraficaCantidadProductoView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, producto, dias):
        data = []
        now = timezone.now()
        for oficoda in Oficoda.objects.all():
            data.append(
                {
                    "id": oficoda.id,
                    "nombre": oficoda.nombre,
                    "reparto": oficoda.reparto.nombre,
                    "total": sum(
                        [bodega.conteo_productos for bodega in oficoda.bodegas.all()]
                    ),
                    "repartido": sum(
                        [
                            bodega.conteo_productos
                            for bodega in Bodega.objects.filter(
                                oficoda=oficoda,
                                distribuciones__producto=producto,
                                distribuciones__fecha__gte=Value(
                                    now - timedelta(days=dias)
                                ),
                            )
                        ]
                    ),
                }
            )
        return Response(data)
