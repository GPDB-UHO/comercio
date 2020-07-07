from rest_framework import serializers

from .models import Oficoda, Reparto, Bodega, Distribucion, Producto


class OficodaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Oficoda
        fields = ["id", "nombre", "reparto"]


class RepartoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reparto
        fields = ["id", "nombre"]


class BodegaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bodega
        fields = [
            "id",
            "nombre",
            "unidad",
            "n_1_6",
            "n_7_30",
            "details",
            "oficoda",
        ]


class DistribucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distribucion
        fields = [
            "id",
            "cantidad",
            "fecha",
            "fecha_creacion",
            "producto",
            "bodegas",
        ]


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = [
            "id",
            "nombre",
            "notas",
        ]

