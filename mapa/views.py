from django.shortcuts import render

from django.http import HttpResponseRedirect
from .forms import CoordsForm

# Create your views here.

def map(request):
    return render(request, 'mapa/map.html')

def submit(request):

    if request.method == "POST":
        form = CoordsForm(request.POST)

        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/thanks/")
        
    else:
        form = CoordsForm()

    return render(request, 'mapa/submit_form.html', {"form": form})

def thanks(request):
    return render(request, 'mapa/thanks.html')