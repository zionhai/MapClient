import { AuthService } from './../auth/auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Site } from '../models/Site';
import { SiteService } from '../map/map/site.service';
import { Sample } from '../models/Sample';

const GET_SITES_PATH = '/site';
const GET_LAST_SAMPLE_PATH = '/site/last_sample'

@Injectable()
export class Api
{
    private apiUrl = environment.apiUrl;
    constructor(private http:HttpClient, private authService:AuthService, private siteService:SiteService){}

    getSites(){
        var token = this.authService.getJwtToken();
        if (!token) return;

        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
        this.http.get(this.apiUrl + GET_SITES_PATH, {headers:headers}, ).subscribe(
            data => {
                const sites: Site[] = data as Site[];
                sites.forEach(s => {
                    console.log('zion', s)
                })
                this.siteService.setSites(sites);
            }
        )
        
    }

    getLastSample(){
        var token = this.authService.getJwtToken();
        if (!token) return;

        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
        this.http.get(this.apiUrl + GET_LAST_SAMPLE_PATH, {headers:headers}, ).subscribe(
            data => {
                const sample: Sample = data as Sample;
                
                this.siteService.setSample(sample);
            }
        )
        
    }
}