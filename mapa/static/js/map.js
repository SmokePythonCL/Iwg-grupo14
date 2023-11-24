// Variables
var bounds = [[0, 0], [1000, 1000]];
var basemap = L.imageOverlay('/static/images/CAMPUS-SJ.png', bounds,
    { attribution: "USM SJ" });
var secondfloor = L.imageOverlay('/static/images/testmap2.jpg', bounds,
    { attribution: "USM SJ" });
var thirdfloor = L.imageOverlay('/static/images/testmap.jpg', bounds,
    { attribution: "USM SJ" });
//var fourthfloor = L.imageOverlay('/static/images/', bounds, {attribution: "USM SJ"});
//var fifthfloor = L.imageOverlay('/static/images/', bounds, {attribution: "USM SJ"});

var basemaps = {
    "Primer Piso": basemap,
    "Segundo Piso": secondfloor,
    "Tercer Piso": thirdfloor,
    //"Cuarto Piso": fourthfloor,
    //"Quinto Piso": fifthfloor,
};

var firstMarkers = L.layerGroup();
var secondMarkers = L.layerGroup();
var thirdMarkers = L.layerGroup();
//var fourthMarkers = L.layerGroup();
//var fifthMarkers = L.layerGroup();

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 0,
    maxZoom: 4,
    layers: [basemap],
    attribution: "USM SJ"
});

var yx = L.latLng;
var xy = function (x, y) {
    if (Array.isArray(x)) {    // When doing xy([x, y]);
        return yx(x[1], x[0]);
    }
    return yx(y, x);  // When doing xy(x, y);
};

var baseIcon = L.Icon.extend({
    options: {
        iconSize: [50, 100],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }
});

var greenLift = new baseIcon({
    iconUrl: '/static/icons/elevator-solid.svg',
    className: "green-elevator"
}),

    yellowLift = new baseIcon({
        iconUrl: '/static/icons/elevator-solid.svg',
        className: "yellow-elevator"
    }),

    redLift = new baseIcon({
        iconUrl: '/static/icons/elevator-solid.svg',
        className: "red-elevator"
    }),

    greenSlope = new baseIcon({
        iconUrl: '/static/icons/ramp.svg',
        className: "green-slope"
    }),

    yellowSlope = new baseIcon({
        iconUrl: '/static/icons/ramp.svg',
        className: "yellow-slope"
    }),

    redSlope = new baseIcon({
        iconUrl: '/static/icons/ramp.svg',
        className: "red-slope"
    }),

    greenOther = new baseIcon({
        iconUrl: '/static/icons/ramp.svg',
        className: "green-slope"
    }),

    yellowOther = new baseIcon({
        iconUrl: '/static/icons/ramp.svg',
        className: "yellow-slope"
    }),

    redOther = new baseIcon({
        iconUrl: '/static/icons/ramp.svg',
        className: "red-slope"
    });


function Point_click(point_id, status, point_type) {
    for (var item in coords) {
        for (var data in coords[item]) {
            if (coords[item][data][4] === point_id) {

                var coord_x = coords[item][data][0]
                var coord_y = coords[item][data][1]
                var capa_punto = coords[item][data][3]


                var coords_send = {
                    point_id,
                    status,
                    coord_x,
                    coord_y,
                    capa_punto,
                    point_type
                };
            };
        }
    };

    fetch("/status/", {
        method: "POST",
        body: JSON.stringify(coords_send),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    setTimeout(function () {
        location.reload();
    }, 100);
};

function customPopup(point_id, point_type) {
    var customPopup = ` <div class='popup-txt'>
                        ¿En que estado se encuentra el punto?
                    </div>
                    <div class='popup-btn'>
                        <button class="vote-button" type='submit' id='available' onclick="Point_click(${point_id}, id, '${point_type}');">Habilitado</button>
                        <button class="vote-button" type='submit' id='disabled' onclick="Point_click(${point_id}, id, '${point_type}');">Deshabilitado</button>
                    </div>`;
    return customPopup;
};

var coords = JSON.parse(document.querySelector("#map").getAttribute('data-json'));
var coordenadas = [];
var punto = null;
var estado = null;
var capa = null;

var customOptions =
{
    'maxWidth': '400',
    'width': '200',
    'className': 'popupCustom'
}

for (var tipo in coords) {
    coordenadas = coords[tipo][0];
    punto = xy(coordenadas[0], coordenadas[1]);
    estado = coordenadas[2].concat(tipo);
    capa = coordenadas[3];
    id = coordenadas[4];

    var marker = L.marker(punto, { icon: eval(estado), customOption: capa }).bindPopup(customPopup(id, tipo), customOptions);

    if (capa === "0") {
        firstMarkers.addLayer(marker);
    } else if (capa === "1") {
        secondMarkers.addLayer(marker);
    } else if (capa === "2") {
        thirdMarkers.addLayer(marker);
    } /*else if (capa === "3"){
        fourthMarkers.addLayer(marker);
    } else if (capa === "4"){
        fifthMarkers.addLayer(marker);
    }*/
}
//Add only first layer markers since it's the default layer
firstMarkers.addTo(map);
var layerControl = L.control.layers(basemaps).addTo(map);

// Map set
map.setView([500, 500], 0);
map.setMaxBounds(bounds);
map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
});


map.on('baselayerchange', function (event) {
    // Clear all layers from the map
    map.eachLayer(function (layer) {
        if (layer instanceof L.LayerGroup) {
            map.removeLayer(layer);
        }
    });

    // Show the selected layer group
    if (event.name === "Primer Piso") {
        firstMarkers.addTo(map);
    } else if (event.name === "Segundo Piso") {
        secondMarkers.addTo(map);
    } else if (event.name === "Tercer Piso") {
        thirdMarkers.addTo(map);
    } /*else if (event.name === "Cuarto Piso"){
        fourthMarkers.addTo(map);
    } else if (event.name === "Quinto Piso"){
        fifthMarkers.addTo(map);
    }*/
});