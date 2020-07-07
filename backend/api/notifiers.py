from django.db.models.signals import m2m_changed

from .models import Distribucion


def cambiadas_distrubuciones(sender, instance, action, **kwargs):
    if action not in ["post_add", "post_remove"]:
        return

    instance.repartido = 0
    for bodega in instance.bodegas.all():
        instance.repartido += bodega.conteo_productos
    instance.sobrante = instance.cantidad - instance.repartido
    instance.save()


m2m_changed.connect(cambiadas_distrubuciones, sender=Distribucion.bodegas.through)
