import { Component, OnInit } from "@angular/core";
import { ICategory } from '../categories/category';
import { icon, marker, Map, tileLayer } from "leaflet";
import * as L from 'leaflet';

@Component({
  selector: "app-location-category",
  templateUrl: "./location-category.component.html",
  styleUrls: ["./location-category.component.scss"]
})
export class LocationCategoryComponent implements OnInit, ICategory {
  // Category Data
  title: string = "Análisis Geográfico";
  url: string = "/location";
  description: string = "Lugares mencionados en la noticia";
  icon: string = "place";

  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    detectRetina: true,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  wMaps = tileLayer("http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png", {
    detectRetina: true,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Marker for the parking lot at the base of Mt. Ranier trails
  paradise = marker([40.545953, -3.63597], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: "leaflet/marker-icon.png",
      shadowUrl: "leaflet/marker-shadow.png"
    })
  });

  paradise2 = marker([42.545953, -3.63597], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: "leaflet/marker-icon.png",
      shadowUrl: "leaflet/marker-shadow.png"
    })
  });

  paradise3 = marker([35.545953, -3.63597], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: "leaflet/marker-icon.png",
      shadowUrl: "leaflet/marker-shadow.png"
    })
  });

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      "Street Maps": this.streetMaps,
      "Wikimedia Maps": this.wMaps
    },
    overlays: {
      "Mt. Rainier Paradise Start": this.paradise
    }
  };

  cities = L.layerGroup([this.paradise, this.paradise2, this.paradise3]);

  bounds = new L.LatLngBounds([
    [40.545953, -3.63597],
    [42.545953, -3.63597],
    [35.545953, -3.63597]
  ]);
  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [this.wMaps, this.cities]
  };

  onMapReady(map: Map) {
    map.fitBounds(this.bounds);
  }

  constructor() {}

  ngOnInit() {}
}
