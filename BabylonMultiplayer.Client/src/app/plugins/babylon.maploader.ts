import { ISceneLoaderPlugin } from "babylonjs";

export class MapLoader implements ISceneLoaderPlugin {

    name = "map";
    extensions: BABYLON.ISceneLoaderPluginExtensions = {
        ".map": { isBinary: false },
    };

    canDirectLoad?: (data: string) => false;
    rewriteRootURL?: (rootUrl: string, responseURL?: string) => "";

    importMesh(meshesNames: any, scene: BABYLON.Scene, data: any, rootUrl: string, meshes: BABYLON.AbstractMesh[], particleSystems: BABYLON.ParticleSystem[], skeletons: BABYLON.Skeleton[]): boolean {
        this.parse(data, meshes);
        return true;
    }

    load(scene: BABYLON.Scene, data: any, rootUrl: string): boolean {
        return true;
    }

    loadAssets(scene: BABYLON.Scene, data: string, rootUrl: string): BABYLON.AssetContainer {
        return new BABYLON.AssetContainer(scene);
    }

    private parse(data: string, meshes: BABYLON.AbstractMesh[]) {
        console.log(`Parsing: ${data}`)
    }
}