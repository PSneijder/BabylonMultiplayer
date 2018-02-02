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
}