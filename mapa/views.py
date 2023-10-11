from django.shortcuts import render
from .models import CoordsModel

# Create your views here.

def map(request):
    return render(request, 'mapa/map.html')

def index(request):
    return render(request, 'mapa/index.html')

def route(request):
    return render(request, 'mapa/route.html')

def status(request):
    points = CoordsModel.objects.all()
    ascensor = []
    rampa = []

    for item in points:
        coord_type = item.point_type
        coord = item.coords

        if coord_type == "0":
            ascensor.append(coord)
        
        elif coord_type == "1":
            rampa.append(coord)

    return render(request, 'mapa/status.html', {"ascensor": ascensor, "rampa": rampa})