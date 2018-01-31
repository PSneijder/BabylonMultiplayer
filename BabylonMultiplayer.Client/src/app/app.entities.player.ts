import { SignalRConnection } from "ngx-signalr/src/services/connection/signalr.connection";

import { SceneManager } from "./app.scenemanager";

export interface IPlayer {
    id: string;
    position: BABYLON.Vector3;
}

export class Player implements IPlayer {
    id: string;
    position: BABYLON.Vector3;

    private box: BABYLON.Mesh;

    constructor(private connection: SignalRConnection, private manager: SceneManager) {
        this.id = 'Player01';
        this.position = new BABYLON.Vector3(0, 0, 0);

        let boxMaterial = new BABYLON.StandardMaterial("material", this.manager.scene);
        boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);

        this.box = BABYLON.Mesh.CreateBox("Box", 2, this.manager.scene);
        this.box.material = boxMaterial;
    }

    Render() {
        this.box.position = new BABYLON.Vector3(this.position.x, this.position.y, this.position.z);
    }

    OnkeyDown(evt: BABYLON.ActionEvent) {
        switch (evt.sourceEvent.key) {
            case 'w':
                {
                    this.position.y += 1;
                    console.log('updated position: ' + this.position);
                    this.sendToServer();
                }
                break;
            case 'a':
                {
                    this.position.y -= 1;
                    console.log('updated position: ' + this.position);
                    this.sendToServer();
                }
                break;
            case 's':
                {
                    this.position.x += 1;
                    console.log('updated position: ' + this.position);
                    this.sendToServer();
                }
                break;
            case 'd':
                {
                    this.position.x += 1;
                    console.log('updated position: ' + this.position);
                    this.sendToServer();
                }
                break;
        }
    }

    private sendToServer() {
        this.connection.invoke('sendMovement', <IPlayer>{ id: this.id, position: this.position });
    }
}