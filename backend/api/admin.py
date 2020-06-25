from django.contrib import admin
from .models import Oficoda, Reparto, Bodega, Distribucion, Producto

admin.site.register(Oficoda)
admin.site.register(Reparto)
admin.site.register(Bodega)
admin.site.register(Distribucion)
admin.site.register(Producto)
