// v48 regression test (batch 1 bug fixes): node tests/v48_bugs.js [Hammadde_prototip.html]
// NODE_PATH=/opt/npm-tools/node_modules (playwright) and /opt/node-tools/node_modules (acorn)
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const FILE=path.resolve(process.argv[2]||path.join(__dirname,'..','Hammadde_prototip.html'));
let fails=0;const ok=(n,v,extra)=>{if(!v)fails++;console.log((v?'OK  ':'FAIL')+' '+n+(extra!==undefined?' · '+extra:''))};

// ---- static: no duplicate keys in one object literal (the v47 qv:4 … qv:2 bug), no ?. / ?? in code ----
{const acorn=require('acorn'),walk=require('acorn-walk');const h=fs.readFileSync(FILE,'utf8');
 const re=/<script(?![^>]*type="application\/json")[^>]*>([\s\S]*?)<\/script>/g;let m,dups=[];
 while((m=re.exec(h))){const ast=acorn.parse(m[1],{ecmaVersion:2018});walk.full(ast,n=>{if(n.type!=='ObjectExpression')return;const seen={};
   for(const p of n.properties){if(p.type!=='Property'||p.computed)continue;const k=p.key.name||p.key.value;if(seen[k])dups.push(k);seen[k]=1}})}
 ok('no duplicate keys in object literals',!dups.length,dups.join(','));
 const json=JSON.parse(/<script type="application\/json" id="db">([\s\S]*?)<\/script>/.exec(h)[1]),file=JSON.parse(fs.readFileSync(path.join(path.dirname(FILE),'recipes3.json'),'utf8'));
 ok('in-file DB equals recipes3.json',JSON.stringify(json)===JSON.stringify(file))}

