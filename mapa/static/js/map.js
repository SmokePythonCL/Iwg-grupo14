var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 0,
    maxZoom: 4
});

var bounds = [[0,0], [1000,1000]];
var image = L.imageOverlay('/static/images/CAMPUS-SJ.png', bounds).addTo(map);
map.setView( [500, 500], 0);
map.setMaxBounds(bounds);
map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
});


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
                            className: "red-elevator"});

var greenSlope = new baseIcon({iconUrl: '/static/icons/ramp.svg',
                            className: "green-slope"}),
    yellowSlope = new baseIcon({iconUrl: '/static/icons/ramp.svg',
                            className: "yellow-slope"}),
    redSlope = new baseIcon({iconUrl: '/static/icons/ramp.svg',
                            className: "red-slope"});

var greenOther = new baseIcon({iconUrl: '/static/icons/ramp.svg', 
                                className: "green-slope"}),
    yellowOther = new baseIcon({iconUrl: '/static/icons/ramp.svg', 
                                className: "yellow-slope"}),
    redOther = new baseIcon({iconUrl: '/static/icons/ramp.svg', 
                                className: "red-slope"});

var coords = JSON.parse(document.querySelector("#map").getAttribute('data-json'));
var coordenadas = []
var punto = null
var estado = null

for (var tipo in coords) {
    coordenadas = coords[tipo][0];
    punto = xy(coordenadas[0], coordenadas[1]);
    estado = coordenadas[2].concat(tipo); // Por alguna razón hacer que varíe no funciona.
    console.log(estado);

    if (estado === "greenSlope") {
        L.marker(punto, {icon: greenSlope}).addTo(map).bindPopup(tipo);
    } else if (estado === "yellowSlope") {
        L.marker(punto, {icon: yellowSlope}).addTo(map).bindPopup(tipo);
    } else if (estado === "redSlope") {
        L.marker(punto, {icon: redSlope}).addTo(map).bindPopup(tipo);
    } else if (estado === "greenLift") {
        L.marker(punto, {icon: greenLift}).addTo(map).bindPopup(tipo);
    } else if (estado === "yellowLift") {
        L.marker(punto, {icon: yellowLift}).addTo(map).bindPopup(tipo);
    } else if (estado === "redLift") {
        L.marker(punto, {icon: redLift}).addTo(map).bindPopup(tipo);
    } else if (estado === "greenOther") {
        L.marker(punto, {icon: greenOther}).addTo(map).bindPopup(tipo);
    } else if (estado === "yellowOther") {
        L.marker(punto, {icon: yellowOther}).addTo(map).bindPopup(tipo);
    } else if (estado === "redOther") {
        L.marker(punto, {icon: redOther}).addTo(map).bindPopup(tipo);
    }
}