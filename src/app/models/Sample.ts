export class Sample
{
    deviceId:number;
    sampleDate:Date;
    samples: SampleUnit[];
    
}

export class SampleUnit
{
    displayName:string;
    value: string;
    units: string;
}