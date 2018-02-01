
export class Block {
    
    static BLOCK_HEIGHT: number = 32;
    static BLOCK_WIDTH: number = 32;
    static BLOCK_DEPTH: number = 32;

    position: BABYLON.Vector3;

    constructor(position: BABYLON.Vector3) {
        
        this.position = position;
    }
}