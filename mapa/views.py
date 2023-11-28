from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect, render
from .models import CoordsModel
import json

# Create your views here.

def map(request):
    return render(request, 'mapa/map.html')

def index(request):
    return render(request, 'mapa/index.html')

def route(request):
    return render(request, 'mapa/route.html')

#Manage the type of request and save or send the info
@csrf_exempt
def status(request):
    if request.method == "POST":
        coords = json.loads(request.body)
        
        if coords["status"] == "available":
            status = 0
        	
        elif coords["status"] == "caution":
            status = 1
            
        elif coords["status"] == "disabled":
            status = 2

        if "Lift" in coords["point_type"]:
            tipo = 0

        elif "Slope" in coords["point_type"]:
            tipo = 1

        elif "Other" in coords["point_type"]:
            tipo = 2

        coord = CoordsModel(id=coords["point_id"], 
                            status=status,
                            coord_x = coords["coord_x"],
                            coord_y = coords["coord_y"],
                            layer = coords["capa_punto"],
                            point_type = tipo)
        coord.save()
    
    else:
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
            point_id = item.id

            coords_dicts[coord_type].append([coord_x, coord_y, status, layer, point_id])

        coords_json = json.dumps(coords_dicts)
    
        return render(request, 'mapa/status.html', {"coords": coords_json})