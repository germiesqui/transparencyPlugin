import { Component, AfterViewInit } from "@angular/core";
import { ICategory } from '../categories/category';
import { icon, marker, tileLayer } from "leaflet";
import * as L from 'leaflet';
import { BackendService } from 'src/app/backend.service';
import { ILocation } from './location';


@Component({
  selector: "app-location-category",
  templateUrl: "./location-category.component.html",
  styleUrls: ["./location-category.component.scss"]
})
export class LocationCategoryComponent implements AfterViewInit, ICategory {
  // Category Data
  title: string = "Análisis Geográfico";
  url: string = "/location";
  description: string = "Lugares mencionados en la noticia";
  icon: string = "place";

  locations: ILocation;

  private map;
  loading: boolean;
  loadingText: string = 'Estamos procesando el texto, por favor espere un momento';

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)

  constructor(private backendService: BackendService) {
    this.loading = true;
    this.backendService.getLocations().subscribe(
      data => {
        this.locations = data;
        this.addMarkers();
        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  addMarkers() {
    let arrayOfLatLng = [];
    this.locations.locations.forEach(location => {
      arrayOfLatLng.push([location.latitude, location.longitude]);
      let mark = marker([location.latitude, location.longitude], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: "leaflet/marker-icon.png",
          shadowUrl: "leaflet/marker-shadow.png"
        })
      }).bindPopup(location.address);
      mark.addTo(this.map);
    });
    this.map.fitBounds(new L.LatLngBounds(arrayOfLatLng), {padding: [40,40]});
  }

  ngAfterViewInit() {
    this.map = L.map("map", {
      center: [46.879966, -121.726909],
      zoom: 12
    });

    let streetMaps = tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        detectRetina: true,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(this.map);
    // Layers control object with our two base layers and the three overlay layers

    let baseMaps = {
      'Street Maps': streetMaps
    }
    L.control.layers(baseMaps).addTo(this.map);
  }
}
