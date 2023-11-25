from django.contrib import admin
from .models import CoordsModel
from .forms import CoordsForm

# Register your models here.

class Coords(admin.ModelAdmin):
    form = CoordsForm

admin.site.register(CoordsModel, Coords)