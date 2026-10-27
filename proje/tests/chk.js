const fs=require('fs'),acorn=require('acorn');
const h=fs.readFileSync(process.argv[2],'utf8');
const re=/<script(?![^>]*type="application\/json")[^>]*>([\s\S]*?)<\/script>/g;let m,i=0,bad=0;
while((m=re.exec(h))){i++;for(const v of [2018]){try{acorn.parse(m[1],{ecmaVersion:v,sourceType:'script'})}catch(e){bad++;const line=m[1].split('\n')[e.loc.line-1]||'';console.log('script',i,'ES'+v,e.message,line.slice(Math.max(0,e.loc.column-60),e.loc.column+60))}}}
console.log('scripts',i,'errors',bad, '?. count',(h.match(/\?\.(?!\d)/g)||[]).length,'?? count',(h.match(/\?\?/g)||[]).length);
