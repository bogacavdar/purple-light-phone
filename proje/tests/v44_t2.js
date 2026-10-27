const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n').slice(1,3).join('|')));
await p.goto('file://'+require('path').resolve(process.argv[3]||'Hammadde_prototip.html')+'?debug');await p.waitForFunction(()=>!!window.__ham,null,{timeout:60000});
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);const S=process.argv[2];
await p.waitForTimeout(2500);console.log('audio bufs',await ev("1"));
await ev("startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(800);
await ev("walked=true;tapMoved=true;mapSeen=2;ytut=3;tut=11;met=true;witchShown=true;qState='talk';ftut=3;ctut=4;htut=2;torchTut=3;renderTut()");
// tree tier
await ev("giveTool('Taş balta');holdTool('Taş balta');const t=trees.find(t=>t.type.n==='Meşe');player.x=t.x;player.y=t.y+14");await p.waitForTimeout(300);console.log('oak:',await ev("$('prompt').innerText"));
// ore tier
await ev("giveTool('Taş kazma');holdTool('Taş kazma');const n=nodes.find(n=>n.name==='Kuvars'&&n.alive);player.x=n.x;player.y=n.y+12");await p.waitForTimeout(300);console.log('quartz:',await ev("$('prompt').innerText"));
await ev("const n=nodes.find(n=>n.name==='Bakır cevheri'&&n.alive);player.x=n.x;player.y=n.y+12");await p.waitForTimeout(300);console.log('copper:',await ev("$('prompt').innerText"));
// bridge quest → run lesson
await ev("tut=13;qState='ready';bridge.fixed=true;coins=0;turnIn();bye()");await p.waitForTimeout(900);console.log('run',await ev("runTut+' coins '+coins+' K1 lock? '+(SKILLS.find(x=>x.id==='K1').need)"));
await ev("openMenu('skills')");await p.waitForTimeout(200);await p.screenshot({path:S+'/skills.png'});await ev("closeCraft()");
// forge bronze sword
await ev("['Tunç külçesi','Meşe sapı','Tabaklanmış geyik derisi'].forEach(n=>gain(n,6));renderInv();player.x=smith.x;player.y=smith.y+24;openMenu('forge')");await p.waitForTimeout(300);
await ev("selectRecipe('Tunç kılıç');fillAll();brew()");console.log('sword',await ev("(inv['Tunç kılıç']||0)+' '+$('cmsg').textContent"));
await ev("selectRecipe('Tunç zırh')");console.log('armour recipe at forge',await ev("pot.r"));
await ev("gain('Tunç levha',4);gain('Sinir kirişi',2);selectRecipe('Tunç zırh');fillAll();brew()");console.log('armour',await ev("(inv['Tunç zırh']||0)+' '+$('cmsg').textContent"));
await ev("closeCraft();wear('Tunç zırh');wear('Tunç kılıç')");console.log('def',await ev("armorDef()+' w '+weapon().n+' '+weapon().dmg"));
// quest list 12-18 progression texts
for(let i=10;i<17;i++){await ev(`tut=11+${i};qState='talk';renderTut()`);const t=await ev("QUESTS[tut-11].t+' | '+(QUESTS[tut-11].p())");console.log('Q',i+1,t)}
// end: kaptan -> balikci
await ev("tut=11+QUESTS.length;lvl=10;tickKaptan()");console.log('kaptan',await ev("kaptan.state"));await ev("talkKaptan()");console.log('k:',await ev("$('dtext').innerText.slice(0,60)+' balik '+balikci.shown"));await ev("bye()");
await ev("player.x=balikci.x;player.y=balikci.y+24;dayT=700");await p.waitForTimeout(800);await p.screenshot({path:S+'/balik.png'});
await ev("talkBalikci()");console.log('b1',await ev("$('dtext').innerText.slice(0,50)"));await ev("bye()");
await ev("BALIK_WANT.forEach(([n,q])=>gain(n,q));CLUES.forEach(c=>clues.add(c.id));renderInv();talkBalikci()");console.log('b2',await ev("$('dch').innerText"));
await p.evaluate(()=>window.__ham.ev('finishType()'));await p.click('#dch button');await p.waitForTimeout(2500);await p.screenshot({path:S+'/sail.png'});await p.waitForTimeout(6000);await p.screenshot({path:S+'/end.png'});console.log('won',await ev("won"));
console.log('errs',errs);await b.close();})();
