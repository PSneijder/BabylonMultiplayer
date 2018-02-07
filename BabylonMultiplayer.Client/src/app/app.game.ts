import { Component, OnInit, ViewChild } from '@angular/core';

import 'babylonjs-loaders';
import * as BABYLON from 'babylonjs';

import { SignalR, SignalRConnection, BroadcastEventListener } from 'ngx-signalr';

import { EventManager } from './managers/app.event.manager';
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

  private eventManager: EventManager;
  private sceneManager: SceneManager;
  private playerManager: PlayerManager;

  private world: DrawableWorld;
  private players: Map<string, DrawablePlayer>;

  @ViewChild('viewport') viewportViewChild: any;
  constructor(private signalR: SignalR) {

  }

  ngOnInit() {

    this.connection = this.initializeSignalR();

    this.connection.start()
      .then(_ => {

        this.message = "Connection established.";

        this.player = new Player(this.connection.id);

        let engine = this.initializeBabylonJS();

        this.sceneManager = new SceneManager(engine);

        this.world = new DrawableWorld(this.sceneManager);
        this.players = new Map<string, DrawablePlayer>();

        this.playerManager = new PlayerManager(this.player, this.sceneManager, this.connection);
        this.eventManager = new EventManager(this.player, this.players, this.sceneManager, this.connection);

        this.sceneManager.runRenderLoop(this.world, this.players);

        this.playerManager.refresh();

      }).catch(_ => {

        this.message = "No connection available.";

      });
  }

  // Initializations

  private initializeSignalR(): SignalRConnection {

    let connection = this.signalR.createConnection();

    return connection;
  }

  private initializeBabylonJS(): BABYLON.Engine {

    let canvas = this.viewportViewChild.nativeElement;
    let engine = new BABYLON.Engine(canvas, true);

    engine.enableOfflineSupport = false;

    return engine;
  }
}