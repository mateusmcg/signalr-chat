'use strict';

app.controller('MapsController', [function () {
    var vm = this;

    vm.map = null;

    var signalRServerUrl = 'http://localhost:50778/signalr'
    //var connection = $.connection.url(signalRServerUrl);
    $.connection.hub.url = signalRServerUrl;
    var mapHub = $.connection.mapHub;

    mapHub.client.addClientToMap = function (client) {
        console.debug('ShowClientOnMap', client);
        var pinsCount = getPushPinsCount();
        $("#userCounter").html(pinsCount + 1);
        addClient(client);
    };

    mapHub.client.removeClientFromMap = function (client) {
        console.debug('RemoveClientOnMap', client);
    };

    $.connection.hub.start(function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            initMap(position);

            var coords = position.coords;
            var message = { 'ClientID': 'W', 'ClientLocation': { latitude: coords.latitude, longitude: coords.longitude } };
            mapHub.server.showClientOnMap(message);
        });
    });

    function getPushPinsCount() {
        return vm.map.entities.getLength();
    }

    function addClient(client) {
        var location = new Microsoft.Maps.Location(client.ClientLocation.Latitude, client.ClientLocation.Longitude);
        var pushPin = new Microsoft.Maps.Pushpin(location, { text: client.ClientId });
        vm.map.entities.push(pushPin);

        vm.map.setView({
            center: new Microsoft.Maps.Location(client.ClientLocation.Latitude, client.ClientLocation.Longitude),
            zoom: 1
        });
    }

    function initMap(position) {
        var mapOptions = {
            credentials: 'CWhS8kCOZJP1IzmIQSpO~Ayq4YZHx8OHYq5mq2UL_hA~Anrj_x_uviRKJg--ASe7MI4cC567x_8fG7RkC1iEarASfllR2jj5PR08umKOgG_7',
            center: new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude)
        }
        vm.map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);
    }
}]);