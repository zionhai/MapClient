import { Subject } from 'rxjs';
import { Sample } from 'src/app/models/Sample';
import { Site } from 'src/app/models/Site';
import { Injectable } from "@angular/core";

@Injectable()
export class SiteService
{
    private sites: Site[] = [];
    sitesChanged = new Subject<Site[]>();

    private sample:Sample;
    sampleChanged = new Subject<Sample>();

    setSites(sites: Site[]) {
        this.sites = sites;
        this.sitesChanged.next(this.sites.slice())
    }

    getSites(){
        return this.sites;
    }

    setSample(sample:Sample){
        this.sample = sample;
        this.sampleChanged.next(this.sample);       
    }

    getSample(){
        return this.sample;
    }
}