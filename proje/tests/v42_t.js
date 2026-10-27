const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham);
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await ev("startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(2000);
await ev("walked=true;tapMoved=true;mapSeen=2;ytut=3;tut=11;qState='active';renderTut()");
console.log('mines',await ev("JSON.stringify(Object.entries(nodes.filter(n=>n.mine).reduce((m,n)=>(m[n.name]=(m[n.name]||0)+1,m),{})))"));
// mine without pick
await ev("const n=nodes.filter(n=>n.mine&&n.name==='Bakır cevheri')[0];window._m=n;player.x=n.x;player.y=n.y+12;interact({kind:'node',n})");
console.log('no pick gathering?',await ev('!!gathering'));
await ev("giveTool('Taş kazma');renderInv();holdTool('Taş kazma');interact({kind:'node',n:_m})");await p.waitForTimeout(400);
console.log('gathering',await ev("gathering&&gathering.name"),'left',await ev('_m.left'));
await p.waitForTimeout(5500);console.log('after',await ev("_m.left+' drops '+JSON.stringify(drops.map(d=>d.n))"));
await p.screenshot({path:'shots/m1.png',clip:{x:490,y:240,width:300,height:240}});
// animal kill drops
await ev("drops.length=0;animals.length=0;animals.push({k:'Tavşan',x:player.x+14,y:player.y,hp:1,st:'wander',t:0,dx:0,dy:0,face:1,atk:0,flash:0,kb:null,step:0,mad:false});player.face={x:1,y:0};atkCd=0;setHand(-1);attack()");
await p.waitForTimeout(700);console.log('animal drops',await ev("JSON.stringify(drops.map(d=>d.n))"),'inv eti',await ev("inv['Tavşan eti']||0"));
// bounce out of water
await ev("drops.length=0;let w=null;for(let r=10;r<400&&!w;r+=8)for(let k=0;k<24;k++){const x=player.x+Math.cos(k/24*6.28)*r,y=player.y+Math.sin(k/24*6.28)*r;if(isWater(tileAt(x,y))){w={x,y};break}}window._w=w;drops.push({n:'Taş',x:w.x,y:w.y-10,tx:w.x,ty:w.y,t:0,age:0,ph:0})");
await p.waitForTimeout(2500);console.log('bounced',await ev("drops.map(d=>isWater(tileAt(d.x,d.y))+' hop '+d.hop+' t '+d.t).join(';')"));
// cheat time
await ev("settings.cheat=true;applyCheat()");await p.waitForTimeout(100);const d0=await ev("day+' '+hhmm()");await p.click('#c-night');await p.waitForTimeout(100);console.log('night',d0,'->',await ev("day+' '+hhmm()"));
await p.click('#c-time');await p.click('#c-time');await p.click('#c-time');await p.click('#c-time');await p.click('#c-time');console.log('+10h',await ev("day+' '+hhmm()"));
await p.screenshot({path:'shots/m2.png'});
// under attack
await ev("dayT=600;clockK='';lastBitten=performance.now();const n=nodes.filter(n=>!n.mine&&n.alive)[0];interact({kind:'node',n})");console.log('gather under attack',await ev('!!gathering'));
// hand multi
await ev("lastBitten=-1e9;foundSet.add('Keskin taş');found.push('Keskin taş');gain('Taş',14);renderInv();openMenu('hand')");await p.waitForTimeout(200);
console.log('buttons',await ev("[...document.querySelectorAll('[data-hand=\"Keskin taş\"]')].map(b=>b.textContent).join('|')"));
const k0=await ev("inv['Keskin taş']||0");await p.click('[data-hand="Keskin taş"][data-q="5"]');await p.waitForTimeout(100);console.log('ks',k0,'->',await ev("inv['Keskin taş']"));
await p.screenshot({path:'shots/m3.png'});
console.log(errs);await b.close()})();
