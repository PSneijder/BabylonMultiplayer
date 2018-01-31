import { DrawablePlayer } from './app.entities.drawable.player'

export class DrawableWorld {
    players: DrawablePlayer[];

    constructor() {

        this.players = new Array<DrawablePlayer>();
    }
}