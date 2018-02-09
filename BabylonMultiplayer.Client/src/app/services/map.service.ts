import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient } from "@angular/common/http";

import { Map } from '../entities/app.entities.map';

@Injectable()
export class MapService {

    private apiUrl = 'http://localhost:9000/api/maps';

    constructor(private http: HttpClient) { }

    getMaps(): Promise<Array<Map>> {
        return this.http
            .get(this.apiUrl)
            .toPromise()
            .then((response) => {
                return response as Map[];
            })
            .catch(this.handleError);
    }

    getMap(name: string): Promise<Map> {
        return this.http
            .get(`${this.apiUrl}/${name}`)
            .toPromise()
            .then((response) => {
                return response as Map;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}