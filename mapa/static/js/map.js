var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 0,
    maxZoom: 4
});

var bounds = [[0,0], [1000,1000]];
var image = L.imageOverlay('/static/images/CAMPUS-SJ.png', bounds).addTo(map);
map.setView( [500, 500], 0);

var yx = L.latLng;
var xy = function(x, y) {
    if (Array.isArray(x)) {    // When doing xy([x, y]);
        return yx(x[1], x[0]);
    }
    return yx(y, x);  // When doing xy(x, y);
};

var liftIcon = L.Icon.extend({
    options: {
        iconUrl: '/static/icons/elevator-solid.svg',
        iconSize:     [38, 95],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
});

var greenLift = new liftIcon({className: "green-elevator"}),
    yellowLift = new liftIcon({className: "yellow-elevator"}),
    redLift = new liftIcon({className: "red-elevator"});

var rampIcon = L.Icon.extend({
    options: {
        iconUrl: '/static/icons/ramp.svg',
        iconSize:     [38, 95],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
});

var greenSlope = new rampIcon({className: "green-slope"}),
    yellowSlope = new rampIcon({className: "yellow-slope"}),
    redSlope = new rampIcon({className: "red-slope"});

var otherIcon = L.Icon.extend({
    options: {
        iconUrl: '/static/icons/ramp.svg',
        iconSize:     [50, 100],
        iconAnchor:   [50, 100],
        popupAnchor:  [50, 100]
    }
});

var greenOther = new otherIcon({className: "green-slope"}),
    yellowOther = new otherIcon({className: "yellow-slope"}),
    redOther = new otherIcon({className: "red-slope"});

var coords = JSON.parse(document.querySelector("#map").getAttribute('data-json'));
var coordenadas = []
var punto = null
var estado = null

for (var tipo in coords) {
    coordenadas = coords[tipo][0];
    punto = xy(coordenadas[0], coordenadas[1]);
    estado = coordenadas[2].concat(tipo); // Por alguna razón hacer que varíe no funciona.
    console.log(estado)
    L.marker(punto, {icon: redSlope}).addTo(map).bindPopup(tipo);
}
