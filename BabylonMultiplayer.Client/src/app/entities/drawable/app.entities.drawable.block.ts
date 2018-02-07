import { SignalRConnection } from "ngx-signalr/src/services/connection/signalr.connection";

import { Block } from "../app.entities.block";
import { SceneManager, IDrawable } from "../../managers/app.scene.manager";

export class DrawableBlock extends Block implements IDrawable {

    private material: BABYLON.StandardMaterial;
    private model: BABYLON.Mesh;

    constructor(name: string, position: BABYLON.Vector3, private manager: SceneManager) {

        super(position);

        let box = BABYLON.Mesh.CreateBox("Box", 2, this.manager.scene);
        this.model = box;

        let material = new BABYLON.StandardMaterial("material", this.manager.scene);
        material.diffuseTexture = new BABYLON.Texture(`../../../assets/textures/blocks/${name}.png`, this.manager.scene);
        material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        material.emissiveColor = BABYLON.Color3.FromInts(128, 64, 0);

        this.material = material;
        this.model.material = this.material;
    }

    render() {

        this.model.position = new BABYLON.Vector3(this.position.x, this.position.y, this.position.z);
    }

    dispose() {

        this.model.dispose();
        this.material.dispose();
    }
}