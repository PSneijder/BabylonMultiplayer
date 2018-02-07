import { SignalRConnection } from "ngx-signalr/src/services/connection/signalr.connection";

import { SceneManager } from "../managers/app.scene.manager";

export interface IPlayer {
    id: string;
    position: BABYLON.Vector3;
    color: BABYLON.Color3;
}

export class Player implements IPlayer {
    id: string;
    position: BABYLON.Vector3;
    color: BABYLON.Color3;

    constructor(id: string = "") {
        this.id = id;
        this.position = new BABYLON.Vector3(0, 0, 0);
        this.color = new BABYLON.Color3(0, 0, 0);
    }
}