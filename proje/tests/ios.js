const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();const c=await b.newContext({...devices['iPhone 13']});await c.addInitScript(()=>{delete Element.prototype.requestFullscreen;Element.prototype.webkitRequestFullscreen=undefined});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html');await p.waitForTimeout(1500);
await p.tap('#r-ios');await p.waitForTimeout(200);await p.screenshot({path:'shots/ios1.png'});console.log(errs);await b.close()})();
