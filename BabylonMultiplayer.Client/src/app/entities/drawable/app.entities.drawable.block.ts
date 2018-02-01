import { SignalRConnection } from "ngx-signalr/src/services/connection/signalr.connection";

import { Block } from "../app.entities.block";
import { SceneManager, IDrawable } from "../../app.scene.manager";

export class DrawableBlock extends Block implements IDrawable {

    private material: BABYLON.StandardMaterial;
    private box: BABYLON.Mesh;

    constructor(name: string, position: BABYLON.Vector3, private manager: SceneManager) {

        super(position);

        let box = BABYLON.Mesh.CreateBox("Box", 2, this.manager.scene);
        this.box = box;

        let material = new BABYLON.StandardMaterial("material", this.manager.scene);
        material.diffuseTexture = new BABYLON.Texture(`../../../assets/blocks/${name}.png`, this.manager.scene);
        material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        material.emissiveColor = BABYLON.Color3.FromHexString("#b97a57");

        this.material = material;
        this.box.material = this.material;
    }

    render() {

        this.box.position = new BABYLON.Vector3(this.position.x, this.position.y, this.position.z);
    }

    dispose() {

        this.box.dispose();
        this.material.dispose();
    }
}