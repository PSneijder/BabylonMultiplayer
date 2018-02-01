import { SignalRConnection } from "ngx-signalr/src/services/connection/signalr.connection";

import { SceneManager } from "../app.scene.manager";

export interface IPlayer {
    id: string;
    position: BABYLON.Vector3;
    color: BABYLON.Color3;
}

export class Player implements IPlayer {

    id: string;
    position: BABYLON.Vector3;
    color: BABYLON.Color3;

    constructor(public connection: SignalRConnection, public manager: SceneManager) {

        this.id = 'Player01';
        this.position = new BABYLON.Vector3(0, 0, 0);
        this.color = BABYLON.Color3.White();
    }

    OnkeyDown(evt: BABYLON.ActionEvent) {

        switch (evt.sourceEvent.key) {
            case 'w':
                {
                    this.position.y += 1;
                    this.sendToServer();
                }
                break;
            case 'a':
                {
                    this.position.x -= 1;
                    this.sendToServer();
                }
                break;
            case 's':
                {
                    this.position.y -= 1;
                    this.sendToServer();
                }
                break;
            case 'd':
                {
                    this.position.x += 1;
                    this.sendToServer();
                }
                break;
        }
    }

    protected sendToServer() {

        this.connection.invoke('sendMovement', <IPlayer>{ id: this.id, position: this.position, color: this.color });
    }
}