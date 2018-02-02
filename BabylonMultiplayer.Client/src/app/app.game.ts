import { Component, OnInit, ViewChild } from '@angular/core';

import 'babylonjs-loaders';
import * as BABYLON from 'babylonjs';

import { SignalR, SignalRConnection, BroadcastEventListener } from 'ngx-signalr';

import { SceneManager } from './managers/app.scene.manager';
import { PlayerManager } from './managers/app.player.manager';

import { onConnectEvent, onDisconnectEvent } from './entities/app.entities.events';

import { DrawableWorld } from './entities/drawable/app.entities.drawable.world';
import { DrawablePlayer } from './entities/drawable/app.entities.drawable.player';
import { Player, IPlayer } from './entities/app.entities.player';
import { World, IWorld } from './entities/app.entities.world';

@Component({
  selector: 'app-root',
  templateUrl: './app.game.html',
  styleUrls: ['./app.game.css']
})
export class AppGame {

  message: string;

  private connection: SignalRConnection;

  private player: Player;

  private manager: SceneManager;
  private playerManager: PlayerManager;

  private world: DrawableWorld;
  private players: Map<string, DrawablePlayer>;

  @ViewChild('viewport') viewportViewChild: any;
  constructor(private signalR: SignalR) {

  }

  ngOnInit() {

    this.initializeSignalR();

    this.connection.start()
      .then(_ => {

        this.message = "Connection established.";

        this.player = new Player();
        this.player.id = this.connection.id;

        this.initializeBabylonJS();
        this.initialize();
      }).catch(_ => {

        this.message = "No connection available.";
      });
  }

  // SignalR Events

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

  // Initializations

  private initialize() {

    this.playerManager = new PlayerManager(this.player, this.manager, this.connection);

    this.world = new DrawableWorld(this.manager);
    this.players = new Map<string, DrawablePlayer>();
  }

  private initializeSignalR() {

    let connection = this.signalR.createConnection();
    let opUpdate$ = new BroadcastEventListener('update');
    let opConnect$ = new BroadcastEventListener('connect');
    let opDisconnect$ = new BroadcastEventListener('disconnect');

    connection.listen(opUpdate$);
    opUpdate$.subscribe(this.onUpdate.bind(this));

    connection.listen(opConnect$);
    opConnect$.subscribe(this.onConnect.bind(this));

    connection.listen(opDisconnect$);
    opDisconnect$.subscribe(this.onDisconnect.bind(this));

    this.connection = connection;
  }

  private initializeBabylonJS() {

    let canvas = this.viewportViewChild.nativeElement;
    let engine = new BABYLON.Engine(canvas, true);
    engine.enableOfflineSupport = false;

    let manager = new SceneManager(engine);

    engine.runRenderLoop(() => {

      manager.scene.render();

      this.world.render();

      if (!this.players) return;

      this.players.forEach(player => {

        player.render();

      });
    });

    this.manager = manager;
  }
}