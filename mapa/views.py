from django.shortcuts import render
from .models import CoordsModel
import json

# Create your views here.

def map(request):
    return render(request, 'mapa/map.html')

def index(request):
    return render(request, 'mapa/index.html')

def route(request):
    return render(request, 'mapa/route.html')

def status(request):
    points = CoordsModel.objects.all()
    coords_dicts = {"Lift": [],
                    "Slope": [],
                    "Other": []}

    for item in points:
        if item.point_type == "0":
            coord_type = "Lift"
        elif item.point_type == "1":
            coord_type = "Slope"
        else:
            coord_type = "Other"

        if item.status == "0":
            status = "green"
        elif item.status == "1":
            status = "yellow"
        else:
            status = "red"
        
        coord_x = item.coord_x
        coord_y = item.coord_y
        layer = item.layer
        layer= layer.lower()

        coords_dicts[coord_type].append([coord_x, coord_y, status, layer])

    coords_json = json.dumps(coords_dicts)
    
    return render(request, 'mapa/status.html', {"coords": coords_json})