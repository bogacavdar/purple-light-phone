const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham,null,{timeout:60000});
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await ev("startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(1500);
await ev("walked=true;tapMoved=true;mapSeen=2;ytut=3;tut=11;qState='talk';renderTut()");
console.log('q0',await ev("QUESTS.map(q=>q.t).join(' | ')"));
await ev("talk()");await p.waitForTimeout(200);console.log('dlg',await ev("$('dtext').innerText.slice(0,90)"));
for(let i=0;i<4;i++){if(!(await ev('dlgOpen')))break;await p.click('#dch button');await p.waitForTimeout(150)}
console.log('state',await ev("qState+' '+tut+' bought '+bought.has('Taş balta')"),await ev("$('tuttext').innerText.slice(0,160)"));
// tree tier
await ev("giveTool('Taş balta');renderInv();holdTool('Taş balta');const t=trees.find(t=>t.type.n==='Meşe'&&!ZONE[Math.floor(t.y/T)*W+Math.floor(t.x/T)]);player.x=t.x;player.y=t.y+14;window._mt=t");
await p.waitForTimeout(200);console.log('oak prompt',await ev("$('prompt').innerText"));
await ev("interact({kind:'tree',t:_mt})");console.log('gathering oak?',await ev('!!gathering'));
await ev("const t=trees.find(t=>t.type.n==='Çam'&&!ZONE[Math.floor(t.y/T)*W+Math.floor(t.x/T)]);player.x=t.x;player.y=t.y+14;interact({kind:'tree',t})");console.log('gathering pine?',await ev('!!gathering'));
// bridge
await ev("stopGather();gain('Çam odunu',41);player.x=bridge.x0*T-12;player.y=bridge.cy;renderInv()");await p.waitForTimeout(300);console.log('bridge prompt',await ev("$('prompt').innerText"));
await ev("interact()");await p.waitForTimeout(300);console.log('fixed',await ev("bridge.fixed+' wood '+inv['Çam odunu']"));
await p.screenshot({path:'shots/p31.png'});
// death & grave
await ev("gain('Taş',10);coins=100;renderInv();player.x=bridge.x1*T+60;player.y=bridge.cy;hp=1;hurt(5,'test',false)");await p.waitForTimeout(4200);
console.log('after death',await ev("JSON.stringify({graves,coins,tas:inv['Taş'],pos:[Math.round(player.x),Math.round(player.y)],wake:[wakeSpot.x,wakeSpot.y]})"),await ev("$('dlg').hidden?'':$('dtext').innerText.slice(0,120)"));
await p.click('#dch button').catch(()=>{});
await ev("openMenu('map')");await p.waitForTimeout(500);await p.screenshot({path:'shots/p32.png'});await ev("closeCraft()");
await ev("player.x=graves[0].x;player.y=graves[0].y+4");await p.waitForTimeout(400);console.log('claimed',await ev("graves.length+' coins '+coins+' tas '+inv['Taş']"));
// carpenter, shelter
await ev("player.x=carp.x;player.y=carp.y+20;gain('Dal',10);gain('Yaprak',14);gain('Lif',5);coins=6000;lvl=8;renderInv();talkCarp()");await p.waitForTimeout(200);await p.click('#dch button');await p.waitForTimeout(300);
await p.screenshot({path:'shots/p33.png'});
await p.click('[data-hb="Yaprak barınağı"]');await p.waitForTimeout(100);await p.click('[data-hb="Taş ev"]');await p.waitForTimeout(100);await p.click('[data-hb="Ahşap ev"]');await p.waitForTimeout(100);
console.log('houses',await ev("(inv['Yaprak barınağı']||0)+' '+(inv['Ahşap ev']||0)+' placed '+JSON.stringify(placed)+' coins '+coins"));
await ev("closeCraft()");
// place shelter and sleep
await ev("player.x=carp.x-60;player.y=carp.y+60;holdTool('Yaprak barınağı')");await p.waitForTimeout(100);
await ev("for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){if(placing&&placeOK(placing.n,0,Math.floor(player.x/T)+dx,Math.floor(player.y/T)+dy,null)){doPlace(Math.floor(player.x/T)+dx,Math.floor(player.y/T)+dy);break}}");
console.log('placed shelter',await ev("placed.map(o=>o.n).join(',')"));
await ev("dayT=1250;const o=placed.find(o=>o.n==='Yaprak barınağı');useplaced(o)");await p.waitForTimeout(4500);console.log('slept',await ev("shelterSlept+' '+placed.map(o=>o.n).join(',')+' day '+day"));
await ev("const o=placed.find(o=>o.n==='Taş ev');player.x=(o.tx+1.5)*T;player.y=(o.ty+3)*T+8");await p.waitForTimeout(500);await p.screenshot({path:'shots/p34.png'});
console.log('house prompt',await ev("$('prompt').innerText"));
// kaptan
await ev("tut=11+QUESTS.length;lvl=10;renderTut()");await p.waitForTimeout(600);console.log('kaptan',await ev("kaptan.state+' '+guideKey()"));
await ev("player.x=kaptan.x;player.y=kaptan.y+18");await p.waitForTimeout(500);await p.screenshot({path:'shots/p35.png'});
await ev("talkKaptan()");await p.waitForTimeout(200);console.log(await ev("$('dtext').innerText.slice(0,80)"));await p.click('#dch button');
await ev("gain('Kara pul',1);gain('Tunç külçesi',3);talkKaptan()");await p.waitForTimeout(200);await p.click('#dch button');await p.waitForTimeout(1500);await p.screenshot({path:'shots/p36.png'});
await p.waitForTimeout(6500);console.log('won',await ev('won'),await ev("$('wtext').innerText.slice(0,100)"));
console.log(errs);await b.close()})();
