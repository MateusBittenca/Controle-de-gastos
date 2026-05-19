
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
let DB={transactions:[],budgets:{},goals:[],recurring:[],profile:{name:'Mateus',email:'mateus@email.com',salary:0,currency:'BRL',pin:'',prefs:{budgetAlert:true,goalAlert:false,hideValues:false}},streakDays:12};
let period='month', txnType='income', txnFilter='all', recurType='expense';

function save(){try{localStorage.setItem('fin_app',JSON.stringify(DB));}catch(e){}}
function load(){
  try{const d=localStorage.getItem('fin_app');if(d){DB=JSON.parse(d);if(!DB.profile)DB.profile={name:'Mateus',email:'mateus@email.com',salary:0,currency:'BRL',pin:'',prefs:{budgetAlert:true,goalAlert:false,hideValues:false}};if(!DB.recurring)DB.recurring=[];}}catch(e){}
  if(!DB.transactions.length)seed();
  // restore theme
  const t=localStorage.getItem('fin_theme')||'light';
  applyTheme(t,false);
}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6);}

function seed(){
  const now=new Date(),y=now.getFullYear(),m=now.getMonth();
  const d=(day,mo=0)=>new Date(y,m-mo,day).toISOString().slice(0,10);
  DB.transactions=[
    {id:uid(),type:'income', cat:'salary',   desc:'Salário',          amt:8000,date:d(5)},
    {id:uid(),type:'income', cat:'freelance',desc:'Projeto UI/UX',    amt:1400,date:d(12)},
    {id:uid(),type:'expense',cat:'housing',  desc:'Aluguel',          amt:1800,date:d(6)},
    {id:uid(),type:'expense',cat:'food',     desc:'Supermercado',     amt:340, date:d(8)},
    {id:uid(),type:'expense',cat:'transport',desc:'Combustível',      amt:180, date:d(10)},
    {id:uid(),type:'expense',cat:'utilities',desc:'Energia elétrica', amt:210, date:d(15)},
    {id:uid(),type:'expense',cat:'leisure',  desc:'Restaurante',      amt:95,  date:d(18)},
    {id:uid(),type:'expense',cat:'health',   desc:'Farmácia',         amt:85,  date:d(20)},
    {id:uid(),type:'income', cat:'salary',   desc:'Salário',          amt:8000,date:d(5,1)},
    {id:uid(),type:'expense',cat:'housing',  desc:'Aluguel',          amt:1800,date:d(6,1)},
    {id:uid(),type:'expense',cat:'food',     desc:'Supermercado',     amt:290, date:d(9,1)},
    {id:uid(),type:'expense',cat:'transport',desc:'Uber',             amt:140, date:d(14,1)},
  ];
  DB.budgets={housing:2000,food:600,transport:300,health:200,leisure:300,utilities:250};
  DB.goals=[
    {id:uid(),name:'Fundo de emergência',icon:'shield',target:30000,current:20100},
    {id:uid(),name:'Viagem Europa',      icon:'plane', target:15000,current:4500},
    {id:uid(),name:'Notebook novo',      icon:'laptop',target:6000, current:2200},
  ];
  DB.recurring=[
    {id:uid(),type:'expense',cat:'housing',  desc:'Aluguel',   amt:1800,freq:'monthly',next:new Date().toISOString().slice(0,10)},
    {id:uid(),type:'expense',cat:'utilities',desc:'Energia',   amt:210, freq:'monthly',next:new Date().toISOString().slice(0,10)},
    {id:uid(),type:'expense',cat:'leisure',  desc:'Streaming', amt:45,  freq:'monthly',next:new Date().toISOString().slice(0,10)},
    {id:uid(),type:'income', cat:'salary',   desc:'Salário',   amt:8000,freq:'monthly',next:new Date().toISOString().slice(0,10)},
  ];
  DB.profile={name:'Mateus',email:'mateus@email.com',salary:8000,currency:'BRL',pin:'',prefs:{budgetAlert:true,goalAlert:false,hideValues:false}};
  DB.streakDays=12;
  save();
}

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

function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme')||'light';
  applyTheme(cur==='light'?'dark':'light');
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
  container.querySelectorAll('.txn-del').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();DB.transactions=DB.transactions.filter(t=>t.id!==b.dataset.id);save();renderAll();toast('Transação excluída');
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
function delBudget(id){delete DB.budgets[id];save();renderBudget();toast('Limite removido');}

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
function addToGoal(id){
  const raw=prompt('Valor do aporte (R$):');if(raw===null)return;
  const amt=parseFloat(raw.replace(',','.'));if(!amt||amt<=0){alert('Valor inválido.');return;}
  const g=DB.goals.find(g=>g.id===id);if(g){g.current=Math.min(g.target,g.current+amt);save();renderGoals();renderOvGoal();toast('Aporte registrado!');}
}
function delGoal(id){DB.goals=DB.goals.filter(g=>g.id!==id);save();renderGoals();renderOvGoal();toast('Meta removida');}

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
function delRecur(id){DB.recurring=DB.recurring.filter(r=>r.id!==id);save();renderRecurring();toast('Recorrência removida');}

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
    b.onclick=()=>{p.currency=b.dataset.cur;save();document.querySelectorAll('.cur-btn').forEach(x=>x.classList.toggle('active',x.dataset.cur===p.currency));toast('Moeda atualizada');renderOverview();};
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
function togglePref(key,el){DB.profile.prefs[key]=!DB.profile.prefs[key];el.classList.toggle('on',DB.profile.prefs[key]);save();toast('Preferência salva');}

