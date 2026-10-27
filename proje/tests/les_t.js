const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham);
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await ev("startNew('normal');endCine()");await p.waitForTimeout(200);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(2200);
console.log('ekin vs wake',await ev("Math.round(Math.hypot(npc.home.x-wakeSpot.x,npc.home.y-wakeSpot.y))+' alp '+Math.round(Math.hypot(alp.x-npc.home.x,alp.y-npc.home.y))"));
await ev("walked=true;mapSeen=2;tapMoved=true;tut=4;renderTut()");await p.waitForTimeout(100);
await p.click('#tutok');await p.waitForTimeout(400);await p.screenshot({path:'shots/l1.png'});
console.log('ftut',await ev('ftut'));
await ev("player.x=alp.x-20;player.y=alp.y+10;talkAlp()");await p.waitForTimeout(200);await p.click('#dch button');await p.waitForTimeout(300);
console.log('crab',await ev("JSON.stringify(animals.filter(a=>a.tut).map(a=>[Math.round(a.x-player.x),Math.round(a.y-player.y)]))"));
await p.screenshot({path:'shots/l2.png'});
for(let k=0;k<6;k++){await ev("const c=animals.find(a=>a.tut);if(c){player.x=c.x-12;player.y=c.y;player.face={x:1,y:0};atkCd=0;attack()}");await p.waitForTimeout(250)}
await p.waitForTimeout(900);console.log('ftut after',await ev('ftut'),await ev("$('dlg').hidden?'':$('dtext').innerText.slice(0,60)"));
await p.click('#dch button');await p.waitForTimeout(300);console.log('tut',await ev('tut+" witch "+witchShown'));
// cauldron lesson
await ev("player.x=witch.x+30;player.y=witch.y+10;witchMet=true;gain('Taş',2);renderInv()");await p.waitForTimeout(200);
await p.keyboard.press('KeyB');await p.waitForTimeout(200);await p.click('[data-rec="Keskin taş"]');await p.click('#pfill');await p.click('#brew');await p.waitForTimeout(400);
console.log('ctut',await ev('ctut+" tut "+tut'));
await p.click('[data-rec="Sopa"]');await p.waitForTimeout(300);await p.screenshot({path:'shots/l3.png'});
await p.click('.ping .sb[data-sub="Keskin taş"]');await p.waitForTimeout(150);await p.click('.ping .sb[data-sub="Keskin taş"]').catch(()=>{});await p.waitForTimeout(150);await p.click('#pfill');await p.waitForTimeout(150);
console.log('ctut2',await ev('ctut'),await ev("JSON.stringify(pot.put)"));await p.click('#brew');await p.waitForTimeout(400);
console.log('ctut3',await ev('ctut+" ks "+inv["Keskin taş"]+" tut "+tut'));
await p.keyboard.press('Escape');
// torch + night
await ev("dayT=1060;clockK=''");await p.waitForTimeout(400);console.log('torch',await ev('torchTut'));await p.screenshot({path:'shots/l4.png'});
await ev("gain('Lif',3);gain('Yaprak',3);gain('Dal',3);renderTut()");await p.click('#tqmake');await p.waitForTimeout(200);console.log('torch2',await ev('torchTut+" "+hotList().join(",")'));
const i=await ev("hotList().indexOf('Kaba meşale')");await p.keyboard.press('Digit'+((i+1)%10));await p.waitForTimeout(200);console.log('torch3',await ev('torchTut'));
await ev("dayT=1290;clockK=''");await p.waitForTimeout(600);await p.screenshot({path:'shots/l5.png'});
await p.keyboard.press('Digit'+((i+1)%10));await p.waitForTimeout(400);await p.screenshot({path:'shots/l6.png'});
// scare: new game first night without torch
await ev("nightScare=0;torchTut=3;dayT=1205;day=1");await p.waitForTimeout(9500);console.log('scare',await ev("nightScare+' day '+day"));await p.waitForTimeout(3500);await p.screenshot({path:'shots/l7.png'});
// cheat panel
await ev("settings.cheat=true;applyCheat()");await p.waitForTimeout(200);console.log('cheat items',await ev("document.querySelectorAll('#cres button').length"));
console.log(errs);await b.close()})();
