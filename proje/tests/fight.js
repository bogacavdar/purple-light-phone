const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham);
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await ev("startNew('normal');endCine()");await p.waitForTimeout(200);await ev("wakeDone()");await p.evaluate(()=>window.__ham.skip());
await ev("player.x=npc.home.x+40*T;player.y=npc.home.y-30*T;if(blocked(player.x,player.y)){player.x=witch.x+60;player.y=witch.y}");
await ev("food=30;gain('Böğürtlen',5);gain('Pişmiş tavşan eti',1);renderInv()");await p.waitForTimeout(3000);
console.log('animals',await ev("JSON.stringify(animals.map(a=>a.k))"),'food',await ev("Math.round(food)+' seen '+hungerSeen"));
await p.keyboard.press('KeyF');await p.waitForTimeout(200);console.log('after eat',await ev("Math.round(food)+' ber '+inv['Böğürtlen']+' et '+(inv['Pişmiş tavşan eti']||0)"));
// spawn a boar next to player and fight with a sword
await ev("giveTool('Taş kılıç');hotK='';renderHot()");const i=await ev("hotList().indexOf('Taş kılıç')");await p.keyboard.press('Digit'+((i+1)%10));
await ev("animals.push({k:'Yaban domuzu',x:player.x+30,y:player.y,hp:45,st:'wander',t:0,dx:0,dy:0,face:-1,atk:0,flash:0,kb:null,step:0,mad:true})");
for(let k=0;k<12;k++){await ev("player.face={x:1,y:0}");await p.keyboard.press('Space');await p.waitForTimeout(450);if(k===1)await p.screenshot({path:'shots/f1.png'})}
console.log('hp',await ev("Math.round(hp)+' boars '+animals.filter(a=>a.k==='Yaban domuzu').length+' meat '+(inv['Yaban domuzu eti']||0)+' dur '+toolDur['Taş kılıç']"));
await ev("dayT=1290;clockK='';animals.push({k:'Kurt',x:player.x-60,y:player.y+10,hp:35,st:'wander',t:0,dx:0,dy:0,face:1,atk:0,flash:0,kb:null,step:0,mad:false})");await p.waitForTimeout(800);await p.screenshot({path:'shots/f2.png'});
await ev("dayT=700;clockK=''");await p.keyboard.press('KeyI');await p.waitForTimeout(300);await p.screenshot({path:'shots/f3.png'});
console.log(errs);await b.close()})();
