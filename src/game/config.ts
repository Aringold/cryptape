import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Cryptape',
  url: '',
  version: '1.0',
  width: window.innerWidth,
  height: window.outerHeight,
  zoom: 1,
  type: Phaser.AUTO,
  parent: window.document.body,
  scene: [BootScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  backgroundColor: '#78ff02',
  render: { pixelArt: true, antialias: false },
  canvasStyle: 'position: fixed; left: 0px; top: 63px;'
};
