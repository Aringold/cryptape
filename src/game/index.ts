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
  function handleVisibilityChange() {
    if (document.hidden) {
      window.txstreetDemo.paused = false; // pause the game when the tab becomes hidden
    } else {
      // window.txstreetDemo.paused = false; // resume the game when the tab becomes visible
      delete window.txstreetDemo;
      window.location.reload();
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange, false);
}

export function endGame() {
  if (window.txstreetDemo) {
    window.txstreetDemo.destroy(true);
    delete window.txstreetDemo;
    window.location.reload();
  }
}
