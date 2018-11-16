var myMap;

ymaps.ready(init);

function init () {
    myMap = new ymaps.Map('map', {
        // Санкт-Петербург
        center: [50.57862508, 36.585391],
        zoom: 13
    }, {
        searchControlProvider: 'yandex#search'
    });

    myMap.behaviors
     
        .enable('ruler');
}