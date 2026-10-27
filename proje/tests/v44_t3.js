const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').resolve(process.argv[3]||'Hammadde_prototip.html')+'?debug');await p.waitForFunction(()=>!!window.__ham,null,{timeout:60000});
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await ev("startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(800);
for(const [nm,setup] of [['home',"player.x=spawn.x;player.y=spawn.y-40;weather={k:'açık',t:99}"],['swamp rain',"player.x=toygar.x;player.y=toygar.y+40;weather={k:'yağmur',t:99}"],['swamp fog',"weather={k:'sis',t:99}"],['ash storm',"const c=CLUES[4];player.x=c.x;player.y=c.y+30;weather={k:'fırtına',t:99}"]]){
 await ev(setup);await p.waitForTimeout(500);const f=await p.evaluate(()=>new Promise(r=>{let n=0;const t0=performance.now();const g=()=>{n++;if(performance.now()-t0<2000)requestAnimationFrame(g);else r(n/2)};requestAnimationFrame(g)}));console.log(nm,'fps',f)}
console.log(errs);await b.close()})();
