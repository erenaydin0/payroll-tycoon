import Phaser from 'phaser';
import { snapshot, subscribe } from '../state/store';
export class Office extends Phaser.Scene {
  constructor() { super('office'); }
  create() {
    const g = this.add.graphics();
    const polygon = (points: number[], color: number) => { g.fillStyle(color); g.fillPoints(points.reduce<Phaser.Math.Vector2[]>((a, _, i) => i % 2 ? a : [...a, new Phaser.Math.Vector2(points[i],points[i+1])], []), true); };
    polygon([155,270,430,132,705,270,430,408],0xb5c8c2);
    polygon([155,270,155,118,430,-20,430,132],0xdae8e7);
    polygon([430,-20,705,118,705,270,430,132],0xc6d9d8);
    // Every floor tile is a 2:1 diamond.
    for(let x=0;x<8;x++) for(let y=0;y<8;y++) {
      const cx=430+(x-y)*34.4, cy=145+(x+y)*17.2;
      polygon([cx,cy,cx+34.4,cy+17.2,cx,cy+34.4,cx-34.4,cy+17.2],(x+y)%2?0xf3eee5:0xe5dfd3);
    }
    polygon([155,270,430,408,430,424,155,286],0x9aaea7);
    polygon([430,408,705,270,705,286,430,424],0x819b96);
    // Original geometric sprites, depth ordered by their ground contact.
    const sprite = (key: string, draw: (s: Phaser.GameObjects.Graphics) => void, x: number, y: number, depth: number) => {
      const s=this.make.graphics({x:0,y:0}); draw(s); s.generateTexture(key,180,180); s.destroy(); return this.add.image(x,y,key).setDepth(depth);
    };
    sprite('cabinet',s=>{s.fillStyle(0x5e9fa8);s.fillRoundedRect(30,30,100,90,5);s.lineStyle(2,0x24364b);s.strokeRect(40,45,80,27);s.strokeRect(40,80,80,27);s.fillStyle(0xe4c796);s.fillRect(72,55,16,3);s.fillRect(72,90,16,3);},340,173,173);
    sprite('plant',s=>{s.fillStyle(0xe59b74);s.fillTriangle(60,95,110,95,101,130);s.fillStyle(0x7e9c67);s.fillEllipse(65,68,27,70);s.fillEllipse(100,58,27,75);s.fillEllipse(83,47,24,70);},624,244,244);
    sprite('chair',s=>{s.fillStyle(0x526b76);s.fillRoundedRect(60,48,48,62,8);s.fillStyle(0x24364b);s.fillRect(81,103,7,40);s.fillRect(61,140,48,5);},418,247,245);
    sprite('founder',s=>{s.fillStyle(0x24364b);s.fillRoundedRect(66,110,17,35,4);s.fillRoundedRect(90,110,17,35,4);s.fillStyle(0x5e9fa8);s.fillRoundedRect(60,66,53,54,9);s.fillStyle(0xe8bc97);s.fillCircle(86,48,22);s.fillStyle(0x493d36);s.fillRoundedRect(63,25,45,17,7);s.fillStyle(0x24364b);s.fillRect(91,47,4,4);},428,246,246);
    sprite('desk',s=>{s.fillStyle(0x836b58);s.fillRect(28,90,11,67);s.fillRect(137,90,11,67);s.fillStyle(0xc69d76);s.fillTriangle(15,78,90,40,165,78);s.fillTriangle(15,78,165,78,90,116);s.fillStyle(0xf3eee5);s.fillTriangle(65,72,90,60,115,72);s.fillTriangle(65,72,115,72,90,85);s.fillStyle(0x24364b);s.fillRoundedRect(112,73,23,16,3);},448,290,290);
    this.add.text(426,355,'KURUCU  /  SEVİYE 1',{fontFamily:'sans-serif',fontSize:'12px',color:'#586e72'}).setOrigin(.5);
    const status=this.add.text(430,452,'',{fontFamily:'sans-serif',fontSize:'14px',color:'#24364b'}).setOrigin(.5);
    const update=()=>status.setText(snapshot().step===3?'✓ Bu ayın bordrosu tamamlandı':snapshot().client?'Atlas Kırtasiye için çalışmaya hazır':'İlk müşterin seni bekliyor'); update();
    const unsubscribe=subscribe(update); this.events.once('shutdown',unsubscribe);
  }
}
export function createOffice(parent: HTMLElement) { return new Phaser.Game({type:Phaser.AUTO,parent,width:860,height:490,backgroundColor:'#e9e7df',scene:Office,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},render:{antialias:true}}); }
