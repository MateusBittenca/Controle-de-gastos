
// @ts-nocheck — lógica migrada do protótipo; tipagem gradual em refactors futuros
/* ════════════════════════════════════
   SVG ICONS
════════════════════════════════════ */
const IC={
  salary:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="16" height="11" rx="2"/><path d="M2 9h16"/><circle cx="10" cy="13" r="1.5" fill="currentColor" stroke="none"/></svg>`,
  freelance:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><rect x="3" y="3" width="14" height="11" rx="2"/><path d="M7 17h6M10 14v3M7 7h2M7 10h6"/></svg>`,
  invest:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3 16l4-6 3 3 3-5 4 4"/><path d="M14 8h3v3"/></svg>`,
  other_in:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="7"/><path d="M10 7v3l2 2"/></svg>`,
  housing:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3 9.5L10 3l7 6.5"/><path d="M5 9v8h4v-4h2v4h4V9"/></svg>`,
  food:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M6 2v5a3 3 0 006 0V2M9 2v16M14 2v4a2 2 0 01-2 2v10"/></svg>`,
  transport:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><rect x="2" y="7" width="16" height="8" rx="2"/><path d="M5 15v2M15 15v2M2 10h16M6 7l1.5-3h5L14 7"/><circle cx="6" cy="12.5" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="12.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  health:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 17C5 13 2 10 2 7a4 4 0 018-1 4 4 0 018 1c0 3-3 6-8 10z"/></svg>`,
  leisure:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 4l2 4h5l-4 3 1.5 4.5L10 13l-4.5 2.5L7 11 3 8h5z"/></svg>`,
  education:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 3L2 8l8 5 8-5-8-5z"/><path d="M6 10.5v4c0 2 1.8 3 4 3s4-1 4-3v-4"/></svg>`,
  utilities:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M11 2L6 11h5l-2 7 7-9h-5l2-7z"/></svg>`,
  other_ex:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><rect x="3" y="6" width="14" height="10" rx="2"/><path d="M7 6V5a3 3 0 016 0v1"/></svg>`,
  shield:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 2l6 2.5v5c0 4-2.5 7-6 8.5C4.5 16.5 2 13.5 2 9.5v-5L10 2z"/></svg>`,
  plane:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M17 3L3 9l5 2.5L11 17l2-6 4-8z"/></svg>`,
  laptop:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><rect x="3" y="4" width="14" height="10" rx="2"/><path d="M1 16h18"/></svg>`,
  home:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3 9.5L10 3l7 6.5"/><path d="M5 9v8h4v-4h2v4h4V9"/></svg>`,
  car:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><rect x="2" y="8" width="16" height="7" rx="2"/><path d="M5 15v2M15 15v2M2 11h16M5 8l2-4h6l2 4"/><circle cx="6" cy="12.5" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="12.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  star:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 2l2.4 4.9 5.6.8-4 3.9 1 5.4L10 14.5 5 17l1-5.4L2 7.7l5.6-.8z"/></svg>`,
  coin:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="7"/><path d="M10 7v6M8 8.5c0-1 .9-1.5 2-1.5s2 .5 2 1.5-1 1.5-2 1.5-2 .5-2 1.5.9 1.5 2 1.5 2-.5 2-1.5"/></svg>`,
  bag:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><rect x="3" y="6" width="14" height="11" rx="2"/><path d="M7 6V5a3 3 0 016 0v1"/></svg>`,
  trash:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3 6h14M8 6V4h4v2M6 6l1 11h6l1-11"/></svg>`,
  warning:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 2l8 14H2L10 2z"/><path d="M10 8v4M10 14v.5"/></svg>`,
  check:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 10l4 4 8-8"/></svg>`,
  plus:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M10 4v12M4 10h12"/></svg>`,
  arr_up:`<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M5 8V2M2 5l3-3 3 3"/></svg>`,
  arr_dn:`<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M5 2v6M2 5l3 3 3-3"/></svg>`,
  e_txn:`<svg viewBox="0 0 52 52" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><rect x="8" y="12" width="36" height="28" rx="4"/><path d="M8 21h36M16 30h10M16 35h6"/><circle cx="37" cy="33" r="7" fill="white" stroke-width="1.3"/><path d="M34 33h6M37 30v6"/></svg>`,
  e_gen:`<svg viewBox="0 0 52 52" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><circle cx="26" cy="20" r="11"/><path d="M8 46c0-9.9 8.1-18 18-18s18 8.1 18 18"/></svg>`,
};

/* ════════════════════════════════════
   CATEGORIES
════════════════════════════════════ */
const CATS={
  income:[
    {id:'salary',    name:'Salário',       icon:'salary',    color:'#2D6A4F',bg:'#E8F5EF'},
    {id:'freelance', name:'Freelance',     icon:'freelance', color:'#1A4A7A',bg:'#E8F0FA'},
    {id:'invest',    name:'Investimentos', icon:'invest',    color:'#8B5E00',bg:'#FFF3D6'},
    {id:'other_in',  name:'Outros',        icon:'other_in',  color:'#2D6A4F',bg:'#E8F5EF'},
  ],
  expense:[
    {id:'housing',   name:'Moradia',       icon:'housing',   color:'#1A1916',bg:'#F0EFEB'},
    {id:'food',      name:'Alimentação',   icon:'food',      color:'#6B6560',bg:'#EFEDE8'},
    {id:'transport', name:'Transporte',    icon:'transport', color:'#1A4A7A',bg:'#E8F0FA'},
    {id:'health',    name:'Saúde',         icon:'health',    color:'#9B2335',bg:'#F9ECEE'},
    {id:'leisure',   name:'Lazer',         icon:'leisure',   color:'#2D6A4F',bg:'#E8F5EF'},
    {id:'education', name:'Educação',      icon:'education', color:'#8B5E00',bg:'#FFF3D6'},
    {id:'utilities', name:'Utilidades',    icon:'utilities', color:'#8B5E00',bg:'#FFF3D6'},
    {id:'other_ex',  name:'Outros',        icon:'other_ex',  color:'#6B6560',bg:'#EFEDE8'},
  ]
};
const ALL_CATS=[...CATS.income,...CATS.expense];
const getCat=id=>ALL_CATS.find(c=>c.id===id)||{name:id,icon:'other_ex',color:'#8C8980',bg:'#EFEDE8'};
const DONUT_PAL=['#1A1916','#1A4A7A','#2D6A4F','#8B5E00','#9B2335','#6B6560'];

/* ════════════════════════════════════
   STATE & DB
════════════════════════════════════ */
import { api } from './api/client.js';
import { DB, setDB, uid } from './state.js';

let period='month', txnType='income', txnFilter='all', recurType='expense';

function save(){ /* persistência via API em cada mutação */ }

