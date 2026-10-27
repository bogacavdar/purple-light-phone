const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const [nm,o] of [['d',{viewport:{width:1280,height:720}}],['m',{viewport:{width:844,height:390},isMobile:true,hasTouch:true,deviceScaleFactor:2}]]){
const p=await b.newPage(o);const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham,null,{timeout:60000});
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await p.waitForTimeout(800);await p.screenshot({path:`shots/u_${nm}1.png`});
await p.click('#t-new');await p.waitForTimeout(300);await p.screenshot({path:`shots/u_${nm}2.png`});
await p.click('[data-cg="k"]');await p.click('[data-ck="hair"][data-cv="3"]');await p.click('[data-ck="gl"][data-cv="round"]');await p.click('[data-ck="hat"][data-cv="hasir"]');await p.waitForTimeout(100);
await p.screenshot({path:`shots/u_${nm}3.png`});
await p.click('#c-go');await p.waitForTimeout(200);console.log(nm,'diff visible',await ev("!$('tdiff').hidden"),await ev("JSON.stringify([LOOK.hero.gender,LOOK.hero.hat,LOOK.love.hs])"));
await p.click('#d-normal');await p.waitForTimeout(9000);await p.screenshot({path:`shots/u_${nm}4.png`});
await p.waitForTimeout(8000);await p.screenshot({path:`shots/u_${nm}5.png`});
await ev("endCine()");await p.waitForTimeout(5000);await p.screenshot({path:`shots/u_${nm}6.png`});
await ev("wakeDone();wakeDone2()");await p.waitForTimeout(1500);await p.screenshot({path:`shots/u_${nm}7.png`});
await ev("exitToMenu()");await p.waitForTimeout(400);console.log('on title',await ev('onTitle'),await ev("$('t-cont').textContent"));
await p.click('#t-exit');await p.waitForTimeout(300);console.log('quit shown',await ev("!$('quit').hidden"));await p.screenshot({path:`shots/u_${nm}8.png`});
console.log(nm,errs);await p.close()}
await b.close()})();
