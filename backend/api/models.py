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
    extra = JSONField(default=dict, blank=True)
    oficoda = models.ForeignKey(
        "Oficoda", on_delete=models.CASCADE, related_name="bodegas"
    )

    def __str__(self):
        return "{} - {}".format(self.unidad, self.nombre)

    @property
    def conteo_productos(self):
        # 2 productos para las mayores que 6
        return self.n_1_6 * 1 + self.n_7_30 * 2


class Distribucion(models.Model):
    cantidad = models.PositiveIntegerField()

    repartido = models.PositiveIntegerField()
    sobrante = models.PositiveIntegerField()

    fecha = models.DateField()
    fecha_creacion = models.DateTimeField(auto_now=True)
    producto = models.ForeignKey(
        "Producto", on_delete=models.CASCADE, related_name="productos"
    )
    bodegas = models.ManyToManyField("Bodega", related_name="distribuciones")

    def __str__(self):
        return "{} - {} - {}".format(self.producto.nombre, self.cantidad, self.fecha)

    class Meta:
        ordering = ["-pk"]

class Producto(models.Model):
    nombre = models.CharField(max_length=255)
    notas = models.TextField(blank=True)

    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ["-pk"]