function saveProfile(){
  DB.profile.name=document.getElementById('pf-name').value.trim()||DB.profile.name;
  DB.profile.email=document.getElementById('pf-email').value.trim()||DB.profile.email;
  DB.profile.salary=parseFloat(document.getElementById('pf-salary').value)||0;
  save();renderProfile();toast('Perfil salvo!');
}

function handleAvatar(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=ev=>{DB.profile.avatarSrc=ev.target.result;save();renderProfile();toast('Foto atualizada!');};
  reader.readAsDataURL(file);
}

function savePin(){
  const pin=document.getElementById('pin-inp').value;
  if(pin.length!==4||!/^\d+$/.test(pin)){alert('PIN deve ter exatamente 4 dígitos.');return;}
  DB.profile.pin=pin;save();closeModal('pin-overlay');renderProfile();toast('PIN configurado!');
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
function saveTxn(){
  const amt=parseFloat(document.getElementById('txn-amt').value);
  const desc=document.getElementById('txn-desc').value.trim();
  const cat=document.getElementById('txn-cat').value;
  const date=document.getElementById('txn-date').value;
  const isR=document.getElementById('txn-recur').checked;
  if(!amt||amt<=0){alert('Insira um valor válido.');return;}
  if(!desc){alert('Insira uma descrição.');return;}
  if(!date){alert('Selecione uma data.');return;}
  DB.transactions.push({id:uid(),type:txnType,cat,desc,amt,date,isRecur:isR});
  if(isR)DB.recurring.push({id:uid(),type:txnType,cat,desc,amt,freq:'monthly',next:date});
  save();closeModal('txn-overlay');renderAll();toast('Transação adicionada!');
}

function openBudModal(){populateCatSel('bud-cat','expense');document.getElementById('bud-amt').value='';openModal('bud-overlay');}
function saveBudget(){
  const cat=document.getElementById('bud-cat').value;
  const amt=parseFloat(document.getElementById('bud-amt').value);
  if(!amt||amt<=0){alert('Valor inválido.');return;}
  DB.budgets[cat]=amt;save();closeModal('bud-overlay');renderBudget();toast('Limite definido!');
}

function openGoalModal(){document.getElementById('goal-name').value='';document.getElementById('goal-target').value='';document.getElementById('goal-current').value='0';openModal('goal-overlay');}
function saveGoal(){
  const name=document.getElementById('goal-name').value.trim();
  const icon=document.getElementById('goal-icon').value;
  const target=parseFloat(document.getElementById('goal-target').value);
  const current=parseFloat(document.getElementById('goal-current').value)||0;
  if(!name){alert('Insira o nome.');return;}if(!target||target<=0){alert('Insira o valor alvo.');return;}
  DB.goals.push({id:uid(),name,icon,target,current});save();closeModal('goal-overlay');renderGoals();renderOvGoal();toast('Meta criada!');
}

function openRecurModal(){setRecurType('expense');document.getElementById('recur-desc').value='';document.getElementById('recur-amt').value='';document.getElementById('recur-next').value=new Date().toISOString().slice(0,10);openModal('recur-overlay');}
function setRecurType(t){recurType=t;document.getElementById('rtype-inc').classList.toggle('active',t==='income');document.getElementById('rtype-exp').classList.toggle('active',t==='expense');populateCatSel('recur-cat',t);}
function saveRecur(){
  const desc=document.getElementById('recur-desc').value.trim();
  const amt=parseFloat(document.getElementById('recur-amt').value);
  const cat=document.getElementById('recur-cat').value;
  const freq=document.getElementById('recur-freq').value;
  const next=document.getElementById('recur-next').value;
  if(!desc){alert('Insira a descrição.');return;}if(!amt||amt<=0){alert('Valor inválido.');return;}if(!next){alert('Selecione a data.');return;}
  DB.recurring.push({id:uid(),type:recurType,cat,desc,amt,freq,next});
  save();closeModal('recur-overlay');renderRecurring();toast('Recorrência adicionada!');
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

function handleImport(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=ev=>{
    try{
      const lines=ev.target.result.split('\n').slice(1).filter(l=>l.trim());
      let added=0;
      lines.forEach(line=>{const pts=line.split(',');if(pts.length<5)return;const[date,tipo,,desc,amt]=pts;DB.transactions.push({id:uid(),type:tipo.includes('Receita')?'income':'expense',cat:'other_ex',desc:desc.replace(/"/g,'').trim(),amt:parseFloat(amt)||0,date:date.trim()});added++;});
      save();renderAll();toast(added+' transações importadas!');
    }catch(e){alert('Erro ao importar CSV.');}
  };
  reader.readAsText(file);
}

function clearData(){if(!confirm('Apagar TODOS os dados?'))return;DB={transactions:[],budgets:{},goals:[],recurring:[],profile:DB.profile,streakDays:0};save();renderAll();renderProfile();toast('Dados apagados');}
function resetDemo(){if(!confirm('Restaurar dados de demonstração?'))return;DB={transactions:[],budgets:{},goals:[],recurring:[],profile:DB.profile};seed();renderAll();renderProfile();toast('Dados demo restaurados');}

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



/* INIT — runs after all functions are defined */
load();
populateCatSel('recur-cat','expense');
renderAll();
setTimeout(checkOnboarding, 120);
