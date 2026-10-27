const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await c.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham);
const ev=x=>p.evaluate(x=>window.__ham.ev(x),x);
await ev("startNew('normal');endCine()");await p.waitForTimeout(200);await ev("wakeDone();wakeDone2()");await p.evaluate(()=>window.__ham.skip());
await ev("giveTool('Taş balta');gain('Hasır yatak');hotK=''");await p.waitForTimeout(3500);
await p.tap('#hotbar [data-hs="1"]');await p.waitForTimeout(300);await p.screenshot({path:'shots/m10.png'});
// trader quest
await ev("tut=17;qState='talk';met=true");await ev("offer()");await p.waitForTimeout(100);await p.tap('#dch button');await p.waitForTimeout(200);
console.log('trader',await ev("trader.called+' '+trader.nextAt+' '+playTime"));
await ev("playTime=trader.nextAt+1");await p.waitForTimeout(300);console.log(await ev("trader.state+' '+JSON.stringify(trader.wants)"));
await ev("gain('Dal',5);gain('Taş',5);gain('Lif',3);talkTrader();traderOrder()");await p.waitForTimeout(100);await p.tap('#dch button');await p.waitForTimeout(300);
console.log('first',await ev("trader.firstDone+' '+qState"));
console.log(errs);await b.close()})();