/* ════════════════════════════════════
   THEME
════════════════════════════════════ */
function applyTheme(theme, animate=true){
  if(animate){document.body.classList.add('theme-transition');setTimeout(()=>document.body.classList.remove('theme-transition'),400);}
  document.documentElement.setAttribute('data-theme',theme);
  localStorage.setItem('fin_theme',theme);
  const isLight=theme==='light';
  const tog=document.getElementById('tog-theme');
  if(tog)tog.classList.toggle('on',isLight);
  const sub=document.getElementById('theme-sub');
  if(sub)sub.textContent=isLight?'Ativado':'Desativado';
}

async function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme')||'light';
  const next=cur==='light'?'dark':'light';
  applyTheme(next);
  try{await api.patchProfile({theme:next});}catch{/* cache local ok */}
  toast(cur==='light'?'Modo escuro ativado':'Modo claro ativado');
}

/* ════════════════════════════════════
   RANGES
════════════════════════════════════ */
function getRange(p){
  const now=new Date(),y=now.getFullYear(),m=now.getMonth();
  if(p==='week'){const d=now.getDay()||7;const s=new Date(now);s.setDate(now.getDate()-d+1);s.setHours(0,0,0,0);const e=new Date(s);e.setDate(s.getDate()+6);return[s,e];}
  if(p==='month')return[new Date(y,m,1),new Date(y,m+1,0)];
  if(p==='quarter'){const q=Math.floor(m/3)*3;return[new Date(y,q,1),new Date(y,q+3,0)];}
  return[new Date(y,0,1),new Date(y,11,31)];
}
function getPrev(p){
  const now=new Date(),y=now.getFullYear(),m=now.getMonth();
  if(p==='week'){const[s,e]=getRange(p);const rs=new Date(s);rs.setDate(rs.getDate()-7);const re=new Date(e);re.setDate(re.getDate()-7);return[rs,re];}
  if(p==='month')return[new Date(y,m-1,1),new Date(y,m,0)];
  if(p==='quarter'){const q=Math.floor(m/3)*3;return[new Date(y,q-3,1),new Date(y,q,0)];}
  return[new Date(y-1,0,1),new Date(y-1,11,31)];
}
function inRange(ds,[a,b]){const d=new Date(ds+'T12:00:00');return d>=a&&d<=b;}

/* ════════════════════════════════════
   FORMAT
════════════════════════════════════ */
const SYM={BRL:'R$ ',USD:'$ ',EUR:'€ ',GBP:'£ '};
function fmt(n){return(SYM[DB.profile?.currency]||'R$ ')+Math.abs(n).toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:0});}
function fmtH(n){return DB.profile?.prefs?.hideValues?'••••':fmt(n);}

/* ════════════════════════════════════
   TOAST
════════════════════════════════════ */
let _tt;
function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(_tt);_tt=setTimeout(()=>el.classList.remove('show'),2400);}

/* ════════════════════════════════════
   NAVIGATION
════════════════════════════════════ */
function goPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelectorAll('[data-page]').forEach(el=>el.classList.toggle('active',el.dataset.page===id));
  ({overview:renderOverview,transactions:renderTxns,budget:renderBudget,goals:renderGoals,recurring:renderRecurring,profile:renderProfile,score:renderScore,ai:renderAI})[id]?.();
}
document.querySelectorAll('[data-page]').forEach(el=>el.addEventListener('click',()=>goPage(el.dataset.page)));
document.querySelectorAll('.period-tab').forEach(t=>t.addEventListener('click',function(){
  document.querySelectorAll('.period-tab').forEach(x=>x.classList.remove('active'));
  this.classList.add('active');period=this.dataset.period;renderOverview();
}));

/* ════════════════════════════════════
   OVERVIEW
════════════════════════════════════ */
function renderOverview(){
  const txns=DB.transactions.filter(t=>inRange(t.date,getRange(period)));
  const inc=txns.filter(t=>t.type==='income').reduce((s,t)=>s+t.amt,0);
  const exp=txns.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amt,0);
  const bal=inc-exp;
  const lbls={week:'Esta semana',month:new Date().toLocaleDateString('pt-BR',{month:'long',year:'numeric'}),quarter:'Este trimestre',year:String(new Date().getFullYear())};
  document.getElementById('overview-title').textContent=lbls[period];
  document.getElementById('kpi-bal').textContent=fmtH(bal);
  document.getElementById('kpi-inc').textContent=fmtH(inc);
  document.getElementById('kpi-exp').textContent=fmtH(exp);
  const prev=DB.transactions.filter(t=>inRange(t.date,getPrev(period)));
  const pI=prev.filter(t=>t.type==='income').reduce((s,t)=>s+t.amt,0);
  const pE=prev.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amt,0);
  setBadge('kpi-bal-b',bal,pI-pE,false);setBadge('kpi-inc-b',inc,pI,false);setBadge('kpi-exp-b',exp,pE,true);
  renderBarChart();renderDonut(txns);renderOvGoal();renderRecentTxns(txns);
}

function setBadge(id,curr,prev,invert){
  const el=document.getElementById(id);if(!el)return;
  const diff=prev>0?((curr-prev)/prev*100):curr>0?100:0;
  const up=curr>=prev;
  el.innerHTML=(up?IC.arr_up:IC.arr_dn)+Math.abs(diff).toFixed(1)+'%';
  el.className='badge '+((invert?!up:up)?'badge-up':'badge-down');
}

function renderBarChart(){
  const chart=document.getElementById('barChart');chart.innerHTML='';
  const now=new Date();
  const months=Array.from({length:7},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth()-6+i,1);return{lbl:d.toLocaleDateString('pt-BR',{month:'short'}).replace('.',''),y:d.getFullYear(),m:d.getMonth()};});
  const data=months.map(({y,m})=>{const r=[new Date(y,m,1),new Date(y,m+1,0)];const t=DB.transactions.filter(t=>inRange(t.date,r));return{inc:t.filter(t=>t.type==='income').reduce((s,t)=>s+t.amt,0),exp:t.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amt,0)};});
  const max=Math.max(...data.map(d=>Math.max(d.inc,d.exp)),1);
  months.forEach(({lbl},i)=>{
    const g=document.createElement('div');g.className='bar-group';
    const w=document.createElement('div');w.className='bar-wrap';
    const ib=document.createElement('div');ib.className='bar inc';ib.style.cssText=`height:0%;transition:height .6s cubic-bezier(.25,.46,.45,.94) ${i*.055}s`;
    const eb=document.createElement('div');eb.className='bar exp';eb.style.cssText=`height:0%;transition:height .6s cubic-bezier(.25,.46,.45,.94) ${i*.055+.035}s`;
    w.append(ib,eb);const lb=document.createElement('div');lb.className='bar-lbl';lb.textContent=lbl;
    g.append(w,lb);chart.appendChild(g);
    requestAnimationFrame(()=>setTimeout(()=>{ib.style.height=(data[i].inc/max*100)+'%';eb.style.height=(data[i].exp/max*100)+'%';},60));
  });
}

