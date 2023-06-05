import { passengerTypes } from '../objects/passenger';

import React from 'react';
import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene',
    });
    this.loadingBar = null;
    this.progressBar = null;
  }

  preload() {
    // set the background and create loading bar
    this.cameras.main.setBackgroundColor(0x78ff02);
    this.createLoadingbar();

    // pass value to change the loading bar fill
    this.load.on(
      'progress',
      (value) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xfff6d3, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    // delete bar graphics, when loading complete
    this.load.on(
      'complete',
      () => {
        // ------------------------------------
        for (const pType of passengerTypes) {
          this.anims.create({
            key: `${pType}WalkDown`,
            frames: this.anims.generateFrameNames('characters', {
              prefix: `${pType}-`,
              suffix: '.png',
              zeroPad: 0,
              frames: [0, 1, 0, 2],
            }),
            frameRate: 8,
          });
          this.anims.create({
            key: `${pType}WalkUp`,
            frames: this.anims.generateFrameNames('characters', {
              prefix: `${pType}-`,
              suffix: '.png',
              zeroPad: 0,
              frames: [3, 4, 3, 5],
            }),
            frameRate: 8,
          });
          this.anims.create({
            key: `${pType}Walk`,
            frames: this.anims.generateFrameNames('characters', {
              prefix: `${pType}-`,
              suffix: '.png',
              zeroPad: 0,
              frames: [6, 7, 6, 8],
            }),
            frameRate: 8,
          });
        }
        // ------------------------------------
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );

    // load out package
    this.load.multiatlas('characters', './assets/characters.json', 'assets');
  }

  createLoadingbar() {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x3f83fa, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }

  update() {
    this.scene.start('GameScene');
  }
}
