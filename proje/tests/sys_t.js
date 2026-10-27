const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham);
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
const spot=async(n)=>JSON.parse(await ev(`(()=>{const pt=Math.floor(player.x/T),pq=Math.floor(player.y/T);for(let r=2;r<12;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){const tx=pt+dx,ty=pq+dy;const f=footOf('${'$'}{n}',placing?placing.rot:0);if(placeOK('${'$'}{n}',placing?placing.rot:0,tx,ty)&&!(player.x>tx*T-8&&player.x<(tx+f[0])*T+8&&player.y>ty*T-8&&player.y<(ty+f[1])*T+8)){const wx=(tx+f[0]/2)*T,wy=(ty+f[1]/2)*T;return JSON.stringify({x:(wx-cam.cx)*S,y:(wy-cam.cy)*S})}}return 'null'})()`));

await ev("startNew('normal');endCine()");await p.waitForTimeout(200);await ev("wakeDone();wakeDone2();heroName='Kaan';loveName='Ela'");await p.evaluate(()=>window.__ham.skip());
// Kemal
await p.evaluate(()=>window.__ham.tp('usta'));await p.waitForTimeout(300);await ev("talkUsta()");await p.waitForTimeout(200);await p.screenshot({path:'shots/k1.png'});
await ev("openUsta()");await p.waitForTimeout(200);await p.screenshot({path:'shots/k2.png'});await ev("closeCraft()");
console.log('bed',await ev("inv['Hasır yatak']+' hot '+hotList().join(',')"));
// select bed in hotbar -> placement
const idx=await ev("beltAuto('Hasır yatak'),hotK='',renderHot(),hotList().indexOf('Hasır yatak')");/* v48: gifts go to the inventory; put the bed on the belt first */await p.keyboard.press('Digit'+((idx+1)%10));await p.waitForTimeout(200);
await p.keyboard.press('KeyQ');await p.waitForTimeout(100);let sp=await spot('Hasır yatak');console.log('spot',sp);await p.mouse.move(sp.x,sp.y);await p.waitForTimeout(200);await p.screenshot({path:'shots/k3.png'});await p.mouse.click(sp.x,sp.y);await p.waitForTimeout(300);
console.log('placed',await ev("JSON.stringify(placed)+' placing '+!!placing"));
await p.screenshot({path:'shots/k4.png'});
// sleep at night
const pl=await ev("JSON.stringify(placed[0])");const o=JSON.parse(pl);
await ev(`player.x=(${o.tx}+2)*T+8;player.y=(${o.ty})*T+8;dayT=1300`);await ev("useplaced(placed[0])");await p.waitForTimeout(4000);
console.log('after sleep',await ev("day+' '+hhmm()"));await p.screenshot({path:'shots/k5.png'});
// workshop
await ev("coins=1000;bought.add('Atölye');gain('Atölye',1);gain('Lif',40);gain('Taş',20);renderInv();hotK=''");
const i2=await ev("beltAuto('Atölye'),hotK='',renderHot(),hotList().indexOf('Atölye')");await p.keyboard.press('Digit'+((i2+1)%10));await p.waitForTimeout(100);sp=await spot('Atölye');await p.mouse.move(sp.x,sp.y);await p.waitForTimeout(150);await p.mouse.click(sp.x,sp.y);await p.waitForTimeout(300);
console.log('placed2',await ev("placed.length"));
await ev("openWorkshop(placed[placed.length-1])");await p.waitForTimeout(200);
await p.click('[data-wsr="İp"]').catch(e=>console.log('no ip',e.message));await p.waitForTimeout(150);await p.click('#wsall');await p.waitForTimeout(200);await p.screenshot({path:'shots/k6.png'});
await ev("placed[placed.length-1].ws.t=24.9");await p.waitForTimeout(400);console.log('ws out',await ev("placed[placed.length-1].ws.out"));
await ev("closeCraft()");
// long press move
await ev("hand=-1;placing=null;hotK=''");
// cauldron groups
await p.evaluate(()=>window.__ham.tp('witch'));await ev("gain('Keskin taş',3);gain('Dal',10);gain('Lif',10)");await p.waitForTimeout(200);await p.keyboard.press('KeyB');await p.waitForTimeout(300);await p.screenshot({path:'shots/k7.png'});
await p.click('#potby');await p.fill('#flt','lif');await p.waitForTimeout(200);await p.screenshot({path:'shots/k8.png'});
console.log(errs);await b.close()})();