function renderDonut(txns){
  const wrap=document.getElementById('donut-wrap');
  const totals={};txns.filter(t=>t.type==='expense').forEach(t=>{totals[t.cat]=(totals[t.cat]||0)+t.amt;});
  const entries=Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const total=entries.reduce((s,[,v])=>s+v,0);
  if(!entries.length){wrap.innerHTML=`<div class="empty" style="padding:20px;width:100%"><div class="empty-ico">${IC.e_gen}</div>Sem despesas no período</div>`;return;}
  const R=52,CX=60,CY=60,SW=20;let angle=-90;let paths='';
  entries.forEach(([,amt],i)=>{
    const deg=(amt/total)*360,a1=angle*Math.PI/180,a2=(angle+deg)*Math.PI/180;
    const x1=CX+R*Math.cos(a1),y1=CY+R*Math.sin(a1),x2=CX+R*Math.cos(a2),y2=CY+R*Math.sin(a2);
    paths+=`<path d="M${CX},${CY} L${x1},${y1} A${R},${R} 0 ${deg>180?1:0},1 ${x2},${y2} Z" fill="${DONUT_PAL[i]}" opacity=".88"/>`;
    angle+=deg;
  });
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  const cirFill=isDark?'#1E1D1A':'white';
  const svg=`<svg width="120" height="120" viewBox="0 0 120 120" style="flex-shrink:0">${paths}<circle cx="${CX}" cy="${CY}" r="${R-SW}" fill="${cirFill}"/><text x="${CX}" y="${CY}" text-anchor="middle" dy=".35em" font-family="DM Serif Display" font-size="13" fill="var(--ink)">${entries.length}</text></svg>`;
  const legend=entries.map(([cid,amt],i)=>{const c=getCat(cid);const pct=((amt/total)*100).toFixed(0);return`<div class="donut-leg-item"><div class="donut-leg-l"><div class="donut-leg-dot" style="background:${DONUT_PAL[i]}"></div><span class="donut-leg-name">${c.name}</span></div><span class="donut-leg-val">${pct}%</span></div>`;}).join('');
  wrap.innerHTML=svg+`<div class="donut-legend">${legend}</div>`;
}

function renderOvGoal(){
  if(!DB.goals.length){document.getElementById('ov-goal-name').textContent='Nenhuma meta criada';document.getElementById('ov-goal-ico').innerHTML='';document.getElementById('ov-goal-fill').style.width='0%';document.getElementById('ov-goal-pct').textContent='—';document.getElementById('ov-goal-target').textContent='—';return;}
  const g=DB.goals[0];const pct=Math.min(100,(g.current/g.target*100)).toFixed(0);
  document.getElementById('ov-goal-ico').innerHTML=IC[g.icon]||IC.star;
  document.getElementById('ov-goal-name').textContent=g.name;
  document.getElementById('ov-goal-fill').style.width=pct+'%';
  document.getElementById('ov-goal-pct').textContent=pct+'% concluído';
  document.getElementById('ov-goal-target').textContent=fmt(g.current)+' / '+fmt(g.target);
}

function renderRecentTxns(txns){
  const el=document.getElementById('recent-txns');
  const sorted=[...txns].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6);
  if(!sorted.length){el.innerHTML=`<div class="empty"><div class="empty-ico">${IC.e_txn}</div>Sem transações. Adicione a primeira!</div>`;return;}
  el.innerHTML=sorted.map(txnRow).join('');attachDel(el);
}

/* ════════════════════════════════════
   TRANSACTIONS
════════════════════════════════════ */
function setFilter(f,el){txnFilter=f;document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));el.classList.add('active');renderTxns();}
function renderTxns(){
  const q=(document.getElementById('search-inp').value||'').toLowerCase();
  let txns=[...DB.transactions].sort((a,b)=>b.date.localeCompare(a.date));
  if(txnFilter!=='all')txns=txns.filter(t=>t.type===txnFilter);
  if(q)txns=txns.filter(t=>t.desc.toLowerCase().includes(q)||getCat(t.cat).name.toLowerCase().includes(q));
  document.getElementById('txn-sub').textContent=txns.length+' registro'+(txns.length!==1?'s':'');
  const el=document.getElementById('all-txns');
  if(!txns.length){el.innerHTML=`<div class="empty"><div class="empty-ico">${IC.e_txn}</div>Nenhuma encontrada.</div>`;return;}
  el.innerHTML=txns.map(txnRow).join('');attachDel(el);
}

