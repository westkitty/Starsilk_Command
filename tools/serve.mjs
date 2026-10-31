import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
const root=resolve(import.meta.dirname,'..');const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.json':'application/json'};
http.createServer(async(req,res)=>{
  try{const u=new URL(req.url,'http://localhost');const pathname=decodeURIComponent(u.pathname);const file=resolve(root,'.'+pathname,(pathname.endsWith('/')?'index.html':''));
    if(file!==root&&!file.startsWith(root+sep) || /\/\./.test(file.slice(root.length)) || /\/(tests|tools)\//.test(file) || /\/(package|README|OPERATIONAL_STATE|Starsilk_Command_bible)/.test(file)){res.writeHead(404);res.end();return;}
    const info=await stat(file);if(!info.isFile()){res.writeHead(404);res.end();return;}
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(await readFile(file));
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,()=>console.log(`Starsilk Command ready at http://localhost:${port}`));
