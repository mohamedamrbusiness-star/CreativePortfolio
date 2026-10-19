const KEY='pf_draft';
async function loadData(){try{const d=localStorage.getItem(KEY);if(d)return JSON.parse(d)}catch(e){}return JSON.parse(JSON.stringify(window.PF_DATA))}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function media(p){const u=(p.url||'').trim();if(!u)return{k:'none'};let m;
if(m=u.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/))return{k:'frame',src:'https://www.youtube.com/embed/'+m[1],yt:m[1]};
if(m=u.match(/vimeo\.com\/(\d+)/))return{k:'frame',src:'https://player.vimeo.com/video/'+m[1]};
if(m=u.match(/drive\.google\.com\/file\/d\/([\w-]+)/))return p.type==='video'?{k:'frame',src:'https://drive.google.com/file/d/'+m[1]+'/preview'}:{k:'img',src:'https://drive.google.com/thumbnail?id='+m[1]+'&sz=w1600'};
if(p.type==='video'||/\.(mp4|webm|mov)(\?|$)/i.test(u))return{k:'video',src:u};
return{k:'img',src:u}}
function thumb(p){const m=media(p);
if(m.k==='img')return`<img loading="lazy" src="${esc(m.src)}" alt="${esc(p.title)}">`;
if(m.k==='video')return`<video src="${esc(m.src)}#t=0.5" muted preload="metadata"></video>`;
if(m.yt)return`<img loading="lazy" src="https://img.youtube.com/vi/${m.yt}/hqdefault.jpg" alt="${esc(p.title)}">`;
return`<div class="ph">${p.type==='video'?'▶':'✎'}</div>`}
function full(p){const m=media(p);
if(m.k==='img')return`<img src="${esc(m.src)}" alt="">`;
if(m.k==='video')return`<video src="${esc(m.src)}" controls autoplay playsinline></video>`;
if(m.k==='frame')return`<iframe src="${esc(m.src)}" allow="autoplay;fullscreen" allowfullscreen></iframe>`;
return thumb(p)}
