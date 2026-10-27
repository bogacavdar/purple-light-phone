const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham);
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await p.mouse.click(5,5);await ev("startNew('normal');endCine()");await p.waitForTimeout(400);
console.log('wake dlg, esc');await p.keyboard.press('Escape');await p.waitForTimeout(100);console.log('still open',await ev('dlgOpen'));
await p.waitForTimeout(3500);console.log('wake dlg open',await ev('dlgOpen'),'x visible',await p.isVisible('#dclose'));
await ev("wakeDone();wakeDone2()");await p.waitForTimeout(2000);
await ev("say('deneme',[{t:'Tamam',f:bye}])");await p.waitForTimeout(200);
await p.screenshot({path:'shots/d1.png'});
await p.click('#dclose');await p.waitForTimeout(100);console.log('closed by x',!(await ev('dlgOpen')));
await ev("say('deneme',[{t:'Tamam',f:bye}])");await p.mouse.click(300,300);await p.waitForTimeout(100);console.log('closed by world click',!(await ev('dlgOpen')));
console.log('ouch buf',await ev("!!window.__hamAudio"));
await ev("hurt(12,'test',true)");await p.waitForTimeout(300);
// tap-walk into a tree
await ev("const t=trees.sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y))[0];window._t=t;player.x=t.x;player.y=t.y-40;goal={x:t.x,y:t.y+40,reach:4,t:0,chk:0,best:1e9}");
await p.waitForTimeout(4000);console.log('goal walk end dy',await ev("Math.round(player.y-_t.y)+' dx '+Math.round(player.x-_t.x)+' goal '+!!goal"));
console.log(errs);await b.close()})();
