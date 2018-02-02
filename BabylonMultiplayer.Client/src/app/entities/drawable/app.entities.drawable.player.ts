import { SignalRConnection } from "ngx-signalr/src/services/connection/signalr.connection";

import { Player, IPlayer } from "../app.entities.player";
import { SceneManager, IDrawable } from "../../managers/app.scene.manager";

export class DrawablePlayer extends Player implements IDrawable {

    private material: BABYLON.StandardMaterial;
    private box: BABYLON.Mesh;

    constructor(private manager: SceneManager) {

        super();

        let box = BABYLON.Mesh.CreateBox("Box", 2, this.manager.scene);
        this.box = box;

        // let assetsManager = new BABYLON.AssetsManager(this.manager.scene);
        // let meshTask = assetsManager.addMeshTask("ObjLoader", "Box", "assets/models/", "cube.obj");

        // assetsManager.onProgress = function (remaining, total, task) {
        //     console.log(`Remaining ${remaining} Total ${total}`);
        // }

        // meshTask.onSuccess = function (task) {
        //     console.log("Ok");
        // }

        // meshTask.onError = ((e, m, t) => {
        //     console.log(m);
        // });

        // assetsManager.load();

        let material = new BABYLON.StandardMaterial("material", this.manager.scene);
        this.material = material;

        this.box.material = this.material;
    }

    render() {

        this.manager.camera.setTarget(this.box.position);

        this.box.position = new BABYLON.Vector3(this.position.x, this.position.y, this.position.z);
        this.material.emissiveColor = new BABYLON.Color3(this.color.r / 255, this.color.g / 255, this.color.b / 255);
    }

    dispose() {

        this.box.dispose();
        this.material.dispose();
    }
}