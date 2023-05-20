import { Passenger } from "../objects/passenger";
import React, { useEffect, useState } from 'react';

export class GameScene extends Phaser.Scene {
  private passengers!: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  preload(): void {
    // Load a background image from a local file
    this.load.image('bg-image', '/assets/lonely-road-in-the-woods-aerial.jpg');
  }

  init(): void {
    console.log('init');
    this.passengers = this.add.group({ runChildUpdate: true });
  }

  create(): void {
    const backgroundImage = this.add.image(0, 0, 'bg-image');
    backgroundImage.setOrigin(0, 0);
    backgroundImage.setScale(0.5, 0.5);
    backgroundImage.setSize(window.innerWidth, window.innerHeight);

    var myHeaders = new Headers();

    myHeaders.append("Accept", "application/vnd.api+json");
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
    myHeaders.append("Content-Type", "application/vnd.api+json");

    var requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://mainnet-api.explorer.nervos.org/api/v2/pending_transactions?page=2&page_size=", requestOptions)
      .then(response => response.json())
      .then(result => {
        for (let i = 0; i < result.data.length; i++) {
          const x = 500;
          const y = 500;
          this.passengers.add(
            new Passenger({
              scene: this,
              x,
              y,
              texture: 'characters',
              frame: 'alien-0.png',
              transactionHash: result.data[i].transaction_hash
            })
          );
        }
      })
      .catch(error => console.log('error', error));

  }

}
