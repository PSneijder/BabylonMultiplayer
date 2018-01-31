
export class SceneManager {

    scene: BABYLON.Scene;

    constructor(engine: BABYLON.Engine) {

        this.scene = this.createScene(engine);
    }

    clearMeshes() {

        this.scene.meshes.forEach(mesh => {
            mesh.dispose();
        });
    }

    private createScene(engine: BABYLON.Engine): BABYLON.Scene {

        let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.8, 0.8, 0.8);

        let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(-10, 10, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());

        let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(10, 10, 0), scene);

        // let box = BABYLON.Mesh.CreateBox("Box", 2, scene);
        // box.rotation.x = -0.8;
        // box.rotation.y = 4.0;

        scene.actionManager = new BABYLON.ActionManager(scene);

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