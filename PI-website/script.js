const map = L.map('map').setView([-24.4975, -47.8445], 15); // Região de Registro-SP

    // Mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const control = L.Routing.control({
  waypoints: [],
  routeWhileDragging: true,
  addWaypoints: true,
  createMarker: function(i, wp, nWps) {
    return L.marker(wp.latLng, {
      draggable: true
    }).on('contextmenu', function() { // botão direito do mouse
      const waypoints = control.getWaypoints().map(w => w.latLng);
      waypoints.splice(i, 1); // remove o ponto selecionado
      control.setWaypoints(waypoints);
    });
  }
}).addTo(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

    control.setWaypoints([
          L.latLng(lat, lng), // Ponto inicial = usuário
          L.latLng(-24.497639, -47.842611) // Etec Registro (exemplo de destino)
        ]);

        map.setView([lat, lng], 15);
      }, () => {
        alert("Não foi possível obter sua localização.");
      });
    }

    // Permitir adicionar pontos ao clicar no mapa
    map.on('click', e => {
      const waypoints = control.getWaypoints().map(wp => wp.latLng).filter(Boolean);
      waypoints.push(e.latlng);
      control.setWaypoints(waypoints);
    });