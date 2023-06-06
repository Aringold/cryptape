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
    this.add.text(100, 200, 'Hello World!', { color: '#ff0000', fontSize: '32px', fontWeight: 'bold' });
    const block = [];
    let tipBlockNumberHex = await ckb.rpc.getTipBlockNumber();
    // console.log(tipBlockNumberHex);
    let tipBlockNumber = parseInt(tipBlockNumberHex, 16);

    for (let i = 0; i < 3; i++) {
      const newBlock = new Block({
        scene: this,
        x: 1030,
        y: -100 + 550 * i,
        texture: 'block-image',
        blockNumber: "0x" + (tipBlockNumber + i).toString(16)
      });
      block.push(newBlock);
    }
    tipBlockNumber = tipBlockNumber + 2;

    // Get pending transactions and add passengers in application
    const response = await ckb.rpc.getRawTxPool(true).then(async result => {
      const pendingTransactions = Object.entries(result.pending).map(([key, value]) => ({ transaction: { hash: key }, ...value }))
      for (let i = 0; i < pendingTransactions.length; i++) {

        const x = 800;
        const y = 300;
        this.passengers.add(
          new Passenger({
            scene: this,
            x,
            y,
            texture: 'characters',
            frame: 'alien-0.png',
            transaction: pendingTransactions[i]
          })
        );
      }
    })
      .catch(error => console.log('error', error));

    const mySocket = new WebSocket('ws://81.0.246.174:443');
    mySocket.addEventListener('open', function (event) {
      console.log('WebSocket connection established');

      // Subscribe to new transaction events
      mySocket.send('{"id": 2, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_transaction"]}');
      // Subscribe to new block events
      mySocket.send('{"id": 3, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_tip_header"]}');
      // Subscribe to new rejected transaction event
      mySocket.send('{"id": 4, "jsonrpc": "2.0", "method": "subscribe", "params": ["rejected_transaction"]}');

    });

    mySocket.addEventListener('error', function (event) {
      console.error('WebSocket encountered an error:', event);
    });

    mySocket.addEventListener('close', function (event) {
      console.warn('WebSocket connection closed:', event);
    });
    mySocket.onmessage = async (event) => {
      if (!JSON.parse(event.data).id) {
        if (JSON.parse(JSON.parse(event.data).params.result).compact_target) {
          // New block event
          tipBlockNumber++;
          const newBlockY = block.length > 0 ? block[block.length - 1].y + 550 : -100;
          const newBlock = new Block({
            scene: this,
            x: 1030,
            y: newBlockY,
            texture: 'block-image',
            blockNumber: "0x" + tipBlockNumber.toString(16)
          });
          block.push(newBlock);

          // Get information of new block
          const blockInfo = await ckb.rpc.getBlockByNumber(JSON.parse(JSON.parse(event.data).params.result).number);

          // Search transactions from pending transactions that confirmed by new block
          const removedIndexes = [];
          const filteredArr = this.passengers.children.entries.forEach((entry, index) => {
            const shouldRemove = blockInfo.transactions.some((blockTransaction) => {
              return blockTransaction.hash === entry.transaction.transaction.hash;
            });
            if (shouldRemove) {
              removedIndexes.push(index);
              // Action to put the transaction on the bus (in application)
              this.passengers.children.entries[index].handleWalkingToBlock();
            }
            return !shouldRemove;
          });

          // Action to put the block on the nervos network (in application)
          setTimeout(() => {
            for (let i = 0; i < block.length; i++) {
              block[i].handleWalking();
            }
          }, 800);

          // Remove invisible block in application for performance.
          setTimeout(() => {
            if (block[0].y < -100) {
              block[0].destroy(true);
              block.splice(0, 1);
            }
          }, 200);
        }
        else {
          if (JSON.parse(JSON.parse(event.data).params.result).length === 2) {
            // New rejected transaction event

            for (let i = 0; i < this.passengers.children.entries.length; i++) {
              if (this.passengers.children.entries[i].transaction.transaction.hash === JSON.parse(JSON.parse(event.data).params.result)[0].transaction.hash) {
                // Action to put the transaction to the home (in application)
                this.passengers.children.entries[i].handleWalkingToHome();
              }
            }
          }
          else {
            // New transaction event
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
      }
    }

  };
}

