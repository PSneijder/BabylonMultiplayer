import { DrawablePlayer } from './app.entities.drawable.player'
import { DrawableBlock } from './app.entities.drawable.block'

import { SceneManager, IDrawable } from "../../managers/app.scene.manager";

export class DrawableWorld implements IDrawable {

    private players: DrawablePlayer[];
    private blocks: DrawableBlock[];

    constructor(private manager: SceneManager) {

        this.players = new Array<DrawablePlayer>();
        this.blocks = [
            new DrawableBlock("ground", new BABYLON.Vector3(0, -2, 0), this.manager),
            new DrawableBlock("ground", new BABYLON.Vector3(2, -2, 0), this.manager),
            new DrawableBlock("ground", new BABYLON.Vector3(4, -2, 0), this.manager),
            new DrawableBlock("ground", new BABYLON.Vector3(6, -2, 0), this.manager),
            new DrawableBlock("ground", new BABYLON.Vector3(8, -2, 0), this.manager),
            new DrawableBlock("ground", new BABYLON.Vector3(10, -2, 0), this.manager),
            new DrawableBlock("ground", new BABYLON.Vector3(12, -2, 0), this.manager),
            new DrawableBlock("ground", new BABYLON.Vector3(14, -2, 0), this.manager),
            new DrawableBlock("ground", new BABYLON.Vector3(16, -2, 0), this.manager),
            new DrawableBlock("coin", new BABYLON.Vector3(2, 4, 0), this.manager),
        ];
    }

    render() {

        this.blocks.forEach(block => {
            block.render();
        });
    }

    dispose() {

        this.blocks.forEach(block => {
            block.dispose();
        });
    }
}