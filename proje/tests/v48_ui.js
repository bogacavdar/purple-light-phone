// v48 batch 2 UI test: inventory belt slots, cauldron one-by-one, recipe-book grid, touch action button
// node tests/v48_ui.js [Hammadde_prototip.html]   (NODE_PATH=/opt/npm-tools/node_modules)
const {chromium,devices}=require('playwright');const path=require('path');
const FILE=path.resolve(process.argv[2]||path.join(__dirname,'..','Hammadde_prototip.html'));
let fails=0;const ok=(n,v,extra)=>{if(!v)fails++;console.log((v?'OK  ':'FAIL')+' '+n+(extra!==undefined?' · '+extra:''))};
async function boot(b,ctxOpt){const c=await b.newContext(ctxOpt);const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+FILE+'?debug');await p.waitForFunction(()=>!!window.__ham,null,{timeout:60000});const ev=x=>p.evaluate(x=>window.__ham.ev(x),x);
  await ev("startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(400);
  await ev("if(dlgOpen)bye();tzSkip();tzFinish();if(dlgOpen)bye();renderTut()");await p.waitForTimeout(300);await ev("if(dlgOpen)bye()");return {c,p,ev,errs}}
// the inventory panel may re-render right after it opens (a stale handle has no box): look the element up again
async function boxOf(p,sel){for(let i=0;i<20;i++){const h=await p.$(sel);const r=h&&await h.boundingBox();if(r)return r;await p.waitForTimeout(100)}throw new Error('no box: '+sel)}
async function mdrag(p,a,b){const A=await boxOf(p,a),B=await boxOf(p,b);
  await p.mouse.move(A.x+A.width/2,A.y+A.height/2);await p.mouse.down();await p.mouse.move(A.x+A.width/2+10,A.y+A.height/2+10,{steps:3});
  await p.mouse.move(B.x+B.width/2,B.y+B.height/2,{steps:8});await p.mouse.up();await p.waitForTimeout(150)}