function txnRow(t){
  const c=getCat(t.cat),isInc=t.type==='income';
  const d=new Date(t.date+'T12:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});
  const tag=t.isRecur?`<span style="font-size:10px;background:var(--blue-bg);color:var(--blue);padding:1px 6px;border-radius:100px;margin-left:4px">fixo</span>`:'';
  return`<div class="txn-item"><div class="txn-ico" style="background:${c.bg};color:${c.color}">${IC[c.icon]||''}</div><div class="txn-info"><div class="txn-name">${t.desc}${tag}</div><div class="txn-meta">${d} · ${c.name}</div></div><div class="txn-amt ${isInc?'pos':'neg'}">${isInc?'+':'−'}${fmt(t.amt)}</div><button class="txn-del" data-id="${t.id}">${IC.trash}</button></div>`;
}

function attachDel(container){
  container.querySelectorAll('.txn-del').forEach(b=>b.addEventListener('click',async e=>{
    e.stopPropagation();const id=b.dataset.id;try{await api.deleteTransaction(id);DB.transactions=DB.transactions.filter(t=>t.id!==id);renderAll();toast('Transação excluída');}catch{toast('Erro ao excluir');}
  }));
}

/* ════════════════════════════════════
   BUDGET
════════════════════════════════════ */
function renderBudget(){
  const now=new Date(),r=[new Date(now.getFullYear(),now.getMonth(),1),new Date(now.getFullYear(),now.getMonth()+1,0)];
  const spent={};DB.transactions.filter(t=>inRange(t.date,r)&&t.type==='expense').forEach(t=>{spent[t.cat]=(spent[t.cat]||0)+t.amt;});
  const tS=Object.values(spent).reduce((s,v)=>s+v,0),tL=Object.values(DB.budgets).reduce((s,v)=>s+v,0);
  document.getElementById('bud-spent').textContent=fmt(tS);
  document.getElementById('bud-limit').textContent=fmt(tL);
  document.getElementById('bud-avail').textContent=fmt(Math.max(0,tL-tS));
  const grid=document.getElementById('budget-grid');
  const entries=Object.entries(DB.budgets);
  if(!entries.length){grid.innerHTML=`<div class="empty" style="grid-column:1/-1"><div class="empty-ico">${IC.e_gen}</div>Defina limites por categoria</div>`;return;}
  grid.innerHTML=entries.map(([cid,limit],i)=>{
    const c=getCat(cid),s=spent[cid]||0,pct=Math.min(100,(s/limit*100)).toFixed(0),over=s>limit;
    return`<div class="budget-card" style="animation-delay:${i*.05}s"><div class="bud-top"><div class="bud-ico" style="background:${c.bg};color:${c.color}">${IC[c.icon]||''}</div><div class="bud-name">${c.name}</div><button onclick="delBudget('${cid}')" style="background:none;border:none;color:var(--muted);cursor:pointer;display:flex;padding:4px;border-radius:6px;margin-left:auto">${IC.trash}</button></div><div class="bud-vals"><span>${fmt(s)} gasto</span><span>limite ${fmt(limit)}</span></div><div class="bud-bar-bg"><div class="bud-bar-fill" style="width:${pct}%;background:${over?'var(--red)':c.color}"></div></div><div class="bud-hint" style="color:${over?'var(--red)':'var(--muted)'}">${over?IC.warning:IC.check}${over?`Acima em ${fmt(s-limit)}`:`${fmt(limit-s)} disponível`}</div></div>`;
  }).join('');
}
async function delBudget(id){try{await api.deleteBudget(id);delete DB.budgets[id];renderBudget();toast('Limite removido');}catch{toast('Erro ao remover limite');}}

/* ════════════════════════════════════
   GOALS
════════════════════════════════════ */
const G_PAL=[['#E8F5EF','#2D6A4F'],['#E8F0FA','#1A4A7A'],['#FFF3D6','#8B5E00'],['#F9ECEE','#9B2335'],['#EFEDE8','#6B6560']];
function renderGoals(){
  const grid=document.getElementById('goals-grid');
  const cards=DB.goals.map((g,i)=>{
    const pct=Math.min(100,(g.current/g.target*100)).toFixed(0),[bg,fg]=G_PAL[i%G_PAL.length];
    return`<div class="goal-card" style="animation-delay:${i*.06}s"><div class="goal-head"><div class="goal-ico" style="background:${bg};color:${fg}">${IC[g.icon]||IC.star}</div><div><div class="goal-name">${g.name}</div><div class="goal-sub">${pct}% alcançado</div></div></div><div class="goal-bar-bg"><div class="goal-bar-fill" style="width:${pct}%;background:${fg}"></div></div><div class="goal-foot"><span class="goal-pct">${fmt(g.current)} / ${fmt(g.target)}</span><div class="goal-acts"><button class="btn btn-ghost btn-sm" onclick="addToGoal('${g.id}')">+ Aportar</button><button class="btn btn-danger btn-sm" style="padding:7px 9px" onclick="delGoal('${g.id}')">${IC.trash}</button></div></div></div>`;
  }).join('');
  grid.innerHTML=cards+`<button class="goal-add" onclick="openGoalModal()">${IC.plus}<span>Nova meta</span></button>`;
}
async function addToGoal(id){
  const raw=prompt('Valor do aporte (R$):');if(raw===null)return;
  const amt=parseFloat(raw.replace(',','.'));if(!amt||amt<=0){alert('Valor inválido.');return;}
  const g=DB.goals.find(g=>g.id===id);if(g){try{const updated=await api.addToGoal(id,amt);Object.assign(g,updated);renderGoals();renderOvGoal();toast('Aporte registrado!');}catch{await window.finReload();toast('Erro');}}
}
async function delGoal(id){try{await api.deleteGoal(id);DB.goals=DB.goals.filter(g=>g.id!==id);renderGoals();renderOvGoal();toast('Meta removida');}catch{toast('Erro ao remover meta');}}

/* ════════════════════════════════════
   RECURRING
════════════════════════════════════ */
function renderRecurring(){
  const eT=DB.recurring.filter(r=>r.type==='expense').reduce((s,r)=>s+r.amt,0);
  const iT=DB.recurring.filter(r=>r.type==='income').reduce((s,r)=>s+r.amt,0);
  document.getElementById('rec-exp').textContent=fmt(eT);
  document.getElementById('rec-inc').textContent=fmt(iT);
  document.getElementById('rec-bal').textContent=fmt(iT-eT);
  const list=document.getElementById('recur-list');
  if(!DB.recurring.length){list.innerHTML=`<div class="empty"><div class="empty-ico">${IC.e_gen}</div>Nenhuma recorrência.</div>`;return;}
  const fL={monthly:'Mensal',weekly:'Semanal',yearly:'Anual'};
  list.innerHTML=DB.recurring.map(r=>{
    const c=getCat(r.cat),isInc=r.type==='income';
    const nd=new Date(r.next+'T12:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});
    return`<div class="recur-item"><div class="recur-ico" style="background:${c.bg};color:${c.color}">${IC[c.icon]||''}</div><div class="recur-info"><div class="recur-name">${r.desc}</div><div class="recur-freq">${fL[r.freq]||r.freq} · ${c.name}</div></div><div class="recur-right"><div class="recur-amt" style="color:${isInc?'var(--green)':'var(--ink)'}">${isInc?'+':'−'}${fmt(r.amt)}</div><div class="recur-next">próx. ${nd}</div></div><button class="recur-del" onclick="delRecur('${r.id}')">${IC.trash}</button></div>`;
  }).join('');
}
async function delRecur(id){try{await api.deleteRecurring(id);DB.recurring=DB.recurring.filter(r=>r.id!==id);renderRecurring();toast('Recorrência removida');}catch{toast('Erro ao remover recorrência');}}

/* ════════════════════════════════════
   PROFILE
════════════════════════════════════ */
function renderProfile(){
  const p=DB.profile;
  document.getElementById('pf-name-disp').textContent=p.name||'—';
  document.getElementById('pf-email-disp').textContent=p.email||'—';
  document.getElementById('pf-name').value=p.name||'';
  document.getElementById('pf-email').value=p.email||'';
  document.getElementById('pf-salary').value=p.salary||'';
  const letter=(p.name||'M')[0].toUpperCase();
  document.getElementById('av-letter').textContent=letter;
  document.getElementById('sb-av').innerHTML=p.avatarSrc?`<img src="${p.avatarSrc}">`:(letter);
  document.getElementById('sb-name').textContent=p.name||'Mateus';
  document.getElementById('tb-av').innerHTML=p.avatarSrc?`<img src="${p.avatarSrc}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:(letter);
  document.getElementById('ps-txns').textContent=DB.transactions.length;
  document.getElementById('ps-goals').textContent=DB.goals.length;
  document.getElementById('ps-streak').textContent=(DB.streakDays||0)+'d';
  // currency
  document.querySelectorAll('.cur-btn').forEach(b=>{
    b.classList.toggle('active',b.dataset.cur===p.currency);
    b.onclick=async()=>{p.currency=b.dataset.cur;document.querySelectorAll('.cur-btn').forEach(x=>x.classList.toggle('active',x.dataset.cur===p.currency));try{await api.patchProfile({currency:p.currency});toast('Moeda atualizada');renderOverview();}catch{toast('Erro');}};
  });
  // toggles
  const tog=document.getElementById('tog-theme');
  if(tog){const isLight=document.documentElement.getAttribute('data-theme')==='light';tog.classList.toggle('on',isLight);document.getElementById('theme-sub').textContent=isLight?'Ativado':'Desativado';}
  syncTog('tog-budget',p.prefs.budgetAlert);
  syncTog('tog-goals',p.prefs.goalAlert);
  syncTog('tog-hide',p.prefs.hideValues);
  document.getElementById('pin-sub').textContent=p.pin?'Configurado ✓':'Não configurado';
  // avatar image
  if(p.avatarSrc){
    const avEl=document.getElementById('profile-av');
    const existingLetter=avEl.querySelector('span');if(existingLetter)existingLetter.style.display='none';
    if(!avEl.querySelector('img')){const img=document.createElement('img');img.src=p.avatarSrc;avEl.insertBefore(img,avEl.querySelector('.av-overlay'));}
  }
}

function syncTog(id,val){const el=document.getElementById(id);if(el)el.classList.toggle('on',!!val);}
async function togglePref(key,el){DB.profile.prefs[key]=!DB.profile.prefs[key];el.classList.toggle('on',DB.profile.prefs[key]);try{await api.patchProfile({prefs:DB.profile.prefs});toast('Preferência salva');}catch{toast('Erro');}}

async function saveProfile(){
  DB.profile.name=document.getElementById('pf-name').value.trim()||DB.profile.name;
  DB.profile.email=document.getElementById('pf-email').value.trim()||DB.profile.email;
  DB.profile.salary=parseFloat(document.getElementById('pf-salary').value)||0;
  try{const s=await api.patchProfile({name:DB.profile.name,email:DB.profile.email,salary:DB.profile.salary});setDB(s);renderProfile();toast('Perfil salvo!');}catch{toast('Erro ao salvar');}
}

function handleAvatar(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=async ev=>{
    DB.profile.avatarSrc=ev.target?.result as string;
    try{await api.patchProfile({avatarSrc:DB.profile.avatarSrc});renderProfile();toast('Foto atualizada!');}catch{toast('Erro');}
  };
  reader.readAsDataURL(file);
}

async function savePin(){
  const pin=document.getElementById('pin-inp').value;
  if(pin.length!==4||!/^\d+$/.test(pin)){alert('PIN deve ter exatamente 4 dígitos.');return;}
  try{await api.savePin(pin);DB.profile.pin='****';closeModal('pin-overlay');renderProfile();toast('PIN configurado!');}catch{toast('Erro ao salvar PIN');}
}

/* ════════════════════════════════════
   MODALS
════════════════════════════════════ */
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id,e){if(!e||e.target===document.getElementById(id))document.getElementById(id).classList.remove('open');}

function openTxnModal(){
  populateCatSel('txn-cat',txnType);
  document.getElementById('txn-date').value=new Date().toISOString().slice(0,10);
  document.getElementById('txn-amt').value='';
  document.getElementById('txn-desc').value='';
  document.getElementById('txn-recur').checked=false;
  openModal('txn-overlay');
  setTimeout(()=>document.getElementById('txn-amt').focus(),300);
}
function setType(t){txnType=t;document.getElementById('type-inc').classList.toggle('active',t==='income');document.getElementById('type-exp').classList.toggle('active',t==='expense');populateCatSel('txn-cat',t);}
function populateCatSel(id,t){const s=document.getElementById(id);const cats=t==='income'?CATS.income:CATS.expense;s.innerHTML=cats.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');}
async function saveTxn(){
  const amt=parseFloat(document.getElementById('txn-amt').value);
  const desc=document.getElementById('txn-desc').value.trim();
  const cat=document.getElementById('txn-cat').value;
  const date=document.getElementById('txn-date').value;
  const isR=document.getElementById('txn-recur').checked;
  if(!amt||amt<=0){alert('Insira um valor válido.');return;}
  if(!desc){alert('Insira uma descrição.');return;}
  if(!date){alert('Selecione uma data.');return;}
  try{
    const txn=await api.createTransaction({type:txnType,cat,desc,amt,date,isRecur:isR});
    DB.transactions.push(txn);
    if(isR){const r=await api.fetchState();DB.recurring=r.recurring;}
    closeModal('txn-overlay');renderAll();toast('Transação adicionada!');
  }catch{toast('Erro ao salvar');}
}

function openBudModal(){populateCatSel('bud-cat','expense');document.getElementById('bud-amt').value='';openModal('bud-overlay');}
async function saveBudget(){
  const cat=document.getElementById('bud-cat').value;
  const amt=parseFloat(document.getElementById('bud-amt').value);
  if(!amt||amt<=0){alert('Valor inválido.');return;}
  try{await api.setBudget(cat,amt);DB.budgets[cat]=amt;closeModal('bud-overlay');renderBudget();toast('Limite definido!');}catch{toast('Erro ao salvar');}
}

function openGoalModal(){document.getElementById('goal-name').value='';document.getElementById('goal-target').value='';document.getElementById('goal-current').value='0';openModal('goal-overlay');}
async function saveGoal(){
  const name=document.getElementById('goal-name').value.trim();
  const icon=document.getElementById('goal-icon').value;
  const target=parseFloat(document.getElementById('goal-target').value);
  const current=parseFloat(document.getElementById('goal-current').value)||0;
  if(!name){alert('Insira o nome.');return;}if(!target||target<=0){alert('Insira o valor alvo.');return;}
  try{const g=await api.createGoal({name,icon,target,current});DB.goals.push(g);closeModal('goal-overlay');renderGoals();renderOvGoal();toast('Meta criada!');}catch{toast('Erro ao salvar');}
}

function openRecurModal(){setRecurType('expense');document.getElementById('recur-desc').value='';document.getElementById('recur-amt').value='';document.getElementById('recur-next').value=new Date().toISOString().slice(0,10);openModal('recur-overlay');}
function setRecurType(t){recurType=t;document.getElementById('rtype-inc').classList.toggle('active',t==='income');document.getElementById('rtype-exp').classList.toggle('active',t==='expense');populateCatSel('recur-cat',t);}
async function saveRecur(){
  const desc=document.getElementById('recur-desc').value.trim();
  const amt=parseFloat(document.getElementById('recur-amt').value);
  const cat=document.getElementById('recur-cat').value;
  const freq=document.getElementById('recur-freq').value;
  const next=document.getElementById('recur-next').value;
  if(!desc){alert('Insira a descrição.');return;}if(!amt||amt<=0){alert('Valor inválido.');return;}if(!next){alert('Selecione a data.');return;}
  try{const r=await api.createRecurring({type:recurType,cat,desc,amt,freq,next});DB.recurring.push(r);closeModal('recur-overlay');renderRecurring();toast('Recorrência adicionada!');}catch{toast('Erro ao salvar');}
}

function openPinModal(){document.getElementById('pin-inp').value='';openModal('pin-overlay');}

/* ════════════════════════════════════
   DATA TOOLS
════════════════════════════════════ */
function exportData(){
  const txns=[...DB.transactions].sort((a,b)=>b.date.localeCompare(a.date));
  const csv='\uFEFFData,Tipo,Categoria,Descrição,Valor\n'+txns.map(t=>`${t.date},${t.type==='income'?'Receita':'Despesa'},${getCat(t.cat).name},"${t.desc}",${t.amt}`).join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));a.download='financas.csv';a.click();toast('CSV exportado!');
}

async function handleImport(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=async ev=>{
    try{
      const lines=(ev.target?.result as string).split('\n').slice(1).filter(l=>l.trim());
      const bulk=[];
      lines.forEach(line=>{const pts=line.split(',');if(pts.length<5)return;const[date,tipo,,desc,amt]=pts;bulk.push({type:tipo.includes('Receita')?'income':'expense',cat:'other_ex',desc:desc.replace(/"/g,'').trim(),amt:parseFloat(amt)||0,date:date.trim()});});
      const {added}=await api.importTransactions(bulk);
      await window.finReload();
      renderAll();toast(added+' transações importadas!');
    }catch{alert('Erro ao importar CSV.');}
  };
  reader.readAsText(file);
}

async function clearData(){if(!confirm('Apagar TODOS os dados?'))return;try{const s=await api.clearData();setDB(s);renderAll();renderProfile();toast('Dados apagados');}catch{toast('Erro');}}
async function resetDemo(){if(!confirm('Restaurar dados de demonstração?'))return;try{const s=await api.resetDemo();setDB(s);renderAll();renderProfile();toast('Dados demo restaurados');}catch{toast('Erro');}}

/* ════════════════════════════════════
   RENDER ALL
════════════════════════════════════ */
function renderAll(){
  renderOverview();
  const id=document.querySelector('.page.active')?.id?.replace('page-','');
  if(id==='transactions')renderTxns();
  if(id==='budget')renderBudget();
  if(id==='goals')renderGoals();
  if(id==='recurring')renderRecurring();
  if(id==='profile')renderProfile();
  if(id==='score')renderScore();
  if(id==='ai')renderAI();
}


/* ════════════════════════════════════
   ONBOARDING
════════════════════════════════════ */
let obSlide=0;
const OB_TOTAL=4;
let currentUserId: string | null = null;

function onboardingKey() {
  return currentUserId ? `fin_onboarded_${currentUserId}` : 'fin_onboarded';
}

function setCurrentUserId(id: string) {
  currentUserId = id;
  const legacy = localStorage.getItem('fin_onboarded');
  const key = onboardingKey();
  if (legacy && !localStorage.getItem(key)) {
    localStorage.setItem(key, legacy);
  }
}

function hideOnboarding() {
  const ob = document.getElementById('onboarding');
  if (!ob) return;
  ob.style.display = 'none';
  ob.classList.add('hidden');
}

function checkOnboarding(){
  const ob = document.getElementById('onboarding');
  if (!ob) return;
  const appRoot = document.getElementById('app-root');
  if (appRoot?.classList.contains('hidden')) {
    hideOnboarding();
    return;
  }
  if (localStorage.getItem(onboardingKey())){
    hideOnboarding();
    return;
  }
  ob.classList.remove('hidden');
  ob.style.display='flex';
}

function nextSlide(){
  if(obSlide>=OB_TOTAL-1){finishOnboarding();return;}
  document.getElementById('ob-'+obSlide).style.display='none';
  obSlide++;
  const slide=document.getElementById('ob-'+obSlide);
  slide.style.display='block';
  slide.style.animation='none';
  requestAnimationFrame(()=>{slide.style.animation='';});
  document.querySelectorAll('.ob-dot').forEach((d,i)=>d.classList.toggle('active',i===obSlide));
  if(obSlide===OB_TOTAL-1)  document.getElementById('ob-next')!.textContent='Começar';
}

function finishOnboarding(){
  localStorage.setItem(onboardingKey(),'1');
  const ob=document.getElementById('onboarding');
  ob.classList.add('hidden');
  setTimeout(()=>ob.style.display='none',400);
}

/* ════════════════════════════════════
   SCORE FINANCEIRO
════════════════════════════════════ */
function calcScore(){
  const now=new Date();
  const r=[new Date(now.getFullYear(),now.getMonth(),1),new Date(now.getFullYear(),now.getMonth()+1,0)];
  const txns=DB.transactions.filter(t=>inRange(t.date,r));
  const inc=txns.filter(t=>t.type==='income').reduce((s,t)=>s+t.amt,0);
  const exp=txns.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amt,0);
  const bal=inc-exp;
  const savRate=inc>0?Math.max(0,(bal/inc)):0;
  const budgetCount=Object.keys(DB.budgets).length;
  const goalCount=DB.goals.length;
  const txnCount=DB.transactions.length;

  // Check budget overruns
  const spent={};
  txns.filter(t=>t.type==='expense').forEach(t=>{spent[t.cat]=(spent[t.cat]||0)+t.amt;});
  const overruns=Object.entries(DB.budgets).filter(([cat,lim])=>(spent[cat]||0)>lim).length;
  const totalBudgets=Object.keys(DB.budgets).length;

  // Scoring pillars (each 0–1)
  const s_savings  = Math.min(1, savRate / 0.3);          // ideal: save 30%+
  const s_budget   = totalBudgets>0 ? Math.max(0,1-overruns/totalBudgets) : 0.5;
  const s_goals    = Math.min(1, goalCount/3);
  const s_activity = Math.min(1, txnCount/20);
  const s_recurring= Math.min(1, DB.recurring.length/4);

  const raw = (s_savings*350 + s_budget*250 + s_goals*150 + s_activity*150 + s_recurring*100);
  const score = Math.round(Math.min(1000, Math.max(0, raw)));

  return {score, s_savings, s_budget, s_goals, s_activity, s_recurring, savRate, overruns, totalBudgets, inc, exp, bal};
}

function renderScore(){
  const {score, s_savings, s_budget, s_goals, s_activity, s_recurring, savRate, overruns, inc, exp, bal} = calcScore();

  // Animate ring: dasharray=515, fill proportional to score/1000
  const fill = 515 * (score/1000) * 0.75; // 75% of circle used
  const arc=document.getElementById('score-arc');
  requestAnimationFrame(()=>setTimeout(()=>{
    arc.style.strokeDashoffset = 515 - fill;
    // colour by tier
    if(score>=800)arc.style.stroke='var(--green)';
    else if(score>=600)arc.style.stroke='var(--blue)';
    else if(score>=400)arc.style.stroke='var(--amber)';
    else arc.style.stroke='var(--red)';
  },100));

  // Animate number
  let cur=0;const step=Math.ceil(score/60);
  const numEl=document.getElementById('score-num');
  const iv=setInterval(()=>{cur=Math.min(cur+step,score);numEl.textContent=cur;if(cur>=score)clearInterval(iv);},16);

  // Tier
  let tier,tierColor,tierBg,tierDesc;
  if(score>=800){tier='Excelente';tierColor='var(--green)';tierBg='var(--green-bg)';tierDesc='Você é um exemplo financeiro! Suas despesas estão controladas, suas metas estão avançando e você mantém uma ótima taxa de poupança.';}
  else if(score>=600){tier='Bom';tierColor='var(--blue)';tierBg='var(--blue-bg)';tierDesc='Você está no caminho certo. Pequenos ajustes no controle de despesas podem elevar seu score rapidamente.';}
  else if(score>=400){tier='Regular';tierColor='var(--amber)';tierBg='var(--amber-bg)';tierDesc='Há espaço para melhorar. Defina orçamentos por categoria e acompanhe seus gastos semanalmente.';}
  else{tier='Atenção';tierColor='var(--red)';tierBg='var(--red-bg)';tierDesc='Suas finanças precisam de atenção. Comece definindo um orçamento e registrando todas as despesas.';}

  document.getElementById('score-lbl').textContent=tier;
  const badge=document.getElementById('score-tier-badge');
  badge.style.background=tierBg;badge.style.color=tierColor;
  document.getElementById('score-tier-txt').textContent=tier;
  document.getElementById('score-desc').textContent=tierDesc;

  // Breakdown grid
  const pillars=[
    {lbl:'Poupança',val:Math.round(s_savings*350),max:350,pct:s_savings,color:s_savings>.6?'var(--green)':'var(--amber)',detail:Math.round(savRate*100)+'% da renda'},
    {lbl:'Orçamento',val:Math.round(s_budget*250),max:250,pct:s_budget,color:s_budget>.7?'var(--green)':'var(--red)',detail:overruns+' categorias acima'},
    {lbl:'Metas',val:Math.round(s_goals*150),max:150,pct:s_goals,color:'var(--blue)',detail:DB.goals.length+' metas ativas'},
    {lbl:'Atividade',val:Math.round(s_activity*150),max:150,pct:s_activity,color:'var(--amber)',detail:DB.transactions.length+' transações'},
    {lbl:'Recorrentes',val:Math.round(s_recurring*100),max:100,pct:s_recurring,color:'var(--muted)',detail:DB.recurring.length+' fixas'},
  ];
  document.getElementById('score-breakdown-grid').innerHTML=pillars.map((p,i)=>`
    <div class="score-breakdown-card" style="animation-delay:${.1+i*.05}s">
      <div class="score-breakdown-lbl">${p.lbl}</div>
      <div class="score-breakdown-val">${p.val}<span style="font-size:13px;color:var(--muted);font-family:'DM Sans',sans-serif">/${p.max}</span></div>
      <div class="score-breakdown-bar"><div class="score-breakdown-fill" style="width:${Math.round(p.pct*100)}%;background:${p.color}"></div></div>
      <div style="font-size:11px;color:var(--muted);margin-top:5px">${p.detail}</div>
    </div>
  `).join('');

  // Tips
  const tips=[];
  if(s_savings<.6)tips.push({ico:'var(--amber-bg)','ic-color':'var(--amber)',icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="7"/><path d="M10 7v3l2 2"/></svg>`,title:'Aumente sua taxa de poupança',body:`Você está poupando ${Math.round(savRate*100)}% da sua renda. O ideal é 30%+. Tente reduzir gastos em lazer e alimentação fora.`});
  if(overruns>0)tips.push({ico:'var(--red-bg)','ic-color':'var(--red)',icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 2l8 14H2L10 2z"/><path d="M10 8v4M10 14v.5"/></svg>`,title:`${overruns} categoria(s) acima do limite`,body:'Revise seus orçamentos ou reduza os gastos nas categorias ultrapassadas para recuperar 250 pontos.'});
  if(DB.goals.length===0)tips.push({ico:'var(--green-bg)','ic-color':'var(--green)',icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 2l6 2.5v5c0 4-2.5 7-6 8.5C4.5 16.5 2 13.5 2 9.5v-5L10 2z"/></svg>`,title:'Crie sua primeira meta',body:'Ter metas financeiras vale até 150 pontos no seu score. Crie objetivos como viagem ou fundo de emergência.'});
  if(DB.budgets&&Object.keys(DB.budgets).length<3)tips.push({ico:'var(--blue-bg)','ic-color':'var(--blue)',icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="8"/><path d="M10 6v4l3 3"/></svg>`,title:'Defina mais limites de orçamento',body:'Categorias com limite definido ajudam você a não extrapolar e valem pontos no seu score.'});
  if(!tips.length)tips.push({ico:'var(--green-bg)','ic-color':'var(--green)',icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 10l4 4 8-8"/></svg>`,title:'Parabéns! Suas finanças estão ótimas',body:'Continue registrando suas transações e mantendo seus orçamentos para manter a pontuação alta.'});
  document.getElementById('score-tips').innerHTML=tips.map(t=>`
    <div class="score-tip">
      <div class="score-tip-ico" style="background:${t.ico};color:${t['ic-color']}">${t.icon}</div>
      <div><div class="score-tip-title">${t.title}</div><div class="score-tip-body">${t.body}</div></div>
    </div>`).join('');

  // History (simulated last 6 months with real data where possible)
  const now2=new Date();
  const histMonths=Array.from({length:6},(_,i)=>{
    const d=new Date(now2.getFullYear(),now2.getMonth()-5+i,1);
    return{lbl:d.toLocaleDateString('pt-BR',{month:'short'}).replace('.',''),y:d.getFullYear(),m:d.getMonth()};
  });
  const histScores=histMonths.map(({y,m},i)=>{
    if(i===5)return score;
    // simulate gradual growth toward current score
    return Math.max(100,Math.round(score*(0.5+i*0.1)+Math.random()*40-20));
  });
  const hMax=Math.max(...histScores,100);
  const hChart=document.getElementById('score-history-chart');
  hChart.innerHTML=histScores.map((s,i)=>{
    const h=Math.max(6,(s/hMax)*100);
    const col=s>=800?'var(--green)':s>=600?'var(--blue)':s>=400?'var(--amber)':'var(--red)';
    return`<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%">
      <div style="width:100%;border-radius:4px 4px 0 0;background:${i===5?col:'var(--faint)'};height:${h}%;transition:height .8s cubic-bezier(.25,.46,.45,.94) ${i*.08}s;opacity:${i===5?1:.6}"></div>
    </div>`;
  }).join('');
  document.getElementById('score-history-lbls').innerHTML=histMonths.map(m=>`<span>${m.lbl}</span>`).join('');
}

/* ════════════════════════════════════
   AI FINANCEIRA
════════════════════════════════════ */
let aiHistory=[];
const AI_SYSTEM=`Você é um assistente financeiro pessoal inteligente e empático chamado "Fi". Analise os dados financeiros do usuário e dê conselhos práticos, diretos e personalizados em português brasileiro. Seja conciso (máximo 3 parágrafos), use linguagem simples e amigável. Nunca use markdown pesado — apenas texto natural.`;

const QUICK_PROMPTS=[
  'Como estão meus gastos este mês?',
  'Onde posso economizar?',
  'Avaliar meu orçamento',
  'Dica para poupar mais',
  'Analise minhas metas',
];

function buildFinancialContext(){
  const now=new Date();
  const r=[new Date(now.getFullYear(),now.getMonth(),1),new Date(now.getFullYear(),now.getMonth()+1,0)];
  const txns=DB.transactions.filter(t=>inRange(t.date,r));
  const inc=txns.filter(t=>t.type==='income').reduce((s,t)=>s+t.amt,0);
  const exp=txns.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amt,0);
  const spent={};txns.filter(t=>t.type==='expense').forEach(t=>{spent[t.cat]=(spent[t.cat]||0)+t.amt;});
  const topCats=Object.entries(spent).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([c,v])=>`${getCat(c).name}: R$${v}`).join(', ');
  const {score}=calcScore();
  return `DADOS DO USUÁRIO (${now.toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}):
- Receitas: R$${inc} | Despesas: R$${exp} | Saldo: R$${inc-exp}
- Taxa de poupança: ${inc>0?Math.round((inc-exp)/inc*100):0}%
- Top gastos: ${topCats||'nenhum'}
- Metas ativas: ${DB.goals.length} | Orçamentos: ${Object.keys(DB.budgets).length}
- Score financeiro: ${score}/1000
- Recorrentes/mês: ${DB.recurring.length} itens`;
}

async function sendAIMsg(customMsg){
  const inp=document.getElementById('ai-input');
  const msg=(customMsg||inp.value).trim();
  if(!msg)return;
  inp.value='';

  addBubble(msg,'user');
  const loadId=addBubble('digitando…','ai loading');
  aiHistory.push({role:'user',content:msg});

  try{
    const ctx=buildFinancialContext();
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:600,
        system:AI_SYSTEM+'\n\n'+ctx,
        messages:aiHistory.slice(-8),
      })
    });
    const data=await res.json();
    const reply=data.content?.[0]?.text||'Não consegui processar. Tente novamente.';
    updateBubble(loadId,reply,'ai');
    aiHistory.push({role:'assistant',content:reply});
  }catch(e){
    updateBubble(loadId,'Erro de conexão. Verifique sua internet e tente novamente.','ai');
  }
}

