import { Component, OnInit, ViewChild } from '@angular/core';

import * as BABYLON from 'babylonjs';

import { SignalR, SignalRConnection, BroadcastEventListener } from 'ngx-signalr';

import { SceneManager } from './app.scenemanager';

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

  private connection: SignalRConnection;
  private manager: SceneManager;

  private world: DrawableWorld;
  private player: Player;

  @ViewChild('viewport') viewportViewChild: any;
  constructor(private signalR: SignalR) {

    this.world = new DrawableWorld();
  }

  ngOnInit() {

    this.initializeSignalR();
    this.initializeBabylonJS();

    this.connection.start()
      .then(_ => {
        this.player = new Player(this.connection, this.manager);
        this.player.id = this.connection.id;
      });
  }

  // SignalR Events

  private onUpdate(world: IWorld) {

    if (this.world != null)
      this.world.players.forEach(player => {

        player.dispose();
      });

    world.players.forEach(player => {

      let worldPlayer = new DrawablePlayer(this.connection, this.manager);
      worldPlayer.id = player.id;
      worldPlayer.position = player.position;
      worldPlayer.color = player.color;
      this.world.players.push(worldPlayer)
    });
  }

  private onConnect(message: string) {

    console.log(message);
  }

  private onDisconnect(message: string) {

    console.log(message);
  }

  // Initializations

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

    this.manager = new SceneManager(engine);
    let scene = this.manager.scene;

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, evt => this.player.OnkeyDown(evt)));

    engine.runRenderLoop(function () {
      scene.render();
    });

    this.manager.scene.onAfterRenderObservable.add(scene => {

      if (!this.world) return;

      this.world.players.forEach(player => {
        player.render();
      });
    });
  }
}