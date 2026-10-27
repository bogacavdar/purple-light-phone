const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham,null,{timeout:60000});
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await ev("startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(800);
await ev("const d=snapshot();d.mv=2;d.qv=2;d.tut=15;d.qState='active';delete d.lk;delete d.ll;delete d.gv;delete d.bf;window._d=d;applyState(d)");await p.waitForTimeout(500);
console.log(await ev("JSON.stringify({tut,qState,q:QUESTS[tut-11].t,x:Math.round(player.x),bridge:bridge.fixed,look:LOOK.hero.hair})"));
console.log(errs);await b.close()})();
