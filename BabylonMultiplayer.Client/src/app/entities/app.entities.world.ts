import { Player } from './app.entities.player'

export interface IWorld {
    players: Player[];
}

export class World implements IWorld {
    players: Player[];

    constructor() {

        this.players = new Array<Player>();
    }
}