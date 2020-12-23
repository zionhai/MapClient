import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { environment } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Site } from 'src/app/models/Site';
import { Subscription } from 'rxjs';
import { SiteService } from './site.service';
import { Api } from 'src/app/shared/api';

export interface MarkerInfo {
  marker: any;
  deviceId: any;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 31.809415;
  lng = 35.108851;

  sites: Site[];
  markers:MarkerInfo[] = []
  subscription: Subscription;

  constructor(private api:Api, private siteService:SiteService, private toastr:ToastrService) { }
  ngOnInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 9,
        center: [this.lng, this.lat],
        
    });
    // Add map controls
    this.map.addControl(new mapboxgl.FullscreenControl());

    this.subscription = this.siteService.sitesChanged.subscribe(
      (sites: Site[]) => {
        this.sites = sites;
        this.sites.forEach((site) => {
          
          var marker = new mapboxgl.Marker({
            draggable: true,
          })
            .setLngLat([site.longitude, site.latitude])
            .addTo(this.map);
          const deviceId = site.id
          this.markers.push({marker, deviceId});
        })      
      }
    )
    this.getSites()
  }

  getSites(){
    this.api.getSites();
    this.sites = this.siteService.getSites();
    
    setInterval(() => {
      this.api.getLastSample();
      var sample = this.siteService.getSample();
      if (sample){
        var message = "Device: " + sample.deviceId + " " + sample.sampleDate + "\n";
        this.toastr.success(message, "Last Sample", {
          timeOut:3000,
          easeTime:2000,
          positionClass:'toast-bottom-right'
        });
        sample.samples.forEach(s => message += s.displayName + " " + s.value + s.units + "\n");
        this.markers.forEach(m => {
          if (m.deviceId === sample.deviceId)
          {
            this.sites.forEach(s => {
              if (s.id === m.deviceId){
                this.map.flyTo({
                  center: [s.latitude,
                           s.longitude],
                    essential:true
                })
              }
            })
            
          }
        })
      }
    
    }, 10000)
  }
}