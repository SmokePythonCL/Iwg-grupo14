from django.shortcuts import render

# Create your views here.

def map(request):
    return render(request, 'mapa/map.html')

def index(request):
    return render(request, 'mapa/index.html')

def status(request):
    return render(request, 'mapa/status.html')

def route(request):
    return render(request, 'mapa/route.html')