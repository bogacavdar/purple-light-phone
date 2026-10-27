const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));
await p.goto('file:///home/claude/proje/Hammadde_prototip.html?debug');await p.waitForFunction(()=>!!window.__ham,null,{timeout:60000});
const ev=c=>p.evaluate(c=>window.__ham.ev(c),c);
await ev("startNew('normal');endCine()");await p.waitForTimeout(300);await ev("wakeDone();wakeDone2()");await p.waitForTimeout(1500);
await ev("walked=true;tapMoved=true;mapSeen=2;ytut=3;tut=11;qState='active';questsHidden=true;renderTut()");
// move to open land away from camps
await ev("player.x=W*.3*T;player.y=H*.35*T;for(let k=0;k<300&&(!reachAt(player.x,player.y)||blocked(player.x,player.y)||nearCamp(player.x,player.y));k++){player.x+=16}");
await ev("animals.length=0;animals.push({k:'Yaban domuzu',x:player.x+40,y:player.y,hp:ANIM['Yaban domuzu'].hp,st:'wander',t:0,dx:0,dy:0,face:-1,atk:0,flash:0,kb:null,step:0,mad:true})");
await p.waitForTimeout(450);const w=await ev("JSON.stringify({wind:animals[0].wind,hp:Math.round(hp)})");console.log('boar wind',w);
await p.screenshot({path:'shots/c1.png',clip:{x:490,y:240,width:300,height:240}});
await p.waitForTimeout(1500);console.log('after bite hp',await ev('Math.round(hp)'),'fx',await ev('JSON.stringify(pfx)'));
// dodge test: during wind, dodge
await ev("hp=100;pfx={};animals[0].atk=0;animals[0].wind=0;animals[0].x=player.x+30;animals[0].y=player.y");await p.waitForTimeout(100);
for(let i=0;i<30;i++){const wd=await ev('animals[0].wind||0');if(wd>0)break;await p.waitForTimeout(30)}
await p.keyboard.down('KeyS');await p.keyboard.press('KeyQ');await p.waitForTimeout(250);await p.keyboard.up('KeyS');await p.waitForTimeout(700);console.log('after dodge hp',await ev('Math.round(hp)'));
// frog shot
await ev("animals.length=0;hp=100;pfx={};const x=player.x+90;animals.push({k:'Zehirli kurbağa',x,y:player.y,hp:50,st:'wander',t:0,dx:0,dy:0,face:-1,atk:0,flash:0,kb:null,step:0,mad:true})");
await p.waitForTimeout(1200);console.log('shots',await ev('shots.length'));await p.screenshot({path:'shots/c2.png',clip:{x:440,y:240,width:400,height:240}});
await p.waitForTimeout(800);console.log('frog hp',await ev('Math.round(hp)'),'fx',await ev("Object.keys(pfx).join(',')"),'fxbar',await ev("$('fxbar').textContent"));
await p.screenshot({path:'shots/c3.png',clip:{x:0,y:0,width:400,height:200}});
// zone 2 creatures
await ev("animals.length=0;pfx={};hp=1000;player.x=W*.88*T;player.y=H*.5*T;for(let k=0;k<300&&(!reachAt(player.x,player.y)||blocked(player.x,player.y));k++){player.x-=16};const P=player;[['Kül kurdu',-50,-30],['Lav kertenkelesi',50,-30],['Kara ejder',0,50]].forEach(([k,dx,dy])=>animals.push({k,x:P.x+dx,y:P.y+dy,hp:ANIM[k].hp,st:'wander',t:0,dx:0,dy:0,face:1,atk:9,flash:0,kb:null,step:0,mad:false}))");
await p.waitForTimeout(300);await p.screenshot({path:'shots/c4.png'});
await ev("animals.length=0;player.x=W*.62*T;player.y=H*.3*T;for(let k=0;k<300&&(!reachAt(player.x,player.y)||blocked(player.x,player.y));k++){player.y+=16};const P=player;[['Timsah',-50,-20],['Bataklık kurdu',50,-30],['Zehirli kurbağa',0,40],['Dikenli kirpi',40,30]].forEach(([k,dx,dy])=>animals.push({k,x:P.x+dx,y:P.y+dy,hp:ANIM[k].hp,st:'wander',t:0,dx:0,dy:0,face:1,atk:9,flash:0,kb:null,step:0,mad:false}))");
await p.waitForTimeout(300);await p.screenshot({path:'shots/c5.png'});
console.log(errs);await b.close()})();
