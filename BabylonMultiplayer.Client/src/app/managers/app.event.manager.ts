import { SignalRConnection } from 'ngx-signalr';

import { onConnectEvent, onDisconnectEvent } from "../entities/app.entities.events";
import { Player } from "../entities/app.entities.player";
import { IWorld } from "../entities/app.entities.world";
import { DrawablePlayer } from "../entities/drawable/app.entities.drawable.player";

import { SceneManager } from "./app.scene.manager";
import { BroadcastEventListener } from "ngx-signalr";

export class EventManager {

    constructor(private player: Player, private players: Map<string, DrawablePlayer>, private manager: SceneManager, private connection: SignalRConnection) {

        let opUpdate$ = new BroadcastEventListener('update');
        let opConnect$ = new BroadcastEventListener('connect');
        let opDisconnect$ = new BroadcastEventListener('disconnect');

        connection.listen(opUpdate$);
        opUpdate$.subscribe(this.onUpdate.bind(this));

        connection.listen(opConnect$);
        opConnect$.subscribe(this.onConnect.bind(this));

        connection.listen(opDisconnect$);
        opDisconnect$.subscribe(this.onDisconnect.bind(this));
    }

    private onConnect(evt: onConnectEvent) {

        console.log(evt.message);
    }

    private onDisconnect(evt: onDisconnectEvent) {

        console.log(evt.message);
        if (this.players.has(evt.id)) {

            let player = this.players.get(evt.id);
            player.dispose();

            this.players.delete(evt.id);
        }
    }

    private onUpdate(world: IWorld) {

        if (!this.players) return;

        world.players.forEach(player => {

            if (!this.players.has(player.id)) {

                let drawable = new DrawablePlayer(this.manager);
                Object.assign(drawable, player);
                this.players.set(player.id, drawable);
            } else {

                let drawable = this.players.get(player.id);
                Object.assign(drawable, player);
                this.players.set(player.id, drawable);
            }

            if (player.id == this.player.id) {

                Object.assign(this.player, player);
            }
        });
    }
}