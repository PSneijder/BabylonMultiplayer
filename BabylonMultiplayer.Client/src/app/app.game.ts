import { Component, OnInit, ViewChild } from '@angular/core';

import * as BABYLON from 'babylonjs';

import { SignalR, SignalRConnection, BroadcastEventListener } from 'ngx-signalr';

import { SceneManager } from './app.scenemanager';

import { DrawableWorld } from './entities/drawable/app.entities.drawable.world';
import { DrawablePlayer } from './entities/drawable/app.entities.drawable.player';

import { Player, IPlayer } from './entities/app.entities.player';
import { World, IWorld } from './entities/app.entities.world';

import { onConnectEvent, onDisconnectEvent } from './entities/app.entities.events';

@Component({
  selector: 'app-root',
  templateUrl: './app.game.html',
  styleUrls: ['./app.game.css']
})
export class AppGame {

  private connection: SignalRConnection;
  private manager: SceneManager;

  private player: Player;
  private players: Map<string, DrawablePlayer>;

  @ViewChild('viewport') viewportViewChild: any;
  constructor(private signalR: SignalR) {

  }

  ngOnInit() {

    this.initializeSignalR();

    this.connection.start()
      .then(_ => {

        this.player = new Player(this.connection, this.manager);
        this.player.id = this.connection.id;

        this.initializeBabylonJS();
        this.initialize();
      });
  }

  // SignalR Events

  private onUpdate(world: IWorld) {

    if (!this.players) return;

    var self = this;

    world.players.forEach(player => {
      if (!this.players.has(player.id)) {
        let drawable = new DrawablePlayer(this.connection, this.manager);
        Object.assign(drawable, player);
        self.players.set(player.id, drawable);
      } else {
        let drawable = self.players.get(player.id);
        Object.assign(drawable, player);
        self.players.set(player.id, drawable);
      }

      if (player.id == this.player.id) {
        Object.assign(this.player, player);
      }
    });
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

  // Initializations

  private initialize() {

    this.players = new Map<string, DrawablePlayer>();
    this.manager.registerAction(this.player);
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

    let manager = new SceneManager(engine);

    var self = this;

    engine.runRenderLoop(function () {
      manager.scene.render();

      if (!self.players) return;
      self.players.forEach(player => {
        player.render();
      });
    });

    this.manager = manager;
  }
}