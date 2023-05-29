import { ISpriteConstructor } from '../interfaces/sprite.interface';
// import {TxStreetContainer} from "../../hooks/txStreetContainer";

/*
export const passengerTypes: string[] = [
  'alien-', 'moonboy-', 'person-11', 'person-12', 'person-13', 'person-14', 'person-15', 'person-1', 'person-2', 'person-3', 'person-',
  'isabella-', 'mib-', 'person-10', 'person-4', 'person-5', 'person-6', 'person-7', 'person-8', 'person-9', 'helper-',
  'santa-', 'snowman-', 'frog-', 'mailman-', 'bull-', 'wolf-', 'bear-', 'lion-', 'mailman-', 'monkey-', 'penguin-', 'lizard-', 'bat-', 'unicorn-',
]
 */

export const passengerTypes: string[] = [
  'alien', 'moonboy',
  'isabella', 'mib', 'helper',
  'santa', 'snowman', 'frog', 'mailman', 'bull', 'wolf', 'bear', 'lion', 'mailman', 'monkey', 'penguin', 'lizard', 'bat', 'unicorn',
]

export class Block extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body;

  // variables
  private currentScene: Phaser.Scene;
  private target!: { x: number, y: number};
  private walkingSpeed!: number;
  private idleLock!: boolean;
  private passengerType!: string;
  private idleFrameName!: string;
  private transactionHash!: string;

  // input
  private keys!: Map<string, Phaser.Input.Keyboard.Key>;

  public getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
    return this.keys;
  }

  constructor(aParams: ISpriteConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame, aParams.transactionHash);
    this.currentScene = aParams.scene;
    this.transactionHash = aParams.transactionHash;
    this.initSprite();
    this.currentScene.add.existing(this);
  }

  private initSprite() {
    // variables
    this.passengerType = passengerTypes[Math.floor(Math.random() * passengerTypes.length)]
    this.walkingSpeed = 80 + Math.round(Math.random() * 120);
    this.idleLock = false;

    // sprite
    const scale = 0.5 + Math.random() * 0.5;
    this.setOrigin(0.5, 0.5);
    this.setScale(scale, scale);
    this.setFlipX(false);

    // physics
    this.currentScene.physics.world.enable(this);
    // this.body.setSize(6, 12);
    // this.body.setOffset(6, 4);

    // event
    this.setInteractive();
    this.on('pointerover', this.onOver);
    this.on('pointerout', this.onOut);
    this.on('pointerdown', this.onClick);
  }

  private onOver() {
    window.document.body.style.cursor='pointer';
  }

  private onOut() {
    window.document.body.style.cursor='';
  }

  private onClick(pointer: any) {
    window.clientX = pointer.event.clientX;
    window.clientY = pointer.event.clientY;
    window.showWin(this.transactionHash);
    console.log(`onClick ${window.clientX} ${window.clientY} ${this.transactionHash}`);
  }

  update(): void {

  }

}
