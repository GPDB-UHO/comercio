from django.db import models
from django.contrib.postgres.fields import JSONField


class Oficoda(models.Model):
    nombre = models.CharField(max_length=255)
    reparto = models.OneToOneField("Reparto", on_delete=models.CASCADE)

    def __str__(self):
        return "{} - {}".format(self.reparto.nombre, self.nombre)


class Reparto(models.Model):
    nombre = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre


class Bodega(models.Model):
    unidad = models.CharField(max_length=32)
    nombre = models.CharField(max_length=120)
    n_1_6 = models.IntegerField()
    n_7_30 = models.IntegerField()
    details = JSONField(default=dict, blank=True)
    oficoda = models.ForeignKey("Oficoda", on_delete=models.CASCADE)

    def __str__(self):
        return "{} - {}".format(self.unidad, self.nombre)


class Distribucion(models.Model):
    cantidad = models.IntegerField()
    fecha = models.DateField()
    fecha_creacion = models.DateField(auto_now=True)
    producto = models.ForeignKey("Producto", on_delete=models.CASCADE)
    bodegas = models.ManyToManyField("Bodega")

    def __str__(self):
        return "{} - {} - {}".format(self.producto.nombre, self.cantidad, self.fecha)


class Producto(models.Model):
    nombre = models.CharField(max_length=255)
    notas = models.TextField()

    def __str__(self):
        return self.nombre

