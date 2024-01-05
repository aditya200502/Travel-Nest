
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: place.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});


const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(place.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h3>${place.title}</h3>
            <p>Exact location will be provided after booking</p>`
        )
    )
    .addTo(map);