(async()=>{const b=await chromium.launch();
{const {p,ev,errs}=await boot(b,{viewport:{width:1280,height:720}});
 // crafted / bought / forged carryables go to the inventory, not into the hand or onto the belt
 await ev("belt=[];hand=-1;hotK='';renderHot()");
 await ev("gain('Dal',6);gain('Lif',6);gain('Yaprak',6);handCraft('Kaba meşale',true)");
 ok('a hand-made torch lands in the inventory, not on the belt',await ev("inv['Kaba meşale']>=1&&beltIndex('Kaba meşale')<0&&hand===-1"));
 await ev("coins=5000;forged.add('Taş kazma');player.x=smith.x;player.y=smith.y+16;openMenu('shop')");await p.waitForTimeout(200);await p.click('[data-buy="Taş kazma"]');await p.waitForTimeout(150);
 ok('a tool bought from Dursun lands in the inventory',await ev("inv['Taş kazma']===1&&beltIndex('Taş kazma')<0"));await ev("closeCraft()");
 // a full belt never drops tools on the ground
 await ev("drops.length=0;for(const n of ['Olta','Tuzak','Kürek','Tırmık','Sulama kabı','Tırpan','Taş kılıç','Mızrak','Ağ','Yaprak kova'])gain(n)");await p.waitForTimeout(300);
 ok('no ground drops when there are more carryables than slots',await ev("drops.length===0&&['Olta','Tuzak','Kürek','Tırpan','Ağ'].every(n=>inv[n]===1)"));
 // mouse: drag onto a slot, reorder, drag off
 await ev("openMenu('inv')");await p.waitForTimeout(200);
 await mdrag(p,'.itile[data-n="Kaba meşale"]','[data-bs="0"]');ok('drag item → slot 1',await ev("hotList()[0]==='Kaba meşale'"));
 await mdrag(p,'.itile[data-n="Taş kazma"]','[data-bs="1"]');await mdrag(p,'[data-bs="0"]','[data-bs="3"]');
 ok('drag slot → slot reorders',await ev("hotList()[3]==='Kaba meşale'&&hotList()[0]===null&&hotList()[1]==='Taş kazma'"));
 await mdrag(p,'[data-bs="1"]','#crafttitle');ok('drag slot off the belt unassigns (item stays in the inventory)',await ev("beltIndex('Taş kazma')<0&&inv['Taş kazma']===1"));
 // click item → click slot, and the "Yuvadan çıkar" action
 await p.click('.itile[data-n="Olta"]');await p.click('[data-bs="4"]');ok('click item then slot assigns',await ev("hotList()[4]==='Olta'"));
 await p.click('.itile[data-n="Olta"]');await p.click('[data-ia="unbelt"]');ok('"Yuvadan çıkar" empties the slot',await ev("beltIndex('Olta')<0"));
 ok('inventory shows category tabs',await ev("['food','raw','made','carry','wear'].every(k=>!!cbody.querySelector('[data-it=\"'+k+'\"]'))"));
 await ev("closeCraft()");
 // keys select slots; the same key again empties the hand
 await p.keyboard.press('Digit4');ok('key 4 takes the torch',await ev("held()==='Kaba meşale'"));await p.keyboard.press('Digit4');ok('same key again empties the hand',await ev("hand===-1"));
 // save → load keeps the slots; an old save (only "ho") is migrated
 const r=await ev("(()=>{beltSet(0,'Taş balta');setHand(0);const s=JSON.parse(JSON.stringify(snapshot()));const want=JSON.stringify(hotList());applyState(s);return [want,JSON.stringify(hotList()),hand]})()");
 ok('save → load keeps slot assignments and the hand',r[0]===r[1]&&r[2]===0,r.join(' | '));
 const m=await ev("(()=>{const s=JSON.parse(JSON.stringify(snapshot()));delete s.bt;s.ho=['Taş kazma','Kaba meşale'];applyState(s);return hotList().slice(0,3)})()");
 ok('an old save without slots: its bar order becomes the slots',m[0]==='Taş kazma'&&m[1]==='Kaba meşale'&&!!m[2],JSON.stringify(m));
 // a used-up item leaves its slot as a faded shortcut; a new one fills it again
 await ev("beltSet(5-1,'Tuzak');inv['Tuzak']=0;renderHot()");ok('a used-up item leaves a faded slot',await ev("hotList()[4]===null&&belt[4]==='Tuzak'&&!!document.querySelector('#hotbar .hs.ghost')"));
 await ev("gain('Tuzak')");ok('a new one goes back into its slot',await ev("hotList()[4]==='Tuzak'"));
 // cauldron: one per click, hold for all; + still works
 await ev("for(const n of ['Taş','Dal','Keskin taş'])if(n in inv)inv[n]=0;gain('Taş',10);gain('Dal',5);foundSet.delete('Sopa');found.splice(found.indexOf('Sopa'),1);player.x=cauldron.x;player.y=cauldron.y+16;openMenu('craft');selectRecipe('Sopa');renderCraft()");await p.waitForTimeout(200);
 await p.click('.tile[data-n="Dal"]');await p.waitForTimeout(80);ok('one click puts ONE in the cauldron',await ev("putSum(0)+putSum(1)===1"));
 ok('rows show put / needed',await ev("/1 \\/ 3/.test(cbody.querySelector('.ping').textContent)"));
 {const el=await p.$('.tile[data-n="Dal"]');await el.scrollIntoViewIfNeeded();const t=await el.boundingBox();await p.mouse.move(t.x+20,t.y+20);await p.mouse.down();await p.waitForTimeout(500);await p.mouse.up();await p.waitForTimeout(150)}
 ok('press and hold fills the rest of that ingredient',await ev("REC.get('Sopa').i.every(([m],i)=>m!=='Dal'||needLeft(i)<=0)&&inv['Dal']===2"));
 await ev("gain('Keskin taş',2);renderCraft()");await p.waitForTimeout(250);{const el=await p.$('.tile[data-n="Keskin taş"]');await el.scrollIntoViewIfNeeded();const t=await el.boundingBox();await p.mouse.move(t.x+20,t.y+20);await p.mouse.down();await p.waitForTimeout(500);await p.mouse.up();await p.waitForTimeout(150)}
 ok('cauldron ready after hold',await ev("potReady()"),await ev("JSON.stringify({put:pot.put,r:pot.r,ks:inv['Keskin taş'],m:$('cmsg').textContent})"));await p.click('#brew');await p.waitForTimeout(150);ok('"Tarifi öğren" still brews',await ev("foundSet.has('Sopa')"));
 await ev("closeCraft();inv['Taş balta']=0;forged.delete('Taş balta');for(const n of ['Keskin taş','Sopa','İp'])if(n in inv)inv[n]=0;gain('Taş',10);gain('Dal',4);gain('İp',2);gain('Sopa',1);player.x=smith.x;player.y=smith.y+16;openMenu('forge');selectRecipe('Taş balta');renderCraft()");await p.waitForTimeout(200);
 await p.click('.ping .sb[data-sub="Keskin taş"]');await p.click('.ping .sb[data-sub="Keskin taş"]');await p.waitForTimeout(100);
 ok('+ quick sub-recipe still works and drops onto the anvil',await ev("REC.get('Taş balta').i.every(([m],i)=>m!=='Keskin taş'||needLeft(i)<=0)"));
 await p.click('#pfill');await p.waitForTimeout(80);await p.click('#brew');await p.waitForTimeout(300);ok('anvil still forges',await ev("inv['Taş balta']===1"));
 await ev("closeCraft();if(dlgOpen)bye()");
 // hard mode: "Deneyerek bul" still takes one kind per tap
 await p.waitForTimeout(900);await ev("if(dlgOpen)bye();if(craftOpen)closeCraft();player.x=cauldron.x;player.y=cauldron.y+16;diff='hard';potMode='dene';trial=[];openMenu('craft')");await p.waitForTimeout(300);await ev("cbody.querySelector('.tile[data-n=\"Taş\"]').click()");await p.waitForTimeout(80);
 ok('hard mode trial adds a kind',await ev("trial.length===1&&trial[0]==='Taş'"));await ev("closeCraft();diff='normal';potMode='tarif';trial=[]");
 // recipe book: a grid, no crafting buttons, hover shows name and ingredients
 await ev("openMenu('book')");await p.waitForTimeout(200);
 ok('book is a grid of squares (open = icon, closed = ?)',await ev("!!cbody.querySelector('.bkgrid .bk.open img')&&!!cbody.querySelector('.bk.lk i')&&!cbody.querySelector('[data-pick],[data-make]')"));
 await (await p.$('.bk.lk')).hover();await p.waitForTimeout(100);ok('hovering a closed square shows a masked name and ingredients',await ev("!!$('bkinfo').querySelector('.gn')&&$('bkinfo').querySelectorAll('.chips2 span').length>0"));
 await (await p.$('.bk.open')).hover();await p.waitForTimeout(100);ok('hovering a found square shows its name',await ev("!$('bkinfo').querySelector('.gn')&&$('bkinfo').textContent.length>3"));
 await ev("closeCraft()");
 // HUD: exit above settings, character above the minimap
 const L=await p.evaluate(()=>{const r=i=>document.getElementById(i).getBoundingClientRect();return {ex:r('b-exit'),se:r('b-set'),ch:r('b-char'),mi:r('mini')}});
 ok('exit sits above settings, same size',L.ex.bottom<=L.se.top+1&&Math.abs(L.ex.width-L.se.width)<2&&Math.abs(L.ex.height-L.se.height)<2);
 ok('character button sits right above the minimap',L.ch.bottom<=L.mi.top+1&&L.mi.top-L.ch.bottom<30&&Math.abs(L.ch.right-L.mi.right)<3);
 ok('no page errors (desktop)',!errs.length,errs.slice(0,3).join(' | '))}
// the tutorial axe: made at the anvil it goes to the inventory and the card says how to put it on the belt
{const {p,ev,errs}=await boot(b,{viewport:{width:1280,height:720}});
 await ev("applyState(null);startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(400);await ev("if(dlgOpen)bye()");
 await ev("tz=13;met=false;for(const r of ['Taş balta','Sopa','İp','Keskin taş'])if(!foundSet.has(r)){found.push(r);foundSet.add(r)}gain('Sopa',1);gain('Keskin taş',2);gain('İp',2);gain('Taş',2);player.x=smith.x;player.y=smith.y+16;openMenu('forge');selectRecipe('Taş balta');fillAll();brew()");
 await p.waitForTimeout(1200);for(let i=0;i<3;i++){if(await ev("dlgOpen"))await ev("finishType();cl($('dch').querySelector('button'))");await p.waitForTimeout(300)}
 ok('tutorial axe is in the inventory, not the hand',await ev("inv['Taş balta']===1&&hand===-1&&beltIndex('Taş balta')<0"));
 ok('the card tells you to put the axe on the belt',await ev("/kemerine|yuva/i.test($('tutstep').textContent+$('tuttext').textContent)"),await ev("$('tutstep').textContent"));
 await ev("openMenu('inv')");await p.waitForTimeout(200);await mdrag(p,'.itile[data-n="Taş balta"]','[data-bs="0"]');await ev("closeCraft()");await p.keyboard.press('Digit1');
 ok('after dragging it to slot 1, key 1 takes the axe',await ev("held()==='Taş balta'"));
 ok('no page errors (tutorial)',!errs.length,errs.slice(0,3).join(' | '))}
// touch: the prompt is a button, the exit button opens the pause menu, tap item → tap slot
{const {p,ev,errs}=await boot(b,devices['iPhone SE landscape']);
 await ev("gain('Tuzak');beltSet(2,'Tuzak');setHand(2);animals.length=0;for(let k=0;k<400;k++){const x=player.x+((k*37)%300)-150,y=player.y+((k*53)%300)-150;if(tileAt(x,y)<=1&&reachAt(x,y)&&!blocked(x,y)&&!nodes.some(n=>n.alive&&Math.hypot(n.x-x,n.y-y)<30)){player.x=x;player.y=y;break}}");await p.waitForTimeout(400);
 ok('touch: the prompt becomes a tappable action button',await ev("!prompt.hidden&&prompt.classList.contains('act')&&getComputedStyle(prompt).pointerEvents==='auto'"),await ev("prompt.textContent"));
 await p.tap('#prompt');await p.waitForTimeout(250);ok('touch: tapping it sets the trap',await ev("traps.length===1"));
 ok('touch: tutorial card lets taps through',await ev("getComputedStyle($('tut')).pointerEvents==='none'"));
 await p.tap('#b-exit');await p.waitForTimeout(150);ok('touch: exit button opens the pause menu',await ev("paused&&!$('pause').hidden"));await ev("resume()");
 await ev("gain('Olta');openMenu('inv')");await p.waitForTimeout(200);await ev("cbody.querySelector('.itile[data-n=\"Olta\"]').click()");await p.waitForTimeout(80);await p.tap('[data-bs="3"]');
 ok('touch: tap item → tap slot assigns',await ev("hotList()[3]==='Olta'"));
 ok('touch: close button hides "(Esc)"',await ev("getComputedStyle($('closecraft').querySelector('.esc')).display==='none'"));await ev("closeCraft()");
 const w=await p.evaluate(()=>{const h=document.getElementById('hotbar').getBoundingClientRect(),c=document.getElementById('coinbox').getBoundingClientRect();return {over:!(h.right<=c.left||h.left>=c.right||h.bottom<=c.top||h.top>=c.bottom),off:h.left<0||h.right>innerWidth}});
 ok('touch: hotbar does not overlap the coin box or leave the screen',!w.over&&!w.off);
 await ev("skills.add('A8');hotK='';renderHot()");const w2=await p.evaluate(()=>{const h=document.getElementById('hotbar').getBoundingClientRect();return h.left>=0&&h.right<=innerWidth});ok('touch: 12 slots still fit (scrolls)',w2);
 ok('no page errors (touch)',!errs.length,errs.slice(0,3).join(' | '))}
await b.close();console.log(fails?`${fails} FAIL`:'ALL OK');process.exit(fails?1:0)})();
