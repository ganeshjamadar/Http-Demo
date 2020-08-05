import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ServerModel } from './ServerModel.modle';
import { Observable, observable } from 'rxjs';

@Injectable()
export class ServerService{
    constructor(private http: HttpClient){
         
    }

    storeServers(servers: ServerModel[]){
        const headers = new HttpHeaders({'content-Type': 'application/json'});
        return this.http.put('https://htts-demo.firebaseio.com/data.json', 
        servers,{headers: headers})
    }

    updateServers(servers: ServerModel[]){
        const headers = new HttpHeaders({'content-Type': 'application/json'});
        return this.http.put('https://htts-demo.firebaseio.com/data.json', 
        servers,{headers: headers})
    }
    getServers(){
        return this.http.get<ServerModel[]>('https://htts-demo.firebaseio.com/data.json')
        .pipe(
            map( 
                (response: ServerModel[]) => {
                    const data= response;
                    for(let server of data)
                    {
                        server.name = 'Feached : ' + server.name
                    }
                    return data;
                }
            ) 
            ,
            catchError(
                (error: HttpErrorResponse) =>
                {
                    throw new Error("Something went Wrong. Please check your request");
                    
                }
            )
            );
    }

    getAppName()
    {
        return this.http.get<ServerModel[]>('https://htts-demo.firebaseio.com/appName.json')
        .pipe(
            map(
                (response: any) => {
                    const data= response;
                    return data;
                }
            )
        );
    }
}