// v46 smoke test: node tests/v46_t.js <ekran klasörü> Hammadde_prototip.html
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').resolve(process.argv[3]||'Hammadde_prototip.html')+'?debug');await p.waitForFunction(()=>!!window.__ham,null,{timeout:60000});
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);const S=process.argv[2];const ok=(n,v)=>console.log((v?'OK  ':'FAIL')+' '+n);
await ev("startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(300);
// D1: the free night torch must not lock the tutorial at step 4
await ev("if(dlgOpen)bye();tz=4;witchShown=true;witchMet=true;met=true;dayT=1320;player.x=cauldron.x+60;player.y=cauldron.y+60");await p.waitForTimeout(2500);
ok('night torch does not teach the recipe in the tutorial',!(await ev("foundSet.has('Kaba meşale')")));
await ev("gain('Dal',2);gain('Lif',2);gain('Yaprak',2);player.x=cauldron.x;player.y=cauldron.y+14");await p.waitForTimeout(300);await ev("openMenu('craft')");await p.waitForTimeout(200);await p.click('#craft [data-rec="Kaba meşale"]');await p.click('#pfill');await p.click('#brew');await p.waitForTimeout(300);
ok('tutorial moves on after learning the torch',await ev("tz")===5);
await ev("if(dlgOpen)bye();closeCraft();tzSkip();tzFinish();food=100;hp=100;loveName='Mavi';heroName='Deniz'");await p.waitForTimeout(300);await ev("if(dlgOpen)bye()");
// D2: menus stop hunger and the clock
await ev("openMenu('book')");const f0=await ev("food+'|'+dayT");await p.waitForTimeout(1200);ok('menus pause the world',f0===await ev("food+'|'+dayT"));await ev("closeCraft()");
// campfire
await ev("found.push('Kamp ateşi');foundSet.add('Kamp ateşi');gain('Kamp ateşi');gain('Tavşan eti',2);player.x=spawn.x+200;player.y=spawn.y-200;dayT=1250");await p.waitForTimeout(300);
await p.keyboard.press('v');await p.waitForTimeout(300);ok('campfire placed and lit',await ev("camps.length===1&&litAt(player.x,player.y-6)&&nearCamp(player.x,player.y)"));
await ev("cookAll(camps[0],['Tavşan eti']);bye()");ok('meat cooked at the fire',await ev("inv['Közlenmiş tavşan eti']")===2);
await p.screenshot({path:S+'/v46_camp.png'});
// fishing
const sp=JSON.parse(await ev("JSON.stringify((()=>{for(let r=20;r<600;r+=8)for(let a=0;a<6.28;a+=.3){const x=spawn.x+Math.cos(a)*r,y=spawn.y+Math.sin(a)*r;if(reachAt(x,y)&&!blocked(x,y)&&!isWater(tileAt(x,y))&&isWater(tileAt(x,y+16)))return{x,y}}})())"));
await ev(`dayT=600;giveTool('Olta');renderInv();holdTool('Olta');player.x=${sp.x};player.y=${sp.y};player.face={x:0,y:1}`);await p.waitForTimeout(300);
await p.keyboard.press('e');await p.waitForTimeout(200);await ev("fish.need=.1");await p.waitForTimeout(400);await p.keyboard.press('e');await p.waitForTimeout(100);
for(let i=0;i<300;i++){if(await ev("fish&&fish.pos>fish.z0+.02&&fish.pos<fish.z1-.02")){await p.keyboard.press('e');break}await p.waitForTimeout(10)}
ok('a fish was caught',await ev("toolDur['Olta']")===24);
// traps
await ev("giveTool('Tuzak');renderInv();holdTool('Tuzak');player.x=spawn.x+120;player.y=spawn.y-150");await p.waitForTimeout(300);await p.keyboard.press('e');await p.waitForTimeout(200);
await ev("traps[0].t=.05");await p.waitForTimeout(500);ok('trap caught something',await ev("!!(traps[0]&&traps[0].got)"));
// night finds
await ev("dayT=1300;player.x=spawn.x+400;player.y=spawn.y-500");await p.waitForTimeout(7000);ok('night finds and fireflies',await ev("nodes.some(n=>n.night)&&flies.length>0"));
await ev("dayT=600");await p.waitForTimeout(1200);ok('night finds vanish by day',await ev("!nodes.some(n=>n.night)"));
// memory + riddle
await ev("for(const x of DB.R.slice(0,12))if(!foundSet.has(x.r)){found.push(x.r);foundSet.add(x.r)}");await p.waitForTimeout(2000);ok('first memory plays',await ev("!!memCur&&memCur.i===0"));
for(let i=0;i<4;i++){await p.keyboard.press('Enter');await p.waitForTimeout(150)}
await ev("['Dal','Taş','Lif','Yaprak','Su','Böğürtlen','Kuru ot'].forEach(n=>seen.add(n));riddle=pickRiddle()");const rr=await ev("riddle&&riddle.r");const c0=await ev("coins");
await ev(`found.push('${rr}');foundSet.add('${rr}')`);await p.waitForTimeout(1500);ok('riddle solved and paid',!!rr&&await ev("coins")>c0);
// save round trip
await ev("marks.push({x:1,y:2,t:'A',c:'#fff'})");const s1=await ev("JSON.stringify(v46Save().mk)");await ev("applyState(JSON.parse(JSON.stringify(snapshot())))");ok('v46 state survives a save',s1===await ev("JSON.stringify(v46Save().mk)"));
// Sisli Ada
await ev("balikci.shown=true;launchBoat(balikci)");await p.waitForTimeout(5200);ok('Sisli Ada opens',await ev("sis.on"));await p.screenshot({path:S+'/v46_sis.png'});
for(const i of [0,1,2]){await ev(`sis.x=SIS_IT[${i}].x+8;sis.y=SIS_IT[${i}].y+10`);await p.waitForTimeout(150);await p.keyboard.press('e');await p.waitForTimeout(150)}
await ev("sis.x=360;sis.y=230");await p.waitForTimeout(500);await p.click('#sis-skip');await p.waitForTimeout(1200);await p.click('#sis-skip');await p.waitForTimeout(9000);
ok('ending after Sisli Ada',await ev("sisDone&&won"));
console.log('errs',errs);await b.close()})();
