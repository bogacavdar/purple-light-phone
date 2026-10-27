const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham);
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await ev("startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(2000);
await ev("walked=true;tapMoved=true;mapSeen=2;ytut=3;tut=11;qState='active';renderTut()");
// gather nearest stone
await ev("const n=nodes.filter(n=>n.alive&&n.name==='Taş').sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y))[0];player.x=n.x;player.y=n.y+12;window._n=n;player.face={x:0,y:-1};interact()").catch(e=>console.log('sg',e.message));
await p.waitForTimeout(2500);
console.log('drops',await ev("JSON.stringify(drops.map(d=>[d.n,Math.round(d.x-player.x),Math.round(d.y-player.y),d.t]))"),'inv taş',await ev("inv['Taş']||0"));
await p.screenshot({path:'shots/w1.png',clip:{x:440,y:200,width:400,height:300}});
await ev("const d=drops[0];player.x=d.x;player.y=d.y+2");await p.waitForTimeout(800);
console.log('after walk',await ev("drops.length+' taş '+(inv['Taş']||0)"));
// tree transparency
await ev("const t=trees.sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y))[0];player.x=t.x;player.y=t.y-10;window._t=t");await p.waitForTimeout(300);
await p.screenshot({path:'shots/w2.png',clip:{x:490,y:240,width:300,height:240}});
// stuck: walk into the tree from above for 2.5s
await ev("player.x=_t.x+1;player.y=_t.y-26");await p.keyboard.down('KeyS');await p.waitForTimeout(2600);await p.keyboard.up('KeyS');
console.log('stuck test dy',await ev("Math.round(player.y-_t.y)+' dx '+Math.round(player.x-_t.x)"));
console.log(errs);await b.close()})();
