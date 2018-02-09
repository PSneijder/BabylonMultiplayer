import { SignalRConnection } from "ngx-signalr/src/services/connection/signalr.connection";

import { Player, IPlayer } from "../app.entities.player";
import { SceneManager, IDrawable } from "../../managers/app.scene.manager";

export class DrawablePlayer extends Player implements IDrawable {

    private material: BABYLON.StandardMaterial;
    private model: BABYLON.Mesh;

    constructor(private manager: SceneManager) {

        super();

        // let assetsManager = new BABYLON.AssetsManager(this.manager.scene);
        // let meshTask = assetsManager.addMeshTask("MapLoader", "Obj", "assets/maps/", "simple.map");

        // assetsManager.onProgress = function (remaining, total, task) {
        //     console.log(`Remaining ${remaining} Total ${total}`);
        // }

        // meshTask.onSuccess = function (task) {
        //     //console.log("Ok");
        //     //console.log(`Loaded Meshes: ${task.loadedMeshes.length}`);
        // }

        // meshTask.onError = ((e, m, t) => {
        //     console.log(m);
        // });

        // assetsManager.load();

        // var faceUV = new Array(6);
        // for (var i = 0; i < 6; i++) {
        //     faceUV[i] = new BABYLON.Vector4(0, 0, 0, 0);
        // }
        // faceUV[1] = new BABYLON.Vector4(35, 35, 0, 0);

        // var options = {
        //     width: 2,
        //     height: 2,
        //     depth: 2,
        //     faceUV: faceUV
        // };

        //let box = BABYLON.MeshBuilder.CreateBox('Box', options, this.manager.scene);
        let box = BABYLON.Mesh.CreateBox('Box', 2, this.manager.scene);
        this.model = box;

        let material = new BABYLON.StandardMaterial("material", this.manager.scene);
        //material.diffuseTexture = new BABYLON.Texture(`../../../assets/textures/blocks/coin.png`, this.manager.scene);
        //material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        //let diffuseTexture = (<BABYLON.Texture>material.diffuseTexture);
        //diffuseTexture.uOffset = 0.10; // X
        //diffuseTexture.vOffset = 1; // Y
        //diffuseTexture.uScale = 0.01;
        //diffuseTexture.vScale = 0.01;
        this.material = material;

        this.model.material = this.material;
    }

    render() {

        this.manager.camera.setTarget(this.model.position);

        this.model.position = new BABYLON.Vector3(this.position.x, this.position.y, this.position.z);
        this.material.emissiveColor = new BABYLON.Color3(this.color.r / 255, this.color.g / 255, this.color.b / 255);
    }

    dispose() {

        this.model.dispose();
        this.material.dispose();
    }
}