import { Component, OnInit, ViewChild } from '@angular/core';

import * as BABYLON from 'babylonjs';

import { SignalR, SignalRConnection, BroadcastEventListener } from 'ngx-signalr';

import { Player, IPlayer } from './app.entities.player';
import { World, IWorld } from './app.entities.world';
import { SceneManager } from './app.scenemanager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private manager: SceneManager;

  private connection: SignalRConnection;

  private world: World;
  private player: Player;

  @ViewChild('viewport') viewportViewChild: any;
  constructor(private signalR: SignalR) {
    this.world = new World();
  }

  ngOnInit() {
    this.initializeSignalR();
    this.initializeBabylonJS();

    this.connection.start()
      .then(_ => {
        this.player = new Player(this.connection, this.manager)
      });
  }

  // SignalR Events

  private onUpdate(world: IWorld) {

    world.players.forEach(player => {
      let worldPlayer = new Player(this.connection, this.manager);
      worldPlayer.position = player.position;
      this.world.players.push(worldPlayer)
    });
  }

  private onConnect(message: string) {
    console.log(message);
  }

  // Initializations

  private initializeSignalR() {
    let connection = this.signalR.createConnection();
    let opUpdate$ = new BroadcastEventListener('update');
    let opConnect$ = new BroadcastEventListener('connect');

    connection.listen(opUpdate$);
    opUpdate$.subscribe(this.onUpdate.bind(this));

    connection.listen(opConnect$);
    opConnect$.subscribe(this.onConnect.bind(this));

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
        player.Render();
      });
    });
  }
}