import { SignalRConnection } from 'ngx-signalr';

import { Player, IPlayer } from '../entities/app.entities.player';

import { SceneManager } from './app.scene.manager';

export class PlayerManager {

    constructor(private player: Player, private manager: SceneManager, private connection: SignalRConnection) {

        this.manager.registerAction(BABYLON.ActionManager.OnKeyDownTrigger, evt => this.OnkeyDown(evt));
    }

    refresh() {

        this.connection.invoke('refresh');
    }

    private OnkeyDown(evt: BABYLON.ActionEvent) {

        switch (evt.sourceEvent.key) {
            case 'w':
                {
                    this.player.position.y += 1;
                    this.update();
                }
                break;
            case 'a':
                {
                    this.player.position.x -= 1;
                    this.update();
                }
                break;
            case 's':
                {
                    this.player.position.y -= 1;
                    this.update();
                }
                break;
            case 'd':
                {
                    this.player.position.x += 1;
                    this.update();
                }
                break;
        }
    }

    private update() {

        this.connection.invoke('update', <IPlayer>{ id: this.player.id, position: this.player.position, color: this.player.color });
    }
}