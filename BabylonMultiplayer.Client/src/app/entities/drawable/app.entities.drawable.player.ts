import { SignalRConnection } from "ngx-signalr/src/services/connection/signalr.connection";

import { Player, IPlayer } from "../app.entities.player";
import { SceneManager } from "../../app.scenemanager";

export interface IDrawablePlayer extends IPlayer {
    render()
    dispose()
}

export class DrawablePlayer extends Player implements IDrawablePlayer {

    private material: BABYLON.StandardMaterial;
    private box: BABYLON.Mesh;

    constructor(connection: SignalRConnection, manager: SceneManager) {

        super(connection, manager);

        this.id = 'Player01';
        this.position = new BABYLON.Vector3(0, 0, 0);

        let box = BABYLON.Mesh.CreateBox("Box", 2, this.manager.scene);
        this.box = box;

        let material = new BABYLON.StandardMaterial("material", this.manager.scene);
        this.material = material;

        this.box.material = this.material;
    }

    render() {

        this.box.position = new BABYLON.Vector3(this.position.x, this.position.y, this.position.z);
        this.material.emissiveColor = new BABYLON.Color3(this.color.r / 255, this.color.g / 255, this.color.b / 255);
    }

    dispose() {

        this.box.dispose();
        this.material.dispose();
    }
}