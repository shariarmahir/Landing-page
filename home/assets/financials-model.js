const INVESTED=[
["Website — Biluibaba","BB",100000,"Design, development and build of the Biluibaba platform."],
["Domain — Biluibaba","BB",4500,"Registration of biluibaba.com."],
["Hosting — Biluibaba","BB",26000,"Platform hosting through the launch period."],
["Registration & licence — Biluibaba","BB",15500,"Business registration and licensing."],
["API integrations — Biluibaba","BB",30500,"Payment, logistics and communication API integrations."],
["Logo — Biluibaba","BB",2000,"Brand mark and visual identity."],
["Marketing — ads, influencers & content","BB",36000,"Launch marketing: Facebook ads, influencer collaborations and content."],
["Operational cost of procurement","BB",17000,"Cost of sourcing and onboarding the initial catalogue."],
["Visiting & ID cards — 6 persons","BB",8000,"Team identification for launch operations."],
["Video equipment","BB",3000,"Equipment for content production."],
["Product purchase","BB",15000,"Initial inventory purchase."],
["Launch day cost","BB",7500,"Launch-day event and operations."],
["Post-launch operations & misc. reserve","BB",5000,"Buffer for early post-launch operations."],
["Post-launching budget","BB",30000,"Operating budget for the post-launch phase."],
["Study Insights — expenses to date","SI",300000,"All expenses incurred for Study Insights so far."]
];
const SETUP=[
{l:"Office establishment",a:600000,n:"Full build-out of the shared office: rent advance, partitions and electrical, reception and consultation furniture, workstations, executive and conference furniture, and complete signage.",d:[
 {g:"Advance, security & rent reserve",a:120000,i:[["1 month advance rent",40000],["1 month security / deposit",40000],["1 month initial rent reserve",40000]]},
 {g:"Partitions, paint & electrical",a:150000,i:[["Consultation-room partitions",50000],["Wall painting & surface preparation",25000],["Electrical wiring, sockets & switches",30000],["LED ceiling / panel lights",20000],["Basic ceiling & interior finishing",15000],["Minor plumbing & repair work",5000],["Installation, labour & miscellaneous",5000]]},
 {g:"Reception, waiting & consultation",a:80000,i:[["Reception counter / desk",15000],["Waiting sofa — 1 set",25000],["Center table",5000],["Visitor chairs — 4",6000],["Consultation table",8000],["Consultation chairs — 4",8000],["Small side tables — 2",3000],["Magazine / document rack",3000],["Reception accessories & decor — 1 lot",4000],["Installation & miscellaneous",3000]]},
 {g:"Workstations — desks & chairs",a:120000,i:[["Standard work desks — 9",54000],["Office chairs — 9",45000],["Mobile pedestals / drawer units — 3",9000],["Desk cable management — 1 lot",4000],["Small desk accessories — 1 lot",4000],["Installation / assembly",4000]]},
 {g:"Executive & conference",a:70000,i:[["CEO / executive desk",18000],["Executive ergonomic chair",10000],["Conference / meeting table",18000],["Conference chairs — 6",12000],["Storage cabinet",7000],["Bookshelf / display rack",3000],["File / document storage boxes — 1 lot",2000]]},
 {g:"Signboard & indoor signage",a:60000,i:[["Outdoor illuminated signboard",30000],["Reception wall branding",8000],["Indoor directional signage",5000],["Room / department nameplates",5000],["Main entrance nameplate",3000],["Window / door graphics",4000],["Installation & miscellaneous",5000]]}
]},
{l:"Air conditioning",a:280000,n:"Four split units (1 × 2.0-ton, 3 × 1.5-ton) with installation and dedicated wiring — a final budget cap of BDT 2,80,000 including a BDT 3,000 price contingency.",d:[
 {g:null,i:[["2.0-ton split AC — 1",75000],["1.5-ton split AC — 3 × BDT 55,000",165000],["AC installation & commissioning",20000],["Copper pipe, drain pipe & fittings",10000],["Dedicated wiring, breakers & isolators",7000],["Price-adjustment contingency",3000]]}
]},
{l:"Technology & equipment",a:424000,n:"The complete technology stack: nine laptops, networking, CCTV, UPS backup, display and communications.",d:[
 {g:null,i:[["Used laptops — 9",230000],["Multifunction printer / scanner",20000],["CCTV system",15000],["Router",3000],["24-port network switch",7500],["Wi-Fi access points / extenders",7500],["UPS units",31500],["External backup drives",12000],["Headsets",13500],["Business phones — 2",16000],["Waiting-area TV / display",30000],["LAN / network cabling",15000],["Intercom",10000],["Paper shredder",8000],["Cable management & accessories",5000]]}
]},
{l:"Kitchen & employee facilities",a:55000,n:"Kitchen and employee facilities for the shared office.",d:[
 {g:null,i:[["Refrigerator",25000],["Microwave / oven",10000],["Water purifier / dispenser",8000],["Kettle / tea equipment",3000],["Crockery & cutlery",5000],["Initial tea, coffee & water supplies",4000]]}
]},
{l:"Branding & stationery",a:80000,n:"Company branding and stationery for both ventures.",d:[
 {g:null,i:[["Visiting cards",8000],["Letterheads / envelopes",5000],["ID cards",5000],["Brochures / company profiles",20000],["Folders / presentation materials",8000],["Stamps / seals",3000],["Initial stationery",15000],["Basic promotional materials",16000]]}
]},
{l:"Legal, registration & software",a:80000,n:"Legal, registration and software setup — a final cap of BDT 80,000 including a BDT 5,000 contingency.",d:[
 {g:null,i:[["Company / legal restructuring & documentation",20000],["Trade licence setup / renewal",5000],["TIN / BIN / VAT documentation & assistance",5000],["Partnership / shareholder / investment agreements",15000],["Trademark / legal consultation",8000],["Accounting & bookkeeping system setup",7000],["Basic business software configuration",5000],["Domain, hosting & business email setup",10000],["Registration price contingency",5000]]}
]},
{l:"Safety & miscellaneous",a:25000,n:"Safety and miscellaneous office setup.",d:[
 {g:null,i:[["Fire extinguishers",8000],["First-aid",2000],["Emergency signage",2000],["Cleaning setup",5000],["Miscellaneous installation",8000]]}
]}
];
const MRC=[
{l:"Employee salaries",a:405000,n:"A ten-person team serving both ventures. Several roles are shared across Biluibaba and Study Insights — the heart of the combined-model efficiency.",d:[
 {g:null,i:[["CEO — both companies",100000],["Director — both companies",50000],["COO, Biluibaba · Head Creative & Digital Marketing, Study Insights",50000],["CTO, Biluibaba — part-time",40000],["Head of IT — Biluibaba",30000],["Head of Marketing & Sales — Biluibaba",30000],["Procurement Manager — Biluibaba",30000],["Head of Operations — Study Insights",30000],["Head of Admissions — Study Insights",30000],["Office Assistant",15000]]}
]},
{l:"Rent + utilities",a:40000,n:"Monthly rent and utilities for the shared office at Dhaka Trade Centre."},
{l:"Biluibaba marketing",a:40000,n:"Monthly growth budget for the pet platform — paid social, influencers and content.",d:[
 {g:null,i:[["Meta / Facebook & Instagram ads",20000],["Micro-influencer collaborations — 2",10000],["Content production",5000],["Content boosting",2500],["Ad creative / testing budget",2500]]}
]},
{l:"Study Insights marketing",a:30000,n:"Monthly student-acquisition budget for the consultancy — lead generation, content and events.",d:[
 {g:null,i:[["Lead-generation ads",15000],["Educational / social media content",5000],["Retargeting campaigns",4000],["Promotional campaigns / offers",3000],["Events / seminar promotion",3000]]}
]},
{l:"IT + administration",a:30000,n:"Connectivity, cloud services, software and office administration.",d:[
 {g:null,i:[["Internet / broadband",1500],["Business phone & mobile",2000],["Cloud storage",2000],["Business email",1500],["SaaS / productivity tools",6000],["Accounting / bookkeeping",4000],["Software subscriptions",3000],["IT support / maintenance",3000],["Minor repairs & accessories",2000],["Office IT consumables",1500],["Miscellaneous IT / admin",3500]]}
]},
{l:"Daily operating buffer",a:5000,n:"A daily float for small, unpredictable operating costs."}
];
const YRC=[
["Domain, hosting & email renewals",30000,"Annual renewal of domains, hosting and business email for both ventures."],
["Annual software / licence renewals",40000,"Renewal of all annual software licences and subscriptions."],
["Accounting, tax & legal compliance",30000,"Annual accounting, tax and legal compliance costs."],
["Equipment servicing & maintenance",30000,"Scheduled servicing of AC, office and IT equipment."],
["Business renewals & memberships",20000,"Trade licence, memberships and business renewals."],
["Annual printing / brand refresh",20000,"Annual reprint of stationery, profiles and brand materials."],
["Backup / cloud / storage renewal",10000,"Annual backup and cloud storage renewal."]
];
const CONT=[
["IT / laptop / computer failure",75000],["AC / electrical / office equipment repair",60000],
["Emergency employee advance / replacement",50000],["Legal / compliance / government fees",40000],
["Emergency marketing / campaign adjustment",40000],["Furniture / equipment replacement",40000],
["Unexpected office expenses",35000],["Business operations emergency",35000],
["Technology / software emergency",25000],["Miscellaneous / unforeseen expenses",50000]
];
const SUM={inv:600000,otcC:1544000,otc:1550000,mrc:550000,mrcY:6600000,yrc:180000,cont:450000,calc:8780000,buf:20000,final:8800000};
const COMP=[["One-time setup",15.5,"#b9793f"],["12-month operations",66,"#1f6b4a"],["Annual recurring",1.8,"#68c494"],["Emergency reserve",4.5,"#d9a35f"],["Rounding buffer",0.2,"#e8dfcc"]];
const CNT={inv:INVESTED.length,setup:SETUP.reduce((s,c)=>s+c.d.reduce((t,g)=>t+g.i.length,0),0),mrc:MRC.reduce((s,c)=>s+(c.d?c.d[0].i.length:0),0),yrc:YRC.length,cont:CONT.length};
const LINE_TOTAL=CNT.inv+CNT.setup+CNT.mrc+CNT.yrc+CNT.cont;

