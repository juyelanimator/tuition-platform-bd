const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json;charset=UTF-8','cache-control':'no-store'}});
const id=()=>crypto.randomUUID();
const clean=(s='')=>String(s).trim().slice(0,500);
function basicAuth(req){const h=req.headers.get('authorization')||'';if(!h.startsWith('Bearer '))return null;return h.slice(7);}
async function api(req,env){const url=new URL(req.url), path=url.pathname;
  if(req.method==='GET'&&path==='/api/health')return json({ok:true,app:env.APP_NAME||'Tuition Platform BD'});
  if(req.method==='GET'&&path==='/api/tuitions'){
    const p=url.searchParams, where=['t.status=\'published\'',"t.expires_at > datetime('now')"], args=[];
    for(const [key,col] of [['division','t.division'],['district','t.district'],['thana','t.thana'],['tuition_type','t.tuition_type'],['class_level','t.class_level']]) if(p.get(key)){where.push(`${col} = ?`);args.push(clean(p.get(key)));}
    if(p.get('q')){where.push('(t.code LIKE ? OR t.subjects LIKE ? OR t.area LIKE ? OR t.description LIKE ?)');const q=`%${clean(p.get('q'))}%`;args.push(q,q,q,q);}
    const {results}=await env.DB.prepare(`SELECT t.*,m.name media_name,m.logo_url FROM tuitions t LEFT JOIN media m ON m.id=t.media_id WHERE ${where.join(' AND ')} ORDER BY t.featured DESC,t.published_at DESC LIMIT 60`).bind(...args).all();
    return json({items:results||[]});
  }
  if(req.method==='GET'&&path.startsWith('/api/tuitions/')){const code=path.split('/').pop();const row=await env.DB.prepare('SELECT t.*,m.name media_name,m.logo_url FROM tuitions t LEFT JOIN media m ON m.id=t.media_id WHERE t.code=?').bind(code).first();if(!row)return json({error:'Not found'},404);await env.DB.prepare('UPDATE tuitions SET views=views+1 WHERE code=?').bind(code).run();return json({item:row});}
  if(req.method==='POST'&&path.startsWith('/api/tuitions/')&&path.endsWith('/reports')){const code=path.split('/')[3], body=await req.json();const t=await env.DB.prepare('SELECT id FROM tuitions WHERE code=?').bind(code).first();if(!t)return json({error:'Not found'},404);await env.DB.prepare('INSERT INTO reports(id,tuition_id,reason,details) VALUES(?,?,?,?)').bind(id(),t.id,clean(body.reason||'Other'),clean(body.details||'')).run();return json({ok:true},201);}
  if(req.method==='POST'&&path==='/api/auth/login'){const b=await req.json(), role=b.role==='media'?'media':'admin';if(role==='admin'){if(b.username!=='admin'||!env.ADMIN_PASSWORD||b.password!==env.ADMIN_PASSWORD)return json({error:'Invalid credentials'},401);const token=id();await env.DB.prepare('INSERT INTO sessions(id,role,expires_at) VALUES(?,?,datetime(\'now\',\'+24 hours\'))').bind(token,'admin').run();return json({token,role});}return json({error:'Media login requires an admin-created account'},403);}
  if(req.method==='GET'&&path==='/api/admin/summary'){const token=basicAuth(req);const s=token&&await env.DB.prepare("SELECT * FROM sessions WHERE id=? AND expires_at>datetime('now') AND role='admin'").bind(token).first();if(!s)return json({error:'Unauthorized'},401);const [t,m,r,v]=await Promise.all([env.DB.prepare('SELECT COUNT(*) c FROM tuitions').first(),env.DB.prepare('SELECT COUNT(*) c FROM media').first(),env.DB.prepare("SELECT COUNT(*) c FROM reports WHERE status='new'").first(),env.DB.prepare('SELECT COALESCE(SUM(views),0) c FROM tuitions').first()]);return json({tuitions:t.c,media:m.c,reports:r.c,views:v.c});}
  return json({error:'Route not found'},404);
}
export default {async fetch(req,env,ctx){if(new URL(req.url).pathname.startsWith('/api/')){try{return await api(req,env)}catch(e){return json({error:'Server error',detail:e.message},500)}}return env.ASSETS.fetch(req)}};
