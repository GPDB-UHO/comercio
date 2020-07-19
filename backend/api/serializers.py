from rest_framework import serializers

from .models import Oficoda, Reparto, Bodega, Distribucion, Producto


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = [
            "id",
            "nombre",
            "notas",
        ]


class BodegaSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bodega
        fields = [
            "id",
            "nombre",
            "unidad",
            "n_1_6",
            "n_7_30",
            "conteo_productos",
            "oficoda",
        ]


class DistribucionSimpleSerializer(serializers.ModelSerializer):
    producto_detalles = ProductoSerializer(source="producto", read_only=True)

    class Meta:
        model = Distribucion
        fields = [
            "id",
            "cantidad",
            "repartido",
            "sobrante",
            "fecha",
            "fecha_creacion",
            "producto",
            "producto_detalles",
        ]


class BodegaSerializer(BodegaSimpleSerializer):
    distribuciones_detalles = DistribucionSimpleSerializer(
        source="distribuciones", many=True, read_only=True
    )

    class Meta:
        model = Bodega
        fields = BodegaSimpleSerializer.Meta.fields + [
            "distribuciones",
            "distribuciones_detalles",
        ]


class DistribucionSerializer(DistribucionSimpleSerializer):
    bodegas_detalles = BodegaSimpleSerializer(
        source="bodegas", many=True, read_only=True
    )

    class Meta:
        model = Distribucion
        fields = DistribucionSimpleSerializer.Meta.fields + [
            "bodegas",
            "bodegas_detalles",
        ]


class RepartoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reparto
        fields = ["id", "nombre"]


class OficodaSerializer(serializers.ModelSerializer):
    reparto = RepartoSerializer(read_only=True)
    bodegas = BodegaSerializer(many=True, read_only=True)

    class Meta:
        model = Oficoda
        fields = ["id", "nombre", "reparto", "bodegas"]
