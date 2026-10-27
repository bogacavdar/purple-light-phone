const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham);
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await ev("startNew('normal');endCine()");await p.waitForTimeout(300);
console.log('food during wake',await ev('food'));
await ev("wakeDone()");await p.waitForTimeout(300);
console.log('dlg',await ev("$('dtext').innerText.slice(0,80)"),'food',await ev('food'));
await p.screenshot({path:'shots/v1.png'});
await p.click('#dch button');await p.waitForTimeout(2200);
console.log('ytut',await ev('ytut+" tut "+tut+" hunger "+hungerOn()'));
await ev("walked=true;tapMoved=true;mapSeen=2;renderTut()");await p.waitForTimeout(300);
console.log('card',await ev("$('tutstep').textContent+' | '+$('tuttext').innerText.slice(0,70)"),'guide',await ev("guideKey()"),'berry dist',await ev("Math.round(GUIDE.berry().x-player.x)+','+Math.round(GUIDE.berry().y-player.y)"));
await p.screenshot({path:'shots/v2.png'});
await ev("gain('Böğürtlen',1);renderTut()");await p.waitForTimeout(100);
console.log('ytut2',await ev('ytut'),await ev("$('tuttext').innerText.slice(0,40)"));
const f0=await ev('food');await p.keyboard.press('KeyF');await p.waitForTimeout(700);
console.log('ate',f0,'->',await ev('food'),'ytut',await ev('ytut'),'card',await ev("$('tutstep').textContent"));
// hand menu
await ev("tut=11;qState='active';foundSet.add('Keskin taş');found.push('Keskin taş');gain('Taş',4);gain('Dal',4);gain('Lif',4);gain('Yaprak',4);bought.add('Kaba meşale');renderInv();renderTut()");
await p.keyboard.press('Tab');await p.waitForTimeout(300);
console.log('hand open',await ev("craftOpen+' '+mode+' rows '+document.querySelectorAll('[data-hand]').length+' '+[...document.querySelectorAll('[data-hand]')].map(b=>b.dataset.hand+(b.disabled?'x':'')).join(',')"));
await p.screenshot({path:'shots/v3.png'});
await p.click('[data-hand="Kaba meşale"]');await p.waitForTimeout(200);
await p.click('[data-hand="Keskin taş"]');await p.waitForTimeout(200);
console.log('made',await ev("inv['Kaba meşale']+' ks '+inv['Keskin taş']+' found '+foundSet.has('Kaba meşale')"));
await p.keyboard.press('Tab');await p.waitForTimeout(200);console.log('closed',await ev('craftOpen'));
await p.keyboard.press('KeyT');await p.waitForTimeout(200);console.log('T smith',await ev("craftOpen+' '+mode"));if(await ev('craftOpen'))await p.keyboard.press('Escape');
// torch burn
const ti=await ev("hotList().indexOf('Kaba meşale')");await ev(`setHand(${ti})`);await ev("torchBurn['Kaba meşale']=3");await p.waitForTimeout(3600);
console.log('burnt',await ev("(inv['Kaba meşale']||0)+' held '+held()"));
await ev("handCraft('Kaba meşale');handCraft('Kaba meşale')");
// night: lit near NPC fire is safe
console.log('fires',await ev("JSON.stringify(FIRES)"));
await ev("torchHint=false;player.x=FIRES[0].x+10;player.y=FIRES[0].y+8;dayT=1300;clockK='';hand=-1;hotK=''");await p.waitForTimeout(2500);
console.log('at fire darkT',await ev('darkT'),'lit',await ev('litAt(player.x,player.y-6)'));await p.screenshot({path:'shots/v4.png'});
// open forest, holding nothing
await ev("let best=null;for(let k=0;k<400&&!best;k++){const x=player.x+(Math.random()-.5)*900,y=player.y+(Math.random()-.5)*900;if(reachAt(x,y)&&!blocked(x,y)&&!litAt(x,y-6)&&!nearCamp(x,y))best={x,y}}player.x=best.x;player.y=best.y");
await p.waitForTimeout(1500);console.log('exposed darkT',await ev('darkT.toFixed(1)'),'hint',await ev('torchHint'));await p.screenshot({path:'shots/v5.png'});
await p.waitForTimeout(6800);console.log('beam',await ev("!!beam+' hp '+Math.round(hp)"));await p.screenshot({path:'shots/v6.png'});
await p.waitForTimeout(4200);console.log('after',await ev("day+' '+hhmm()+' hp '+Math.round(hp)+' at ekin '+Math.round(Math.hypot(player.x-npc.home.x,player.y-npc.home.y))"),await ev("$('dlg').hidden?'':$('dtext').innerText.slice(0,90)"));
await p.screenshot({path:'shots/v7.png'});
await p.click('#dch button').catch(()=>{});
// torch at night
await ev("player.x+=300;dayT=1300;clockK='';holdTool('Kaba meşale')");await p.waitForTimeout(1500);console.log('torch night darkT',await ev('darkT'),await ev('held()'));await p.screenshot({path:'shots/v8.png'});
// packs
await ev("dayT=600;animals.length=0;tut=11;day=3;lvl=6;for(let i=0;i<6;i++)spawnAnimals()");
console.log('packs',await ev("JSON.stringify(Object.entries(animals.reduce((m,a)=>{if(a.pk){const k=a.k+'#'+a.pk;m[k]=(m[k]||0)+1}return m},{})))"));
await ev("const g=animals.find(a=>a.k==='Geyik');player.x=g.x-12;player.y=g.y;player.face={x:1,y:0};atkCd=0;attack()");
console.log('herd mad',await ev("(()=>{const g=animals.find(a=>a.k==='Geyik');return animals.filter(a=>a.pk===g.pk).map(a=>a.mad).join(',')})()"));
// hunger damage
await ev("food=0;hp=100;hurtSeen=true");await p.waitForTimeout(2000);console.log('starving hp',await ev('Math.round(hp)'));
await ev("food=60");
// hand lesson after ctut
await ev("htut=0;ctut=1;foundSet.add('Sopa');renderTut()");await p.waitForTimeout(400);console.log('htut',await ev('htut'),await ev("$('tutstep').textContent"));
await p.screenshot({path:'shots/v9.png'});
console.log(errs);await b.close()})();
