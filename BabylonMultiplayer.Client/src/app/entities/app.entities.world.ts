import { IDrawable } from '../app.scene.manager'

import { Player } from './app.entities.player'
import { Block } from './app.entities.block'

export interface IWorld {
    players: Player[];
}

export class World implements IWorld {

    players: Player[];
    blocks: Block[];

    constructor() {

        this.players = new Array<Player>();
        this.blocks = new Array<Block>();
    }
}