(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+FILE+'?debug');await p.waitForFunction(()=>!!window.__ham,null,{timeout:60000});
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await ev("startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(400);
await ev("if(dlgOpen)bye();tzSkip();tzFinish();if(dlgOpen)bye();renderTut()");

// A1: the quest index survives save → load (and an old v47 save with qv:2 is read as v47)
{let bad=[];for(const i of [0,1,2,3,5,8,10,14,16]){await p.evaluate(i=>window.__ham.q(i),i);
   const r=await ev("(()=>{const t0=tut;applyState(JSON.parse(JSON.stringify(snapshot())));const a=tut;window.__ham.q("+i+");const s=JSON.parse(JSON.stringify(snapshot()));s.qv=2;applyState(s);return [t0,a,tut]})()");
   if(r[0]!==r[1]||r[0]!==r[2])bad.push(i+':'+r.join('/'))}
 ok('quest index save/load roundtrip (incl. broken v47 qv:2 saves)',!bad.length,bad.join(' '))}
await p.evaluate(()=>window.__ham.q(0));

// A4/A7: a hostile or broken import cannot run script and cannot break the slot list
{const pay='<img src=x onerror="window.__X=(window.__X||0)+1">';
 const code=await ev(`(()=>{const s=snapshot();s.inv[${JSON.stringify(pay)}]=3;s.order.push(${JSON.stringify(pay)});s.hn=${JSON.stringify(pay)};s.coins='5';s.eq={bas:${JSON.stringify(pay)}};
   const a={s1:{t:Date.now(),lvl:'<img src=x onerror="window.__X=(window.__X||0)+100">',coins:'x',rec:'<b>1</b>',diff:'x',data:s},s2:{data:{inv:{}}},s3:{t:1,data:{inv:{'Taş':'5'},mv:2}}};
   return XFER_HEAD+btoa(unescape(encodeURIComponent(JSON.stringify(a))))})()`);
 await ev("exitToMenu()");await p.waitForTimeout(200);await ev("openXfer('im')");await p.fill('#x-in',code);await p.click('#x-go');await ev("closeXfer()");
 await p.click('#t-load');await p.waitForTimeout(300);const n=await ev("$('tslots').querySelectorAll('[data-slot]').length");
 await p.click('[data-slot="s1"]');await p.waitForTimeout(600);for(const m of ['inv','char','book','sell']){await ev(`openMenu('${m}')`);await p.waitForTimeout(150);await ev("if(craftOpen)closeCraft()")}
 await p.waitForTimeout(300);ok('import: no script runs (XSS)',!(await ev("window.__X||0")));ok('import: broken slots still listed',n===4,n);
 ok('import: numbers stay numbers',await ev("typeof coins==='number'&&!isNaN(coins)"));
 await ev("applyState({inv:{'Taş':'5'},mv:2});gain('Taş',1)");ok('import: save without order loads, string counts become numbers',await ev("inv['Taş']===6&&order.indexOf('Taş')>=0"))}

// A3: one exception in a frame does not freeze the game; unknown equipment is dropped on load
{await ev("equip.bas='Bilinmeyen şapka'");const t0=await ev("time");await p.waitForTimeout(800);const t1=await ev("time");
 ok('frame loop survives an exception',t1>t0+.3,(t1-t0).toFixed(2));await ev("equip.bas=null");
 ok('unknown equipment is not restored',await ev("(()=>{const s=snapshot();s.eq={bas:'Yok böyle',govde:'Kemik zırh',silah:'Taş kılıç'};applyState(s);return equip.bas===null&&equip.govde==='Kemik zırh'&&equip.silah==='Taş kılıç'})()"))}

// A2: no saving while on the Misty Isle; Rüstem's materials are only taken at the end
{await ev("applyState(JSON.parse(JSON.stringify(snapshot())));closeTitle();tut=11+QUESTS.length;lvl=10;CLUES.forEach(c=>clues.add(c.id));balikci.shown=true;balikci.met=true;BALIK_WANT.forEach(([n,q])=>gain(n,q));renderInv();launchBoat(balikci)");
 await p.waitForTimeout(5200);ok('Misty Isle is running',await ev("sis.on"));
 ok('no autosave on the Misty Isle',await ev("saveTo('auto')===false"));ok('materials kept until the end',await ev("BALIK_WANT.every(([n,q])=>inv[n]>=q)"));
 await ev("resetState()");ok('reset closes the Misty Isle',await ev("!sis.on&&$('sisov').hidden"));
 await ev("applyState(null);startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(300);await ev("if(dlgOpen)bye();tzSkip();tzFinish();if(dlgOpen)bye()")}

// B1: selling everything keeps torches, beds and other belt things
{await ev("gain('Kaba meşale');gain('Hasır yatak');gain('Taş',5);gain('Dal',3);player.x=market.x-8;player.y=market.y+12;mktTab='sell';openMenu('sell')");await p.waitForTimeout(200);await p.click('#sellall');await p.waitForTimeout(150);
 ok('sell-all keeps torch and bed',await ev("inv['Kaba meşale']>0&&inv['Hasır yatak']>0&&!(inv['Taş']>0)"));await ev("closeCraft()")}

// D4: F never picks a known poison
{await ev("for(const n of order)if(foodVal(n)>0)inv[n]=0;gain('Kuzukulağı',3);gain('Kurt eti',2);gain('Böğürtlen',1);food=40");await ev("eatBest()");
 ok('eatBest skips poison',await ev("inv['Böğürtlen']===0&&inv['Kuzukulağı']===3&&inv['Kurt eti']===2"));await ev("if(craftOpen)closeCraft()")}

// D1/D2: no buy → sell profit for any tool, Usta item, house, seed or market item, even with every trade skill at level 100
{const bad=await ev(`(()=>{const saveS=[...skills],saveL=lvl;for(const s of SKILLS)skills.add(s.id);lvl=100;for(const c of CATS)codex[c]=3;const bad=[];
   const top=n=>Math.max(unitPrice(n),unitPrice(n,true));
   for(const n of Object.keys(GT))if(GT[n].price&&top(n)>=toolPrice(n))bad.push(n);
   for(const x of DB.R)if(!FORGED.has(x.r)&&top(x.r)>=ustaPrice(x.r))bad.push(x.r);
   for(const H of HOUSES)if(top(H.n)>=houseCost(H))bad.push(H.n);
   for(const n of Object.keys(PRICE_))if(rawPrice(n)<=top(n))bad.push(n);
   const m=sellMult('Kor',true);skills.clear();saveS.forEach(s=>skills.add(s));lvl=saveL;for(const c of CATS)codex[c]=0;return bad.slice(0,8).concat(m>2.3001?['mult '+m]:[])})()`);
 ok('no buy→sell profit (tools, Usta, houses, market)',!bad.length,bad.join(', '));
 await ev("coins=100000;skills.add('T3');skills.add('T8');lvl=100;forged.add('Sapan')");
 const net=await ev("(()=>{const c0=coins;for(let i=0;i<200;i++){coins-=toolPrice('Sapan');giveTool('Sapan');shopBuy('Sapan');sell('Sapan',1)}return coins-c0})()");
 ok('lucky customer does not pay double on shop goods',net<0,net);await ev("lvl=1;skills.delete('T3');skills.delete('T8');coins=0")}

// B2: dusk warning on day 1 and no item loss on the first night
{await ev("gain('Kaba meşale');gain('Taş balta');holdTool('Taş balta');gain('Taş',10);coins=50;player.x+=400;if(dlgOpen)bye();if(craftOpen)closeCraft();dayT=1050.5");
 let dusk=false;for(let i=0;i<30&&!dusk;i++){await p.waitForTimeout(100);dusk=await ev("torchTut===2&&duskDay===1")}   // poll: frame timing differs between machines
 ok('dusk (17:30) torch reminder',dusk,await ev("[torchTut,duskDay,Math.round(dayT),paused,onTitle].join(',')"));
 await ev("dayT=1290;darkT=0");let died=false;for(let i=0;i<70&&!died;i++){await p.waitForTimeout(500);died=await ev("!!beam||fading")}
 await p.waitForTimeout(4500);ok('night 1: nothing lost',await ev("inv['Taş']===10&&coins===50&&graves.length===0"));await ev("if(dlgOpen)bye()")}

// B4: E prefers a resource next to an NPC over talking
{const k=await ev("hand=-1;const n=nodes.find(n=>n.alive&&!n.mine);n.x=npc.x+10;n.y=npc.y+6;player.x=npc.x+12;player.y=npc.y+10;target().kind");ok('E gathers before talking',k==='node',k)}

// D3: codex counts only reachable recipes; willows give withies
ok('codex thresholds use reachable recipes',await ev("catN('Ağaç')===Math.max(1,DB.R.filter(x=>x.c==='Ağaç'&&reachable().has(x.r)).length)&&reachable().has('Balık kapanı')"));
// v48 b4: every recipe has a source now
ok('all recipes reachable (b4)',await ev("DB.R.every(x=>reachable().has(x.r))"));

// ---- v48c regression checks (QA_V48B) ----
// K1: a quill that knocks you out in the middle of the shot loop (faint() empties shots) must not crash the frame
{await ev("if(dlgOpen)bye();if(craftOpen)closeCraft();fading=false;hp=1;pInv=0;dodge=null;for(let i=0;i<6;i++)shots.push({x:player.x,y:player.y-8,vx:0,vy:0,life:1,c:'#fff',dmg:50,k:'Oklu kirpi'})");
 const e0=errs.length;let crashed=null;try{await ev("tickShots(.016)")}catch(e){crashed=e.message}
 ok('shots: fainting inside the shot loop does not crash',!crashed&&errs.length===e0,crashed||'');
 await p.waitForTimeout(4200);await ev("if(dlgOpen)bye();hp=maxHP();shots.length=0")}
// Y3: early spawns — no Oklu kirpi before Sv8+day5 (or Sv10); only one thrower at a time below Sv10; boars gentler on early days
{const r=await ev(`(()=>{const L0=lvl,D0=day,P={x:player.x,y:player.y};const res={};
   const run=(L,D,n)=>{lvl=L;day=D;let ok=0,two=0;for(let i=0;i<n;i++){animals.length=0;spawnAnimals();if(animals.some(a=>a.k==='Oklu kirpi'))ok++;if(animals.filter(a=>ANIM[a.k].ranged&&ANIM[a.k].temper==='saldırgan'&&!ANIM[a.k].z).length>1)two++}return [ok,two]};
   const spots=nodes.filter(n=>zoneAt(n.x,n.y)===0).slice(0,40);
   let early=[0,0],late=[0,0];for(const s of spots.slice(0,15)){player.x=s.x;player.y=s.y;const a=run(9,4,4),b=run(10,6,4);early[0]+=a[0];early[1]+=a[1];late[0]+=b[0];late[1]+=b[1]}
   animals.length=0;lvl=L0;day=D0;player.x=P.x;player.y=P.y;return {early,late}})()`);
 ok('spawn: no Oklu kirpi at Sv9 / day 4',r.early[0]===0,JSON.stringify(r));
 ok('spawn: never two hostile throwers at once below Sv10',r.early[1]===0,JSON.stringify(r));
 ok('spawn: boar bites softer on day 2',await ev("(()=>{const d0=day,l0=lvl;day=2;lvl=3;const a={k:'Yaban domuzu'};const s=boarSoft(a);day=5;lvl=6;const t=boarSoft(a);day=d0;lvl=l0;return s&&!t})()"))}
// Y4: the leaf shelter costs what quest 3 says (5 sikke) and still cannot be sold at a profit
ok('shelter costs 5 sikke',await ev("houseCost(HOUSES.find(h=>h.n==='Yaprak barınağı'))===5"));
// O10: durability never goes below zero, and a blunt tool hits like a bare fist
{const r=await ev(`(()=>{gain('Taş balta');giveTool('Taş balta');toolDur['Taş balta']=0;beltSet(0,'Taş balta');setHand(0);const w=weapon();
   const s=JSON.parse(JSON.stringify(snapshot()));s.toolDur={'Taş balta':-7};applyState(s);const d=toolDur['Taş balta'];setHand(-1);return [w.n,w.dmg,d]})()`);
 ok('durability: a blunt axe is not a weapon, and −7 loads as 0',r[0]===null&&r[1]===4&&r[2]===0,JSON.stringify(r))}
// Y2: touch — press and hold a carryable, drag it onto slot 2 (synthetic touch pointer events)
{await ev("if(craftOpen)closeCraft();gain('Taş kazma');giveTool('Taş kazma');beltRemove('Taş kazma');invTab='all';openMenu('inv')");await p.waitForTimeout(300);
 const r=await p.evaluate(async()=>{const q=s=>document.querySelector(s);const t=q('.itile[data-n="Taş kazma"]'),sl=q('[data-bs="1"]');if(!t||!sl)return 'no element';
   const A=t.getBoundingClientRect(),B=sl.getBoundingClientRect();const ax=A.left+A.width/2,ay=A.top+A.height/2,bx=B.left+B.width/2,by=B.top+B.height/2;
   const pe=(el,type,x,y)=>el.dispatchEvent(new PointerEvent(type,{bubbles:true,cancelable:true,pointerId:7,pointerType:'touch',isPrimary:true,clientX:x,clientY:y,button:0}));
   pe(t,'pointerdown',ax,ay);await new Promise(r=>setTimeout(r,400));for(let k=1;k<=8;k++)pe(window,'pointermove',ax+(bx-ax)*k/8,ay+(by-ay)*k/8);pe(window,'pointerup',bx,by);return 'ok'});
 ok('touch: hold + drag a tool onto slot 2',await ev("hotList()[1]==='Taş kazma'"),r);
 const r2=await p.evaluate(async()=>{const t=document.querySelector('.itile[data-n="Taş kazma"]');if(!t)return 'no';const A=t.getBoundingClientRect();const x=A.left+A.width/2,y=A.top+A.height/2;
   const pe=(el,type,x,y)=>el.dispatchEvent(new PointerEvent(type,{bubbles:true,cancelable:true,pointerId:8,pointerType:'touch',isPrimary:true,clientX:x,clientY:y,button:0}));
   pe(t,'pointerdown',x,y);pe(window,'pointermove',x+30,y+40);pe(window,'pointerup',x+30,y+40);return 'ok'});
 ok('touch: a quick swipe does not start a drag',await ev("!document.getElementById('ghost')&&hotList()[1]==='Taş kazma'"),r2);await ev("closeCraft()")}
// O5: the cauldron card keeps counting what is already in the cauldron
ok('tz4: ingredients in the cauldron still count',await ev(`(()=>{const t0=tz;tz=4;foundSet.delete('Kaba meşale');for(const n of ['Dal','Lif','Yaprak'])inv[n]=0;pot.r='Kaba meşale';pot.put=[{'Dal':2},{'Lif':2},{'Yaprak':2}];const L=tzNeed();pot.r=null;pot.put=[];tz=t0;return L.length===0})()`));
ok('no page errors',!errs.length,errs.slice(0,3).join(' | '));
await b.close();console.log(fails?`${fails} FAIL`:'ALL OK');process.exit(fails?1:0)})();
