import 'phaser'
import { GameConfig } from './config'

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

declare global {
  interface Window {
    txstreetDemo: Game;
    clientX: number;
    clientY: number;
    showTransactionWin: (id: any) => void;
    showBlockWin: (id: any) => void;
  }
}

export function startGame() {
  if (!window.txstreetDemo) {
    window.txstreetDemo = new Game(GameConfig);
    console.log(`game start ${window.txstreetDemo}`);
  }
}

export function endGame() {
  if(window.txstreetDemo) {
    window.txstreetDemo.destroy(true);
  }
}
