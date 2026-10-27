const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n').slice(1,3).join('|')));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
const t0=Date.now();await p.goto('file://'+require('path').resolve(process.argv[3]||'Hammadde_prototip.html')+'?debug');await p.waitForFunction(()=>!!window.__ham,null,{timeout:60000});console.log('load ms',Date.now()-t0);
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);const S=process.argv[2];
await ev("startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(800);
await ev("walked=true;tapMoved=true;mapSeen=2;ytut=3;tut=11;met=true;witchShown=true;qState='talk';renderTut()");
console.log(await ev("JSON.stringify({toygar:[toygar.x,toygar.y,zoneAt(toygar.x,toygar.y)],balik:[Math.round(balikci.x),Math.round(balikci.y),zoneAt(balikci.x,balikci.y)],clues:CLUES.map(c=>c.id+':'+zoneAt(c.x,c.y)+':'+reachAt(c.x,c.y)),nodes:nodes.length,plants:nodes.filter(n=>RES[n.name].draw==='plant').length,quests:QUESTS.length,hotN:hotN(),recipes:DB.R.length})"));
// swamp shot
await ev("player.x=toygar.x;player.y=toygar.y+30;dayT=700");await p.waitForTimeout(1200);await p.screenshot({path:S+'/swamp.png'});
await ev("talkToygar()");await p.waitForTimeout(200);console.log('toygar:',await ev("$('dtext').innerText.slice(0,80)+' cls:'+$('dlg').className"));await ev("bye()");
// clue
await ev("const c=CLUES[2];player.x=c.x;player.y=c.y+10");await p.waitForTimeout(400);console.log('prompt clue:',await ev("$('prompt').innerText"));await ev("interact()");await p.waitForTimeout(200);console.log('clue:',await ev("$('dtext').innerText.slice(0,80)"));await ev("bye()");
// ash + weather
await ev("const c=CLUES[4];player.x=c.x;player.y=c.y+30;weather={k:'yağmur',t:100};clockK=''");await p.waitForTimeout(1500);await p.screenshot({path:S+'/ash.png'});console.log('clock',await ev("$('clockv').textContent"));
await ev("player.x=spawn.x+60;player.y=spawn.y-60;weather={k:'fırtına',t:100};dayT=1300");await p.waitForTimeout(1500);await p.screenshot({path:S+'/storm_night.png'});
await ev("weather={k:'sis',t:100};dayT=700");await p.waitForTimeout(1000);await p.screenshot({path:S+'/fog.png'});
// eat picker
await ev("weather={k:'açık',t:100};gain('Böğürtlen',3);gain('Pişmiş geyik eti',2);gain('Mantar çorbası',1);food=40;renderInv();openEat()");await p.waitForTimeout(300);await p.screenshot({path:S+'/eat.png'});
await p.click('[data-eat="Pişmiş geyik eti"]');await p.waitForTimeout(200);console.log('buffs',await ev("JSON.stringify(pbuff)+' food '+Math.round(food)+' fx:'+$('fxbar').innerText"));await ev("closeCraft()");
// codex & book tabs
await ev("openMenu('book')");await p.waitForTimeout(200);await p.click('[data-bt="codex"]');await p.waitForTimeout(200);await p.screenshot({path:S+'/codex.png'});await p.click('[data-bt="clue"]');await p.waitForTimeout(200);await p.screenshot({path:S+'/clues.png'});await ev("closeCraft()");
// belt
await ev("['Taş balta','Taş kazma','Mızrak','Taş kılıç','Kaba meşale'].forEach(n=>{gain(n);if(GT[n])toolDur[n]=Math.round(GT[n].dur*Math.random())});renderInv()");console.log('belt',await ev("hotCount()+'/'+hotN()+' drops '+drops.length"));
await ev("gain('Tırmık')");console.log('after 6th',await ev("(inv['Tırmık']||0)+' drops '+drops.filter(d=>d.n==='Tırmık').length"));
await p.waitForTimeout(500);await p.screenshot({path:S+'/belt.png'});
// lampman
await ev("torchesUsed=5;coins=1500;renderInv();checkLampman()");await p.waitForTimeout(300);console.log('lamp',await ev("lampman.shown"));await ev("talkLamp()");await p.waitForTimeout(100);await p.evaluate(()=>window.__ham.ev('finishType()'));await p.click('#dch button');await p.waitForTimeout(200);await p.evaluate(()=>window.__ham.ev('finishType()'));await p.click('#dch button');await p.waitForTimeout(1200);
console.log('lamp eq',await ev("equip.bas+' coins '+coins"));await ev("dayT=1320");await p.waitForTimeout(800);await p.screenshot({path:S+'/lamp_night.png'});
// export/import
await ev("openXfer('ex')");const code=await ev("$('x-code').value");console.log('code len',code.length,code.slice(0,14));const parsed=await ev("Object.keys(parseCode($('x-code').value)||{}).join(',')");console.log('parsed',parsed);await ev("closeXfer()");
// save roundtrip
console.log('snap',await ev("JSON.stringify(snapshot().v44).slice(0,200)"));
await ev("const d=snapshot();applyState(d)");console.log('restored lamp',await ev("equip.bas+' tg '+toygar.met+' clues '+clues.size"));
console.log('errs',errs);await b.close();})();
