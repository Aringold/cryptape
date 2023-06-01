import { Passenger } from "../objects/passenger";
import { Block } from "../objects/block";
import React, { useEffect, useState } from 'react';
import { default as CKB } from "@nervosnetwork/ckb-sdk-core";
const ckb = new CKB('http://81.0.246.174:2083');

export class GameScene extends Phaser.Scene {
  private passengers!: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  preload(): void {
    // Load a background image from a local file
    this.load.image('bg-image', '/assets/back.jpg');
    this.load.image('block-image', '/assets/block.png');
  }

  init(): void {
    console.log('init');
    this.passengers = this.add.group({ runChildUpdate: true });
  }

  async create(): Promise<void> {
    const backgroundImage = this.add.image(0, 0, 'bg-image');
    backgroundImage.setOrigin(0, 0);
    backgroundImage.setSize(window.innerWidth, window.innerHeight);

    const block = [];
    let tipBlockNumberHex = await ckb.rpc.getTipBlockNumber();
    console.log(tipBlockNumberHex);
    let tipBlockNumber = parseInt(tipBlockNumberHex, 16);
    
    for (let i = 0; i < 2; i++) {
      const newBlock = new Block({
        scene: this,
        x: 1030,
        y: 450 + 550 * i,
        texture: 'block-image',
        blockNumber: "0x" + (tipBlockNumber + i + 1).toString(16)
      });
      block.push(newBlock);
    }
    tipBlockNumber = tipBlockNumber + 2;
    var myHeaders = new Headers();

    myHeaders.append("Accept", "application/vnd.api+json");
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
    myHeaders.append("Content-Type", "application/vnd.api+json");

    var requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await ckb.rpc.getRawTxPool().then(result => {
      for (let i = 0; i < result.pending.length; i++) {
        const x = 800;
        const y = 300;
        this.passengers.add(
          new Passenger({
            scene: this,
            x,
            y,
            texture: 'characters',
            frame: 'alien-0.png',
            transaction: result.pending[i]
          })
        );
      }
    })
      .catch(error => console.log('error', error));

    const mySocket = new WebSocket('ws://81.0.246.174:443');
    mySocket.addEventListener('open', function (event) {
      console.log('WebSocket connection established');

      // Subscribe to new block events
      mySocket.send('{"id": 2, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_transaction"]}');

      mySocket.send('{"id": 2, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_tip_header"]}');

    });

    mySocket.addEventListener('error', function (event) {
      console.error('WebSocket encountered an error:', event);
    });

    mySocket.addEventListener('close', function (event) {
      console.warn('WebSocket connection closed:', event);
    });

    mySocket.onmessage = async (event) => {
      if (JSON.parse(JSON.parse(event.data).params.result)) {
        if (JSON.parse(JSON.parse(event.data).params.result).compact_target) {
          // console.log('JSON.parse(JSON.parse(event.data).params.result): ', JSON.parse(JSON.parse(event.data).params.result));
          const blockInfo = await ckb.rpc.getBlockByNumber(JSON.parse(JSON.parse(event.data).params.result).number);
          console.log(blockInfo);
          tipBlockNumber ++;
          const newBlockY = block.length > 0 ? block[block.length - 1].y + 550 : 450;
          const newBlock = new Block({
            scene: this,
            x: 1030,
            y: newBlockY,
            texture: 'block-image',
            blockNumber: "0x" + tipBlockNumber.toString(16)
          });
          block.push(newBlock);
          for (let i = 0; i < block.length; i++) {
            block[i].handleWalking();
          }
          
          console.log(parseInt(JSON.parse(JSON.parse(event.data).params.result).number, 16));
          
          // for(let i = 0; i < 30; i ++)
          //   this.passengers.children.entries[i].handleWalkingToBlock();
          // this.passengers.clear(true);
          // fetch("https://mainnet-api.explorer.nervos.org/api/v2/pending_transactions?page=2&page_size=200", requestOptions)
          //   .then(response => response.json())
          //   .then(result => {
          //     for (let i = 0; i < result.data.length; i++) {
          //       const x = 600;
          //       const y = 200;
          //       this.passengers.add(
          //         new Passenger({
          //           scene: this,
          //           x,
          //           y,
          //           texture: 'characters',
          //           frame: 'alien-0.png',
          //           transaction: result.data[i]
          //         })
          //       );
          //     }
          //   })
          //   .catch(error => console.log('error', error));

        }
        // console.log(`Data received from server: ${JSON.stringify(JSON.parse(JSON.parse(event.data).params.result))}`);
        else {
          const x = 300;
          const y = 300 + Math.round(Math.random() * 500)
          this.passengers.add(
            new Passenger({
              scene: this,
              x,
              y,
              texture: 'characters',
              frame: 'alien-0.png',
              transaction: JSON.parse(JSON.parse(event.data).params.result)
            })
          );
        }
      }
    };
  }

}