const fmtB=n=>{const s=Math.round(Math.abs(n)).toString(),l3=s.slice(-3),rest=s.slice(0,-3);return (n<0?"−":"")+"BDT "+(rest?rest.replace(/\B(?=(\d{2})+(?!\d))/g,",")+",":"")+l3;};
const pc=(a,t)=>(a/t*100).toFixed(1)+"%";

const ledgerEl=document.getElementById("ledger");
const ui={tab:"summary"};
const thRow=cols=>"<thead><tr>"+cols.map((c,i)=>`<th${i===0?' class="tl"':''} data-c="${i}">${c}</th>`).join("")+"</tr></thead>";
const tds=cells=>cells.map((c,i)=>`<td${i===0?' class="tl"':''} data-c="${i}">${c}</td>`).join("");
const blanks=n=>Array.from({length:n},(_,i)=>`<td data-c="${i+2}"></td>`).join("");
function detRows(cat,pi,nc){
  let h="";
  cat.d.forEach(g=>{
    if(g.g)h+=`<tr class="det dg" data-p="${pi}" hidden><td class="tl" data-c="0">${g.g}</td><td data-c="1">${fmtB(g.a)}</td>${blanks(nc-2)}</tr>`;
    g.i.forEach(it=>{h+=`<tr class="det di" data-p="${pi}" hidden><td class="tl" data-c="0">${g.g?'<span class="ind"></span>':""}${it[0]}</td><td data-c="1">${fmtB(it[1])}</td>${blanks(nc-2)}</tr>`;});
  });
  return h;
}
const RENDER={
summary(){
  const T=SUM.final;
  const rows=[
   {cls:"ctx",n:"Founder capital already expended across both ventures — the Biluibaba platform build, licensing and launch, and Study Insights expenses to date. Shown for completeness; excluded from the ask.",c:["Already invested — both ventures",fmtB(SUM.inv),"—","Founder-expended to date · excluded from this ask"]},
   {n:"One-time costs still to be expended: office establishment BDT 6.00 L, air conditioning BDT 2.80 L, technology BDT 4.24 L, kitchen BDT 0.55 L, branding BDT 0.80 L, legal BDT 0.80 L and safety BDT 0.25 L. Categories calculate to BDT 15,44,000; the commitment carries BDT 15,50,000.",c:["One-time costs — to expend",fmtB(SUM.otc),pc(SUM.otc,T),"Office, technology, AC, branding, legal & safety"]},
   {n:"Twelve months of the full monthly recurring cost — BDT 5,50,000 × 12. Covers the ten-person shared team, rent and utilities, marketing for both ventures, IT and a daily operating buffer.",c:["12-month recurring costs",fmtB(SUM.mrcY),pc(SUM.mrcY,T),"Salaries, rent, marketing & IT — BDT 5.50 L × 12"]},
   {n:"Annual renewals and compliance: domains and hosting, software licences, accounting and tax, equipment servicing, business renewals, printing and backups.",c:["Yearly recurring costs",fmtB(SUM.yrc),pc(SUM.yrc,T),"Renewals, compliance, servicing & brand refresh"]},
   {n:"A protected reserve of BDT 4,50,000 allocated across ten defined emergency categories. Under the base plan it is never drawn — month twelve ends with BDT 4.70 lakh still in hand.",c:["Emergency reserve",fmtB(SUM.cont),pc(SUM.cont,T),"Ten defined risk categories · held intact"]},
   {cls:"em",n:"One-time BDT 15,50,000 + twelve months of recurring BDT 66,00,000 + yearly recurring BDT 1,80,000 + emergency reserve BDT 4,50,000.",c:["Calculated funding requirement",fmtB(SUM.calc),"—",""]},
   {n:"Rounds the calculated requirement to a clean commitment figure.",c:["Rounding buffer",fmtB(SUM.buf),pc(SUM.buf,T),"Commitment rounding"]},
   {cls:"fin",n:"The funding commitment being raised for both ventures, together.",c:["Final funding commitment",fmtB(SUM.final),"100.0%","The ask"]}
  ];
  return thRow(["Component","Amount (BDT)","Share","What it covers"])+"<tbody>"+rows.map(r=>`<tr class="${r.cls||""}" data-l="${r.c[0]}" data-n="${r.n}">${tds(r.c)}</tr>`).join("")+"</tbody>";
},
invested(){
  let h=thRow(["Item","Venture","Amount (BDT)","Share"])+`<tbody>`;
  INVESTED.forEach(r=>{h+=`<tr data-l="${r[0]}" data-n="${r[3]}"><td class="tl" data-c="0">${r[0]}</td><td data-c="1"><span class="tagv ${r[1].toLowerCase()}">${r[1]}</span></td><td data-c="2">${fmtB(r[2])}</td><td data-c="3">${pc(r[2],SUM.inv)}</td></tr>`;});
  h+=`<tr class="em" data-l="Total invested to date" data-n="Total founder capital already expended across both ventures."><td class="tl" data-c="0">Total invested to date</td><td data-c="1"></td><td data-c="2">${fmtB(SUM.inv)}</td><td data-c="3">100.0%</td></tr>`;
  return h+"</tbody>";
},
setup(){
  let h=thRow(["Category","Amount (BDT)","Share of setup","Line items"])+`<tbody>`;
  SETUP.forEach((c,i)=>{
    const nG=c.d.filter(g=>g.g).length,nI=c.d.reduce((t,g)=>t+g.i.length,0);
    h+=`<tr class="xr" data-i="${i}" data-l="${c.l}" data-n="${c.n}"><td class="tl" data-c="0">${c.l}<i class="chev">+</i></td><td data-c="1">${fmtB(c.a)}</td><td data-c="2">${pc(c.a,SUM.otcC)}</td><td data-c="3">${nG?nG+" groups · ":""}${nI} items</td></tr>`;
    h+=detRows(c,i,4);
  });
  h+=`<tr class="em" data-l="Calculated one-time total" data-n="Sum of all seven setup categories as calculated in the model."><td class="tl" data-c="0">Calculated one-time total</td><td data-c="1">${fmtB(SUM.otcC)}</td><td data-c="2">100.0%</td><td data-c="3">${CNT.setup} items</td></tr>`;
  h+=`<tr class="ctx" data-l="Committed one-time envelope" data-n="The funding commitment carries BDT 15,50,000 for the one-time envelope — the BDT 6,000 difference over the calculated BDT 15,44,000 is absorbed within the commitment's rounding."><td class="tl" data-c="0">Committed one-time envelope</td><td data-c="1">${fmtB(SUM.otc)}</td><td data-c="2">—</td><td data-c="3">carried in the ask</td></tr>`;
  return h+"</tbody>";
},
mrc(){
  let h=thRow(["Category","Monthly (BDT)","Annualized (BDT)","Share"])+`<tbody>`;
  MRC.forEach((c,i)=>{
    const hasD=!!c.d;
    h+=`<tr${hasD?` class="xr" data-i="${i}"`:""} data-l="${c.l}" data-n="${c.n||""}"><td class="tl" data-c="0">${c.l}${hasD?'<i class="chev">+</i>':""}</td><td data-c="1">${fmtB(c.a)}</td><td data-c="2">${fmtB(c.a*12)}</td><td data-c="3">${pc(c.a,SUM.mrc)}</td></tr>`;
    if(hasD)h+=detRows(c,i,4);
  });
  h+=`<tr class="em" data-l="Total monthly recurring" data-n="The full monthly burn of the combined organisation: BDT 5,50,000 per month, BDT 66,00,000 across twelve months."><td class="tl" data-c="0">Total monthly recurring</td><td data-c="1">${fmtB(SUM.mrc)}</td><td data-c="2">${fmtB(SUM.mrcY)}</td><td data-c="3">100.0%</td></tr>`;
  return h+"</tbody>";
},
annual(){
  let h=thRow(["Item","Amount (BDT)","Share"])+`<tbody>`;
  h+=`<tr class="grp"><td colspan="3" data-c="0">Yearly recurring — BDT 1,80,000 per year</td></tr>`;
  YRC.forEach(r=>{h+=`<tr data-l="${r[0]}" data-n="${r[2]}"><td class="tl" data-c="0">${r[0]}</td><td data-c="1">${fmtB(r[1])}</td><td data-c="2">${pc(r[1],SUM.yrc)}</td></tr>`;});
  h+=`<tr class="grp"><td colspan="3" data-c="0">Emergency reserve — BDT 4,50,000 · one-off, protected</td></tr>`;
  CONT.forEach(r=>{h+=`<tr data-l="${r[0]}" data-n="Emergency reserve allocation: ${r[0].toLowerCase()}."><td class="tl" data-c="0">${r[0]}</td><td data-c="1">${fmtB(r[1])}</td><td data-c="2">${pc(r[1],SUM.cont)}</td></tr>`;});
  return h+"</tbody>";
}};
const TABNOTE={
summary:"Build-up of the BDT 88,00,000 commitment · the already-invested amount is shown for context and excluded from the ask · hover any row for its definition",
invested:"Founder-funded, already expended · BB = Biluibaba · SI = Study Insights · totals BDT 6,00,000",
setup:"Click a category to open its line items · categories calculate to BDT 15,44,000; the commitment carries BDT 15,50,000",
mrc:"Click a category to open its line items · BDT 5,50,000 per month · annualized = monthly × 12 = BDT 66,00,000",
annual:"Yearly recurring charges (BDT 1,80,000 / year) and the protected emergency reserve (BDT 4,50,000) across ten risk categories"};
function renderTab(){
  ledgerEl.innerHTML=RENDER[ui.tab]();
  document.getElementById("ledgerNoteTx").textContent=TABNOTE[ui.tab];
  const expAll=document.getElementById("expAll");
  expAll.textContent="Expand all";
  expAll.style.display=ledgerEl.querySelector("tr.xr")?"inline-flex":"none";
}
function initTableFx(){
  document.getElementById("tabs").addEventListener("click",e=>{
    const b=e.target.closest("button[data-t]");if(!b)return;
    ui.tab=b.dataset.t;
    document.querySelectorAll("#tabs button").forEach(x=>x.classList.toggle("on",x===b));
    renderTab();
  });
  document.getElementById("expAll").addEventListener("click",()=>{
    const xrs=[...ledgerEl.querySelectorAll("tr.xr")];if(!xrs.length)return;
    const open=xrs.some(x=>!x.classList.contains("open"));
    xrs.forEach(x=>x.classList.toggle("open",open));
    ledgerEl.querySelectorAll("tr.det").forEach(d=>d.hidden=!open);
    document.getElementById("expAll").textContent=open?"Collapse all":"Expand all";
  });
  ledgerEl.addEventListener("click",e=>{
    const xr=e.target.closest("tr.xr");if(!xr)return;
    const open=xr.classList.toggle("open");
    ledgerEl.querySelectorAll(`tr.det[data-p="${xr.dataset.i}"]`).forEach(d=>d.hidden=!open);
  });
  ledgerEl.addEventListener("mouseover",e=>{
    const cell=e.target.closest("td[data-c],th[data-c]");
    ledgerEl.querySelectorAll(".hot").forEach(x=>x.classList.remove("hot"));
    if(cell){const c=cell.dataset.c;ledgerEl.querySelectorAll(`[data-c="${c}"]`).forEach(x=>{if(!x.closest("tr.det"))x.classList.add("hot");});}
  });
  ledgerEl.addEventListener("mouseleave",()=>ledgerEl.querySelectorAll(".hot").forEach(x=>x.classList.remove("hot")));
  const tip=document.getElementById("rowTip");
  ledgerEl.addEventListener("mousemove",e=>{
    const tr=e.target.closest("tbody tr");
    if(tr&&tr.dataset.n){
      tip.querySelector("strong").textContent=tr.dataset.l;
      tip.querySelector("p").textContent=tr.dataset.n;
      tip.classList.add("show");
      let x=e.clientX+18;const w=tip.offsetWidth;
      if(x+w>innerWidth-14)x=e.clientX-w-18;
      tip.style.left=x+"px";
      tip.style.top=Math.min(e.clientY+16,innerHeight-tip.offsetHeight-12)+"px";
    }else tip.classList.remove("show");
  });
  ledgerEl.addEventListener("mouseleave",()=>tip.classList.remove("show"));
}
function buildRail(){
  document.getElementById("stackBar").innerHTML=COMP.map(c=>`<i style="width:${(c[1]/88*100)}%;background:${c[2]}"></i>`).join("");
  document.getElementById("stackList").innerHTML=COMP.map(c=>`<li><span class="sl"><i style="background:${c[2]}"></i>${c[0]}</span><b>BDT ${c[1].toFixed(2)} L</b></li>`).join("");
}
function buildUof(){
  const items=[["One-time setup — office, technology & branding",15.5],["12-month operations — team, rent & marketing",66],["Annual recurring — renewals & compliance",1.8],["Emergency reserve — protected",4.5],["Rounding buffer",0.2]];
  const mx=Math.max(...items.map(i=>i[1]));
  document.getElementById("uofList").innerHTML=items.map((u,i)=>`
    <div class="uof"><div class="uof-head"><span>${u[0]}</span><span>BDT ${u[1].toFixed(2)} L · ${(u[1]/88*100).toFixed(1)}%</span></div>
    <div class="uof-track"><div class="uof-fill${i>2?" alt":""}" style="--w:${Math.max(1.2,u[1]/mx*100).toFixed(1)}%;--d:${i*0.1}s"></div></div></div>`).join("");
}
function updateCaptions(){
  document.getElementById("capDeploy").innerHTML=`The commitment absorbs the one-time setup, then <strong>BDT 5.50 lakh</strong> of operations each month. At month twelve — after setup, twelve months of recurring costs and the annual charge — <strong>BDT 4.70 lakh</strong> remains, leaving the <strong>BDT 4.50 lakh</strong> emergency reserve untouched across the entire plan.`;
  document.getElementById("capAlloc").innerHTML=`Three quarters of the commitment funds twelve months of operations; <strong>17.6%</strong> builds the shared office and technology; the <strong>BDT 4.50 lakh</strong> reserve stays protected.`;
  document.getElementById("capMonthly").innerHTML=`Salaries — a ten-person team shared across both ventures — are <strong>73.6%</strong> of the monthly burn. Biluibaba and Study Insights each carry dedicated marketing budgets.`;
  document.getElementById("capSetup").innerHTML=`Office build-out (<strong>BDT 6.00 L</strong>) and technology (<strong>BDT 4.24 L</strong>) dominate the one-time setup. All <strong>${CNT.setup} line items</strong> are itemized in the model tables and the Excel export.`;
}
let chDeploy,chAlloc,chMonthly,chSetup;
const depLabels=["Day 0","Setup"];for(let m=1;m<=12;m++)depLabels.push("M"+m);
const depRem=[88,72.5];for(let m=1;m<=11;m++)depRem.push(72.5-5.5*m);depRem.push(4.7);
const cursorData=Array(14).fill(null);cursorData[1]=72.5;
function initCharts(){
  if(!window.Chart)return;
  Chart.defaults.font.family="'Spline Sans Mono',monospace";
  Chart.defaults.font.size=10.5;
  Chart.defaults.color="#8F887A";
  const TT={backgroundColor:"#151310",borderColor:"rgba(232,224,202,.22)",borderWidth:1,titleColor:"#EDE7D6",bodyColor:"#C9C2B0",padding:12,cornerRadius:2,boxWidth:9,boxHeight:9};
  const LEG={position:"top",align:"end",labels:{boxWidth:9,boxHeight:9,padding:14}};
  const GRID={color:"rgba(21,19,16,.08)"};
  chDeploy=new Chart(document.getElementById("chDeploy"),{
    type:"line",
    data:{labels:depLabels,datasets:[
      {label:"Remaining cash",data:depRem,borderColor:"#1f6b4a",backgroundColor:"rgba(31,107,74,.10)",borderWidth:2.5,pointRadius:3.5,pointHoverRadius:5,tension:.35,fill:true},
      {label:"Emergency reserve floor — BDT 4.50 L",data:Array(14).fill(4.5),borderColor:"#b9793f",borderWidth:2,borderDash:[6,5],pointRadius:0},
      {type:"scatter",label:"Selected month",data:cursorData,backgroundColor:"#68c494",borderColor:"#151310",borderWidth:2,pointRadius:6,pointHoverRadius:7}
    ]},
    options:{maintainAspectRatio:false,interaction:{mode:"index",intersect:false},
      plugins:{legend:LEG,tooltip:{...TT,callbacks:{label:c=>{const y=c.parsed.y;return [` Remaining: BDT ${y.toFixed(2)} L`,` Deployed: BDT ${(88-y).toFixed(2)} L`];}}}},
      scales:{x:{grid:{display:false},ticks:{maxRotation:0}},y:{grid:GRID,border:{display:false},min:0,max:92,ticks:{callback:v=>"BDT "+v+"L"}}}}
  });
  const centerText={id:"centerText",afterDraw(chart){
    const meta=chart.getDatasetMeta(0);if(!meta.data.length)return;
    const {ctx}=chart,x=meta.data[0].x,y=meta.data[0].y;
    ctx.save();ctx.textAlign="center";
    ctx.font="700 24px Fraunces, Georgia, serif";ctx.fillStyle="#151310";ctx.fillText("BDT 88 L",x,y-2);
    ctx.font="500 8.5px 'Spline Sans Mono', monospace";ctx.fillStyle="#6F695B";ctx.fillText("TOTAL COMMITMENT",x,y+16);
    ctx.restore();
  }};
  chAlloc=new Chart(document.getElementById("chAlloc"),{
    type:"doughnut",
    data:{labels:COMP.map(c=>c[0]),datasets:[{data:COMP.map(c=>c[1]),backgroundColor:COMP.map(c=>c[2]),borderColor:"#FAF6EC",borderWidth:3}]},
    options:{maintainAspectRatio:false,cutout:"68%",
      plugins:{legend:{position:"bottom",labels:{boxWidth:9,boxHeight:9,padding:12}},
      tooltip:{...TT,callbacks:{label:c=>` ${c.label}: BDT ${c.parsed} L · ${(c.parsed/88*100).toFixed(1)}%`}}}}
    ,plugins:[centerText]
  });
  chMonthly=new Chart(document.getElementById("chMonthly"),{
    type:"bar",
    data:{labels:["Employee salaries","Biluibaba marketing","Rent + utilities","Study Insights marketing","IT + administration","Daily operating buffer"],datasets:[
      {data:[4.05,0.40,0.40,0.30,0.30,0.05],backgroundColor:["#1f6b4a","#43936b","#8a8471","#b9793f","#b3a98f","#8a8471"],barPercentage:.62}
    ]},
    options:{indexAxis:"y",maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` BDT ${c.parsed.x.toFixed(2)} L / month · ${(c.parsed.x/5.5*100).toFixed(1)}% of MRC`}}},
      scales:{x:{grid:GRID,border:{display:false},ticks:{callback:v=>"BDT "+v+"L"}},y:{grid:{display:false}}}}
  });
  chSetup=new Chart(document.getElementById("chSetup"),{
    type:"bar",
    data:{labels:["Office establishment","Technology & equipment","Air conditioning","Branding & stationery","Legal, registration & software","Kitchen & facilities","Safety & miscellaneous"],datasets:[
      {data:[6.00,4.24,2.80,0.80,0.80,0.55,0.25],backgroundColor:["#1f6b4a","#2e7350","#43936b","#6baf88","#8cc5a5","#a9d6be","#c4e4d3"],barPercentage:.6}
    ]},
    options:{indexAxis:"y",maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` BDT ${c.parsed.x.toFixed(2)} L · ${(c.parsed.x/15.44*100).toFixed(1)}% of setup`}}},
      scales:{x:{grid:GRID,border:{display:false},ticks:{callback:v=>"BDT "+v+"L"}},y:{grid:{display:false}}}}
  });
}
function initDeploySlider(){
  const s=document.getElementById("depSlider");
  const paint=()=>s.style.setProperty("--p",(s.value/12*100)+"%");
  const apply=()=>{
    const v=+s.value,idx=v+1,rem=depRem[idx];
    cursorData.fill(null);cursorData[idx]=rem;
    if(chDeploy)chDeploy.update("none");
    document.getElementById("depOut").textContent=v===0?"Setup complete":"Month "+v;
    document.getElementById("depSpent").textContent="BDT "+(88-rem).toFixed(2)+" L";
    document.getElementById("depLeft").textContent="BDT "+rem.toFixed(2)+" L";
    document.getElementById("depRes").textContent=rem>=4.5?"Intact · BDT 4.50 L held":"Reserve drawn";
  };
  paint();apply();
  s.addEventListener("input",()=>{paint();apply();});
}
function buildTicker(){
  const items=["Biluibaba × Study Insights","Funding commitment · BDT 88 lakh","Monthly recurring · BDT 5,50,000","12-month runway · fully funded","Emergency reserve · BDT 4.5 lakh, protected","Students abroad annually · 52,799","Foreign education spend FY25 · $667.77M","Global consulting market · $4.04B → $6.34B","Bangladesh's first one-stop pet platform","Shared office · Dhaka Trade Centre"];
  const seq=items.map(t=>`<span class="tk">${t}</span><span class="tk-d"></span>`).join("");
  document.getElementById("tickerTrack").innerHTML=seq+seq;
}
function exportXLSX(){
  if(!window.XLSX){showToast("Library unavailable","The Excel engine could not be loaded — check your connection.");return;}
  const wb=XLSX.utils.book_new();
  wb.Props={Title:"Biluibaba × Study Insights — Combined Financial Model",Author:"Biluibaba × Study Insights",Subject:"Investor financial model — BDT"};
  const BF='[>=10000000]##\\,##\\,##\\,##0;[>=100000]##\\,##\\,##0;##,##0';
  const PF="0.0%";
  function sh(name,aoa,fmts,cols){
    const ws=XLSX.utils.aoa_to_sheet(aoa);
    const rg=XLSX.utils.decode_range(ws["!ref"]);
    for(let R=0;R<aoa.length;R++){
      const f=fmts&&fmts[R];if(!f)continue;
      for(let C=1;C<=rg.e.c;C++){
        const cell=ws[XLSX.utils.encode_cell({r:R,c:C})];
        if(cell&&cell.t==="n"){const z=Array.isArray(f)?(f[C-1]||null):f;if(z)cell.z=z;}
      }
    }
    ws["!cols"]=cols||[{wch:36},{wch:14},{wch:14},{wch:12}];
    XLSX.utils.book_append_sheet(wb,ws,name);
  }
  const T=SUM.final;
  sh("Funding Summary",[
    ["BILUIBABA × STUDY INSIGHTS — COMBINED FINANCIAL MODEL"],
    ["Funding summary · all figures in Bangladeshi Taka (BDT)"],
    [],
    ["Component","Amount (BDT)","Share","What it covers"],
    ["Already invested — both ventures (context)",SUM.inv,"","Founder-expended to date; excluded from the ask"],
    ["One-time costs — to expend",SUM.otc,SUM.otc/T,"Office, technology, AC, branding, legal & safety"],
    ["12-month recurring costs",SUM.mrcY,SUM.mrcY/T,"Salaries, rent, marketing & IT — BDT 5,50,000 × 12"],
    ["Yearly recurring costs",SUM.yrc,SUM.yrc/T,"Renewals, compliance, servicing & brand refresh"],
    ["Emergency reserve",SUM.cont,SUM.cont/T,"Ten defined risk categories — held intact"],
    ["Calculated funding requirement",SUM.calc,"",""],
    ["Rounding buffer",SUM.buf,SUM.buf/T,""],
    ["FINAL FUNDING COMMITMENT",SUM.final,1,"The ask"]
  ],[null,null,null,null,[BF],[BF,PF],[BF,PF],[BF,PF],[BF,PF],[BF],[BF,PF],[BF,PF]],[{wch:38},{wch:15},{wch:10},{wch:46}]);
  sh("One-Time Invested",[
    ["One-time costs — already expended (founder-funded)"],
    ["BDT · totals BDT 6,00,000"],
    [],
    ["Item","Venture","Amount (BDT)"],
    ...INVESTED.map(r=>[r[0],r[1]==="BB"?"Biluibaba":"Study Insights",r[2]]),
    ["Total","",SUM.inv]
  ],[null,null,null,null,...INVESTED.map(()=>[null,BF]),[null,BF]]);
  const setupAoa=[["One-time costs — to expend"],["BDT · category totals and full line-item detail"],[],["Category","Amount (BDT)"],
    ...SETUP.map(c=>[c.l,c.a]),["Calculated one-time total",SUM.otcC],["Committed one-time envelope",SUM.otc],[],
    ["Line-item detail"],["Category","Item","Amount (BDT)"]];
  const setupFmts=[null,null,null,null,...SETUP.map(()=>[BF]),[BF],[BF],null,null,null];
  SETUP.forEach(c=>c.d.forEach(g=>{
    if(g.g)setupAoa.push([c.l,"— "+g.g+" (subtotal)",g.a]);
    g.i.forEach(it=>setupAoa.push([c.l,it[0],it[1]]));
    if(g.g)setupFmts.push([null,null,BF]);
    g.i.forEach(()=>setupFmts.push([null,null,BF]));
  }));
  setupAoa.push(["","GRAND TOTAL",SUM.otcC]);setupFmts.push([null,null,BF]);
  sh("One-Time To Expend",setupAoa,setupFmts,[{wch:30},{wch:52},{wch:14}]);
  const mrcAoa=[["Monthly recurring costs"],["BDT · totals BDT 5,50,000 per month"],[],["Category","Item","Monthly (BDT)"]];
  const mrcFmts=[null,null,null,null];
  MRC.forEach(c=>{
    if(c.d){c.d[0].i.forEach(it=>{mrcAoa.push([c.l,it[0],it[1]]);mrcFmts.push([null,null,BF]);});
      mrcAoa.push([c.l,"Subtotal",c.a]);mrcFmts.push([null,null,BF]);}
    else{mrcAoa.push([c.l,"—",c.a]);mrcFmts.push([null,null,BF]);}
  });
  mrcAoa.push(["","TOTAL MONTHLY RECURRING",SUM.mrc],["","Annualized (× 12)",SUM.mrcY]);
  mrcFmts.push([null,null,BF],[null,null,BF]);
  sh("Monthly Recurring",mrcAoa,mrcFmts,[{wch:34},{wch:52},{wch:15}]);
  sh("Yearly Recurring",[
    ["Yearly recurring costs"],["BDT · totals BDT 1,80,000 per year"],[],
    ["Item","Amount (BDT)"],
    ...YRC.map(r=>[r[0],r[1]]),
    ["Total",SUM.yrc]
  ],[null,null,null,null,...YRC.map(()=>[BF]),[BF]],[{wch:40},{wch:14}]);
  sh("Emergency Reserve",[
    ["Emergency reserve"],["BDT · totals BDT 4,50,000 · held intact across the 12-month plan"],[],
    ["Risk category","Reserve (BDT)"],
    ...CONT.map(r=>[r[0],r[1]]),
    ["Total",SUM.cont]
  ],[null,null,null,null,...CONT.map(()=>[BF]),[BF]],[{wch:44},{wch:14}]);
  XLSX.writeFile(wb,"Biluibaba_x_Study_Insights_Financial_Model.xlsx");
  showToast("Financial model exported",`6 sheets · ${LINE_TOTAL} line items · BDT — exactly as documented`);
}

document.addEventListener("DOMContentLoaded",()=>{
  buildTicker();
  buildRail();
  buildUof();
  renderTab();
  initTableFx();
  updateCaptions();
  function tryCharts(){if(window.Chart){initCharts();initDeploySlider();}else setTimeout(tryCharts,120);}
  tryCharts();
  document.querySelectorAll("[data-dl]").forEach(b=>b.addEventListener("click",exportXLSX));
});
