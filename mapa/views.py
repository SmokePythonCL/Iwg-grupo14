from django.shortcuts import render

from django.http import HttpResponseRedirect
from .forms import CoordsForm
from .models import CoordsModel

# Create your views here.

def map(request):
    return render(request, 'mapa/map.html')

def thanks(request):
    return render(request, 'mapa/thanks.html')

def submit(request):

    if request.method == "POST":
        form = CoordsForm(request.POST)

        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/thanks/")
        
    else:
        form = CoordsForm()

    return render(request, 'mapa/submit_form.html', {"form": form})

def coords_show(request):
    coords = CoordsModel.objects.all()
    ascensor = []
    rampa = []

    for item in coords:
        coord_type = item.point_type
        coord = item.coords

        if coord_type == "1":
            ascensor.append(coord)
        
        elif coord_type == "2":
            rampa.append(coord)

    return render(request, 'mapa/coords_list.html', {"ascensor": ascensor, "rampa": rampa})

