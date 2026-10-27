const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForTimeout(600);
 console.log(await p.evaluate(()=>window.__ham.ev(`JSON.stringify({w:wakeSpot,e:ekinWalkIn,h:npc.home,homeDry:(()=>{for(let k=0;k<=40;k++){const x=wakeSpot.x+(npc.home.x-wakeSpot.x)*k/40,y=wakeSpot.y+(npc.home.y-wakeSpot.y)*k/40;if(isWater(tileAt(x,y)))return 'water at '+k}return 'dry'})()})`)));
 await p.click('#t-new');await p.click('#c-go');await p.click('#d-normal');await p.waitForTimeout(1500);await p.click('#cineskip');
 for(const [ms,n] of [[1800,'w1'],[2200,'w2'],[2600,'w3']]){await p.waitForTimeout(ms);await p.screenshot({path:`shots/${n}.png`})}
 await p.waitForSelector('#dlg:not([hidden])',{timeout:10000});
 for(let i=0;i<3;i++){await p.click('#dch button');await p.waitForTimeout(120)}
 await p.keyboard.type('Kaan');await p.keyboard.press('Enter');await p.waitForTimeout(150);
 await p.keyboard.press('Enter');await p.waitForTimeout(150);await p.keyboard.press('Enter');await p.waitForTimeout(150);
 await p.keyboard.press('Enter');await p.waitForTimeout(2500);await p.screenshot({path:'shots/w4.png'});
 console.log(await p.evaluate(()=>window.__ham.ev('heroName+"/"+loveName+"/"+met+"/"+tut+"/"+!!wake+"/"+document.body.className')));
 console.log('errors',errs);await b.close()})();
