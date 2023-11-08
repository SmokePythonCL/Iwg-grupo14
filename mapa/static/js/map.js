// Variables
var bounds = [[0,0], [1000,1000]];
var basemap = L.imageOverlay('/static/images/CAMPUS-SJ.png', bounds,
            {attribution: "USM SJ"});
var secondfloor = L.imageOverlay('/static/images/testmap2.jpg', bounds,
            {attribution: "USM SJ"});
var thirdfloor = L.imageOverlay('/static/images/testmap.jpg', bounds,
            {attribution: "USM SJ"});
//var fourthfloor = L.imageOverlay('/static/images/', bounds, {attribution: "USM SJ"});
//var fifthfloor = L.imageOverlay('/static/images/', bounds, {attribution: "USM SJ"});

var basemaps = {
    "Primer Piso": basemap,
    "Segundo Piso": secondfloor,
    "Tercer Piso": thirdfloor,
    //"Cuarto Piso": fourthfloor,
    //"Quinto Piso": fifthfloor,
}

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 0,
    maxZoom: 4,
    layers: [basemap],
    attribution: "USM SJ"
});

var layerControl = L.control.layers(basemaps).addTo(map);

var yx = L.latLng;
var xy = function(x, y) {
    if (Array.isArray(x)) {    // When doing xy([x, y]);
        return yx(x[1], x[0]);
    }
    return yx(y, x);  // When doing xy(x, y);
};

var baseIcon = L.Icon.extend({
    options: {
        iconSize:     [50, 100],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
});

var greenLift = new baseIcon({iconUrl: '/static/icons/elevator-solid.svg', 
                            className: "green-elevator"}),

    yellowLift = new baseIcon({iconUrl: '/static/icons/elevator-solid.svg', 
                            className: "yellow-elevator"}),
                            
    redLift = new baseIcon({iconUrl: '/static/icons/elevator-solid.svg', 
                            className: "red-elevator"}),

    greenSlope = new baseIcon({iconUrl: '/static/icons/ramp.svg',
                            className: "green-slope"}),

    yellowSlope = new baseIcon({iconUrl: '/static/icons/ramp.svg',
                            className: "yellow-slope"}),

    redSlope = new baseIcon({iconUrl: '/static/icons/ramp.svg',
                            className: "red-slope"}),

    greenOther = new baseIcon({iconUrl: '/static/icons/ramp.svg', 
                                className: "green-slope"}),

    yellowOther = new baseIcon({iconUrl: '/static/icons/ramp.svg', 
                                className: "yellow-slope"}),

    redOther = new baseIcon({iconUrl: '/static/icons/ramp.svg', 
                                className: "red-slope"});

function onClick(e) {
    alert(this.getLatLng());
}

var coords = JSON.parse(document.querySelector("#map").getAttribute('data-json'));
var coordenadas = []
var punto = null
var estado = null

function loadMarker(coords) {
    for (var tipo in coords) {
        var i = 0;
        while (i < coords[tipo].length) {
            coordenadas = coords[tipo][i];
            punto = xy(coordenadas[0], coordenadas[1]);
            estado = coordenadas[2].concat(tipo);
            
            L.marker(punto, {icon: eval(estado)}).addTo(map).bindPopup(tipo).on('click', onClick)
            i++;}
    }
};

loadMarker(coords);

// Map set
map.setView( [500, 500], 0);
map.setMaxBounds(bounds);
map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
});

/*
function test() {
    console.log("Cambio")
};

map.on('baselayerchange', test());

Reemplazar layerControl por funciones onClick dentro del mapa.
*/