import { Player } from "../entities/app.entities.player";

type Predicate<T> = (item: T) => boolean;

export interface IDrawable {
    render()
    dispose()
}

export class SceneManager {

    camera: BABYLON.FreeCamera;
    scene: BABYLON.Scene;

    constructor(public engine: BABYLON.Engine) {

        let scene = this.createScene(engine);
        scene.actionManager = new BABYLON.ActionManager(scene);

        this.scene = scene;
    }

    registerAction(trigger: number, action) {

        this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(trigger, action));
    }

    private createScene(engine: BABYLON.Engine): BABYLON.Scene {

        let scene = new BABYLON.Scene(engine);
        scene.clearColor = BABYLON.Color4.FromInts(0, 128, 255, 255);

        let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(-10, 10, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());

        this.camera = camera;

        let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(10, 10, 0), scene);

        this.showAxis(scene, 5);

        return scene;
    }

    private showAxis(scene: BABYLON.Scene, size: number) {

        let axisX = BABYLON.Mesh.CreateLines("axisX", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)], scene);
        axisX.color = new BABYLON.Color3(1, 0, 0);

        let axisY = BABYLON.Mesh.CreateLines("axisY", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)], scene);
        axisY.color = new BABYLON.Color3(0, 1, 0);

        let axisZ = BABYLON.Mesh.CreateLines("axisZ", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)], scene);
        axisZ.color = new BABYLON.Color3(0, 0, 1);
    };
}