function addBubble(text,cls){
  const chat=document.getElementById('ai-chat');
  const id='b'+Date.now();
  const div=document.createElement('div');
  div.id=id;div.className='ai-bubble '+cls;div.textContent=text;
  div.style.display='flex';div.style.flexDirection='column';
  chat.appendChild(div);
  chat.scrollTop=chat.scrollHeight;
  return id;
}

function updateBubble(id,text,cls){
  const el=document.getElementById(id);
  if(!el)return;
  el.className='ai-bubble '+cls;
  el.textContent=text;
  document.getElementById('ai-chat').scrollTop=9999;
}

function renderAI(){
  // Quick prompts
  document.getElementById('ai-quick-prompts').innerHTML=QUICK_PROMPTS.map(p=>`<button class="ai-quick" onclick="sendAIMsg('${p}')">${p}</button>`).join('');

  // Insight cards (auto-generated from data)
  const now=new Date();
  const r=[new Date(now.getFullYear(),now.getMonth(),1),new Date(now.getFullYear(),now.getMonth()+1,0)];
  const txns=DB.transactions.filter(t=>inRange(t.date,r));
  const inc=txns.filter(t=>t.type==='income').reduce((s,t)=>s+t.amt,0);
  const exp=txns.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amt,0);
  const savRate=inc>0?((inc-exp)/inc*100):0;
  const spent={};txns.filter(t=>t.type==='expense').forEach(t=>{spent[t.cat]=(spent[t.cat]||0)+t.amt;});
  const topCat=Object.entries(spent).sort((a,b)=>b[1]-a[1])[0];
  const topCatName=topCat?getCat(topCat[0]).name:'—';
  const topCatAmt=topCat?topCat[1]:0;

  const insights=[
    {bg:'var(--green-bg)',color:'var(--green)',icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3 16l4-6 3 3 3-5 4 4"/></svg>`,title:'Taxa de poupança',val:Math.round(savRate)+'%',sub:savRate>=20?'Acima da média ✓':'Meta: 20% da renda'},
    {bg:'var(--red-bg)',color:'var(--red)',icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 5v10M5 10l5 5 5-5"/></svg>`,title:'Maior gasto',val:topCatName,sub:'R$ '+topCatAmt.toLocaleString('pt-BR')},
    {bg:'var(--blue-bg)',color:'var(--blue)',icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><rect x="2" y="5" width="16" height="11" rx="2"/><path d="M2 9h16"/></svg>`,title:'Saldo do mês',val:'R$ '+(inc-exp).toLocaleString('pt-BR'),sub:inc-exp>=0?'Positivo ✓':'Atenção: negativo'},
    {bg:'var(--amber-bg)',color:'var(--amber)',icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 2a8 8 0 100 16A8 8 0 0010 2z"/><path d="M10 6v4l2.5 2.5"/></svg>`,title:'Transações',val:String(txns.length),sub:'registradas este mês'},
  ];

  document.getElementById('ai-insights').innerHTML=insights.map((ins,i)=>`
    <div class="ai-insight" style="animation-delay:${i*.05}s">
      <div class="ai-insight-ico" style="background:${ins.bg};color:${ins.color}">${ins.icon}</div>
      <div class="ai-insight-title">${ins.title}</div>
      <div class="ai-insight-val">${ins.val}</div>
      <div class="ai-insight-sub">${ins.sub}</div>
    </div>`).join('');

  // Welcome message if first time
  const chat=document.getElementById('ai-chat');
  if(!chat.children.length){
    addBubble('Olá! Sou o Fi, sua IA financeira pessoal 👋 Analisei seus dados deste mês. Posso responder perguntas, identificar padrões de gasto e sugerir formas de economizar. O que você gostaria de saber?','ai');
  }
}

async function runAIAnalysis(){
  const btn=document.getElementById('ai-btn');
  btn.disabled=true;btn.style.opacity='.5';
  await sendAIMsg('Faça uma análise completa das minhas finanças deste mês com recomendações práticas.');
  btn.disabled=false;btn.style.opacity='1';
}

export {
  applyTheme, populateCatSel, renderAll, checkOnboarding, hideOnboarding,
  setCurrentUserId, goPage,
  openTxnModal, openBudModal, openGoalModal, openRecurModal, openPinModal,
  openModal, closeModal, setType, setRecurType,
  saveTxn, saveBudget, saveGoal, saveRecur, saveProfile, savePin,
  delBudget, delGoal, delRecur, addToGoal, setFilter,
  toggleTheme, togglePref, exportData, handleImport, handleAvatar,
  clearData, resetDemo, renderScore, renderAI, sendAIMsg, runAIAnalysis,
  nextSlide, finishOnboarding, toast,
};
