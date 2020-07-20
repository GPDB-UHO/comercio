from rest_framework import serializers
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenVerifySerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Oficoda, Reparto, Bodega, Distribucion, Producto


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        data["user"] = {"username": self.user.username}
        return data


class MyTokenVerifySerializer(TokenVerifySerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        return data


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
