/* Revenue, cash flow, investment & returns — sourced from the combined
   financial model workbook (Profit / Cash Flow Summary / Investment and Return). */

/* ---- Profit sheet: estimated revenue structure ---- */
const REV=[
 {l:"E-commerce",v:"BB",m:150000,n:"Pet food, accessories and supplies sold through the Biluibaba platform — the largest single revenue line."},
 {l:"Vet service — online & offline",v:"BB",m:100000,n:"Consultation revenue from the in-house vet service, delivered both online and from the Karwan Bazar consultation rooms."},
 {l:"Pet adoption & delivery",v:"BB",m:50000,n:"Adoption facilitation and the last-mile delivery network across Dhaka City."},
 {l:"Online revenue from content",v:"BB",m:50000,n:"Monetised content across Facebook and YouTube — the audience built during launch marketing."},
 {l:"Study Insights — consultancy",v:"SI",m:150000,n:"Student admission and visa consultancy fees from the Study Insights practice."}
];
const REV_M=500000, REV_Y=6000000;

/* ---- Cash Flow Summary sheet ---- */
const CF=[
 {y:"Pre-seed",lab:"Investment",open:0,openN:"Founders had expended BDT 9,00,000",in:8800000,inN:"Investment",out:1550000,outN:"One-time cost",close:7250000,
  n:"The founders had already expended BDT 9,00,000 of their own capital before the raise — spent, not held, so it opens no cash balance. The BDT 88,00,000 commitment arrives and the one-time setup of BDT 15,50,000 is deployed, leaving BDT 72,50,000 to fund operations."},
 {y:"Year 1",lab:"Launch year",open:7250000,openN:"",in:6000000,inN:"Revenue",out:6780000,outN:"MRC + YRC",close:6470000,
  n:"First full year of combined operations. Revenue of BDT 60,00,000 against BDT 67,80,000 of recurring cost — an operating loss of BDT 7,80,000 absorbed comfortably by the funded runway."},
 {y:"Year 2",lab:"Break-even",open:6470000,openN:"",in:9000000,inN:"Revenue · 1.5×",out:7797000,outN:"Cost · +15%",close:7673000,
  n:"Revenue grows 1.5× to BDT 90,00,000 while cost grows just 15%. The business turns over to an operating profit of BDT 12,03,000 — break-even is crossed during this year."},
 {y:"Year 3",lab:"Profitable scale",open:7673000,openN:"",in:12000000,inN:"Revenue · 2×",out:8966550,outN:"Cost · +15%",close:10706450,
  n:"Revenue doubles off Year 1 to BDT 1,20,00,000 against BDT 89,66,550 of cost — an operating profit of BDT 30,33,450 and a closing cash position above BDT 1 crore."}
];
const PROFIT=[{y:"Year 1",rev:6000000,cost:6780000,op:-780000},{y:"Year 2",rev:9000000,cost:7797000,op:1203000},{y:"Year 3",rev:12000000,cost:8966550,op:3033450}];

/* ---- Investment and Return sheet ----
   The workbook's stake column carries a doubled percentage format (0.80 rendered
   as "80%" of a 200% total). The underlying model is unambiguous elsewhere:
   BDT 88,00,000 into a BDT 2,20,00,000 post-money = 40%, and 40% of the
   BDT 11,00,00,000 three-year valuation = BDT 4,40,00,000 — the sheet's own
   stake value and its 5x multiplier. Those reconciled figures are used here. */
const INVEST=[
 ["Investment amount",8800000,"The funding commitment being raised, covering both ventures for twelve months.",1],
 ["Equity offered","40%","50% of Study Insights and 30% of Biluibaba, blended across the combined entity.",0],
 ["Implied pre-money valuation",13200000,"The combined valuation of both ventures immediately before the raise.",1],
 ["Post-money valuation",22000000,"Pre-money of BDT 1,32,00,000 plus the BDT 88,00,000 commitment — BDT 2.20 crore.",1],
 ["Investor stake post-funding","40%","The seed investor's holding in the combined entity once the round closes.",0],
 ["Founder & team ownership","60%","Retained by the founding team, inclusive of the ESOP pool where required.",0]
];
const RETURN=[
 ["Seed stage — now",22000000,"Post-money valuation at the close of this round."],
 ["Projected valuation — after 3 years",110000000,"BDT 11 crore, supported by the Year 3 revenue of BDT 1.20 crore and BDT 30.33 lakh operating profit."],
 ["Investor 40% stake value — 3 years",44000000,"40% of the projected BDT 11,00,00,000 valuation."],
 ["Investor ROI multiplier","5x","BDT 4,40,00,000 returned on a BDT 88,00,000 commitment."],
 ["3-year ROI","400%","(BDT 4.40 Cr − BDT 88 L) ÷ BDT 88 L × 100."]
];
const CAP=[
 ["Founders & team",60,"#1f6b4a","Includes the ESOP pool if and when required"],
 ["Seed investor",40,"#b9793f","BDT 88,00,000 commitment"]
];

const fmtR=n=>{const s=Math.round(Math.abs(n)).toString(),l3=s.slice(-3),rest=s.slice(0,-3);return (n<0?"−":"")+"BDT "+(rest?rest.replace(/\B(?=(\d{2})+(?!\d))/g,",")+",":"")+l3;};
const lakh=n=>(n/100000);
const pcR=(a,t)=>(a/t*100).toFixed(1)+"%";

/* ---------------- revenue table ---------------- */
function buildRevenue(){
  const t=document.getElementById("revTable");if(!t)return;
  let h="<thead><tr><th class='tl'>Revenue stream</th><th>Venture</th><th>Monthly (BDT)</th><th>Annual (BDT)</th><th>Share</th></tr></thead><tbody>";
  REV.forEach(r=>{
    h+=`<tr data-l="${r.l}" data-n="${r.n}"><td class="tl">${r.l}</td><td><span class="tagv ${r.v.toLowerCase()}">${r.v}</span></td><td>${fmtR(r.m)}</td><td>${fmtR(r.m*12)}</td><td>${pcR(r.m,REV_M)}</td></tr>`;
  });
  h+=`<tr class="em" data-l="Total estimated revenue" data-n="The combined monthly revenue of both ventures at the Year 1 run rate — BDT 5,00,000 per month, BDT 60,00,000 per year."><td class="tl">Total estimated revenue</td><td></td><td>${fmtR(REV_M)}</td><td>${fmtR(REV_Y)}</td><td>100.0%</td></tr>`;
  t.innerHTML=h+"</tbody>";
  const bb=REV.filter(r=>r.v==="BB").reduce((s,r)=>s+r.m,0);
  document.getElementById("revSplit").innerHTML=
    `<div class="vs"><span class="vs-k"><i style="background:#1f6b4a"></i>Biluibaba</span><b>${fmtR(bb)} / mo · ${pcR(bb,REV_M)}</b></div>`+
    `<div class="vs"><span class="vs-k"><i style="background:#b9793f"></i>Study Insights</span><b>${fmtR(REV_M-bb)} / mo · ${pcR(REV_M-bb,REV_M)}</b></div>`;
}

/* ---------------- cash flow table ---------------- */
function buildCashflow(){
  const t=document.getElementById("cfTable");if(!t)return;
  let h="<thead><tr><th class='tl'>Year</th><th>Opening cash</th><th>Cash inflow</th><th>Cash outflow</th><th>Closing cash</th></tr></thead><tbody>";
  CF.forEach(r=>{
    const sub=x=>x?`<span class="cf-n">${x}</span>`:"";
    h+=`<tr data-l="${r.y} — ${r.lab}" data-n="${r.n}"><td class="tl">${r.y}<span class="cf-n">${r.lab}</span></td><td>${r.open?fmtR(r.open):"—"}${sub(r.openN)}</td><td class="pos">${fmtR(r.in)}${sub(r.inN)}</td><td class="neg">${fmtR(r.out)}${sub(r.outN)}</td><td><b>${fmtR(r.close)}</b></td></tr>`;
  });
  t.innerHTML=h+"</tbody>";
  const p=document.getElementById("cfProfit");
  p.innerHTML=PROFIT.map(r=>`<div class="pf${r.op<0?" down":""}"><span>${r.y} operating ${r.op<0?"loss":"profit"}</span><b>${fmtR(r.op)}</b><i>Revenue ${fmtR(r.rev)} · cost ${fmtR(r.cost)}</i></div>`).join("")
   +`<div class="pf be"><span>Break-even</span><b>During Year 2</b><i>Cash never falls below the protected reserve</i></div>`;
}

/* ---------------- investment & returns ---------------- */
function buildInvestment(){
  const inv=document.getElementById("invTable");
  if(inv){
    let h="<thead><tr><th class='tl'>Item</th><th>Amount / detail</th></tr></thead><tbody>";
    INVEST.forEach(r=>{h+=`<tr data-l="${r[0]}" data-n="${r[2]}"><td class="tl">${r[0]}</td><td><b>${r[3]?fmtR(r[1]):r[1]}</b></td></tr>`;});
    inv.innerHTML=h+"</tbody>";
  }
  const ret=document.getElementById("retTable");
  if(ret){
    let h="<thead><tr><th class='tl'>Metric</th><th>Value</th></tr></thead><tbody>";
    RETURN.forEach((r,i)=>{h+=`<tr class="${i===4?"fin":""}" data-l="${r[0]}" data-n="${r[2]}"><td class="tl">${r[0]}</td><td><b>${typeof r[1]==="number"?fmtR(r[1]):r[1]}</b></td></tr>`;});
    ret.innerHTML=h+"</tbody>";
  }
  const cap=document.getElementById("capTable");
  if(cap){
    let h="<thead><tr><th class='tl'>Shareholder</th><th>Stake</th><th>Remarks</th></tr></thead><tbody>";
    CAP.forEach(r=>{h+=`<tr data-l="${r[0]}" data-n="${r[3]}"><td class="tl"><span class="swatch" style="background:${r[2]}"></span>${r[0]}</td><td><b>${r[1]}%</b></td><td>${r[3]}</td></tr>`;});
    h+=`<tr class="em" data-l="Total" data-n="Post-money valuation of BDT 2,20,00,000 — BDT 2 crore 20 lakh."><td class="tl">Total</td><td><b>100%</b></td><td>Post-money valuation BDT 2,20,00,000</td></tr>`;
    cap.innerHTML=h+"</tbody>";
  }
}

/* ---------------- charts ---------------- */
let chRev,chCap,chCash,chGrow,chVal;
function initReturnCharts(){
  if(!window.Chart)return;
  const TT={backgroundColor:"#151310",borderColor:"rgba(232,224,202,.22)",borderWidth:1,titleColor:"#EDE7D6",bodyColor:"#C9C2B0",padding:12,cornerRadius:2,boxWidth:9,boxHeight:9};
  const GRID={color:"rgba(21,19,16,.08)"};
  const ANIM={duration:1400,easing:"easeOutQuart"};
  const seen=new WeakSet();

  /* revenue mix — animated pie */
  const revEl=document.getElementById("chRev");
  if(revEl)chRev=new Chart(revEl,{
    type:"pie",
    data:{labels:REV.map(r=>r.l),datasets:[{data:REV.map(r=>lakh(r.m)),backgroundColor:["#1f6b4a","#2e7350","#43936b","#6baf88","#b9793f"],borderColor:"#FAF6EC",borderWidth:3,hoverOffset:14}]},
    options:{maintainAspectRatio:false,animation:{...ANIM,animateRotate:true,animateScale:true},
      plugins:{legend:{position:"bottom",labels:{boxWidth:9,boxHeight:9,padding:11}},
      tooltip:{...TT,callbacks:{label:c=>` ${c.label}: BDT ${c.parsed.toFixed(2)} L / mo · ${(c.parsed/5*100).toFixed(1)}%`}}}}
  });

  /* cap table — animated doughnut with centre text */
  const capCenter={id:"capCenter",afterDraw(chart){
    const meta=chart.getDatasetMeta(0);if(!meta.data.length)return;
    const {ctx}=chart,x=meta.data[0].x,y=meta.data[0].y;
    ctx.save();ctx.textAlign="center";
    ctx.font="700 22px Fraunces, Georgia, serif";ctx.fillStyle="#151310";ctx.fillText("BDT 2.20 Cr",x,y-2);
    ctx.font="500 8.5px 'Spline Sans Mono', monospace";ctx.fillStyle="#6F695B";ctx.fillText("POST-MONEY VALUATION",x,y+16);
    ctx.restore();
  }};
  const capEl=document.getElementById("chCap");
  if(capEl)chCap=new Chart(capEl,{
    type:"doughnut",
    data:{labels:CAP.map(c=>c[0]),datasets:[{data:CAP.map(c=>c[1]),backgroundColor:CAP.map(c=>c[2]),borderColor:"#FAF6EC",borderWidth:3,hoverOffset:12}]},
    options:{maintainAspectRatio:false,cutout:"64%",animation:{...ANIM,animateRotate:true,animateScale:true},
      plugins:{legend:{position:"bottom",labels:{boxWidth:9,boxHeight:9,padding:12}},
      tooltip:{...TT,callbacks:{label:c=>` ${c.label}: ${c.parsed}% of the combined entity`}}}}
    ,plugins:[capCenter]
  });

  /* revenue vs cost, three years */
  const growEl=document.getElementById("chGrow");
  if(growEl)chGrow=new Chart(growEl,{
    type:"bar",
    data:{labels:PROFIT.map(p=>p.y),datasets:[
      {label:"Revenue",data:PROFIT.map(p=>lakh(p.rev)),backgroundColor:"#1f6b4a",barPercentage:.74,categoryPercentage:.62},
      {label:"Operating cost",data:PROFIT.map(p=>lakh(p.cost)),backgroundColor:"#b9793f",barPercentage:.74,categoryPercentage:.62},
      {label:"Operating profit",type:"line",data:PROFIT.map(p=>lakh(p.op)),borderColor:"#151310",backgroundColor:"#68c494",borderWidth:2.5,pointRadius:5,pointHoverRadius:7,tension:.3}
    ]},
    options:{maintainAspectRatio:false,animation:ANIM,interaction:{mode:"index",intersect:false},
      plugins:{legend:{position:"top",align:"end",labels:{boxWidth:9,boxHeight:9,padding:14}},
      tooltip:{...TT,callbacks:{label:c=>` ${c.dataset.label}: BDT ${c.parsed.y.toFixed(2)} L`}}},
      scales:{x:{grid:{display:false}},y:{grid:GRID,border:{display:false},ticks:{callback:v=>"BDT "+v+"L"}}}}
  });

  /* cumulative closing cash */
  const cashEl=document.getElementById("chCash");
  if(cashEl)chCash=new Chart(cashEl,{
    type:"line",
    data:{labels:CF.map(c=>c.y),datasets:[
      {label:"Closing cash",data:CF.map(c=>lakh(c.close)),borderColor:"#1f6b4a",backgroundColor:"rgba(31,107,74,.12)",borderWidth:2.5,pointRadius:5,pointHoverRadius:7,tension:.35,fill:true},
      {label:"Emergency reserve floor — BDT 4.50 L",data:Array(CF.length).fill(4.5),borderColor:"#b9793f",borderWidth:2,borderDash:[6,5],pointRadius:0}
    ]},
    options:{maintainAspectRatio:false,animation:ANIM,interaction:{mode:"index",intersect:false},
      plugins:{legend:{position:"top",align:"end",labels:{boxWidth:9,boxHeight:9,padding:14}},
      tooltip:{...TT,callbacks:{label:c=>` ${c.dataset.label}: BDT ${c.parsed.y.toFixed(2)} L`}}},
      scales:{x:{grid:{display:false}},y:{grid:GRID,border:{display:false},min:0,ticks:{callback:v=>"BDT "+v+"L"}}}}
  });

  /* valuation growth */
  /* Crore value sitting above each column, so the step from 1.32 → 2.20
     → 11 reads without tracing back to the axis. */
  const colValue={id:"colValue",afterDatasetsDraw(chart){
    const {ctx,chartArea:ca}=chart,meta=chart.getDatasetMeta(0);if(!meta.data.length)return;
    const narrow=chart.width<430;
    ctx.save();ctx.textAlign="center";ctx.textBaseline="bottom";
    ctx.font=`700 ${narrow?10.5:13}px Fraunces, Georgia, serif`;ctx.fillStyle="#151310";
    meta.data.forEach((b,i)=>{
      const v=chart.data.datasets[0].data[i];
      const tx="BDT "+(v/100).toFixed(2)+" Cr",half=ctx.measureText(tx).width/2;
      // keep the label inside the plot area on narrow screens
      const px=Math.min(Math.max(b.x,ca.left+half),ca.right-half);
      ctx.fillText(tx,px,b.y-7);
    });
    ctx.restore();
  }};
  const valEl=document.getElementById("chVal");
  if(valEl)chVal=new Chart(valEl,{
    type:"bar",
    data:{labels:[["Pre-money"],["Post-money","now"],["Projected","3 years"]],datasets:[
      {label:"Valuation",data:[132,220,1100],
       backgroundColor:["#b3a98f","#43936b","#1f6b4a"],hoverBackgroundColor:"#151310",
       barPercentage:.5,categoryPercentage:.8,borderRadius:3,borderSkipped:false}
    ]},
    options:{maintainAspectRatio:false,animation:ANIM,
      layout:{padding:{top:26,left:2,right:6}},
      plugins:{legend:{display:false},
      tooltip:{...TT,callbacks:{label:c=>` BDT ${c.parsed.y} lakh · BDT ${(c.parsed.y/100).toFixed(2)} crore`}}},
      scales:{
        x:{grid:{display:false},border:{display:false},
           ticks:{padding:8,color:"#57513F",font:{family:"'Archivo', system-ui, sans-serif",size:11.5,weight:"500"}}},
        y:{grid:GRID,border:{display:false},beginAtZero:true,
           ticks:{callback:v=>"BDT "+v+"L",font:{size:9.5},maxTicksLimit:6,padding:4}}}},
    plugins:[colValue]
  });

  /* replay the animation when each chart scrolls into view */
  const all=[[revEl,()=>chRev],[capEl,()=>chCap],[growEl,()=>chGrow],[cashEl,()=>chCash],[valEl,()=>chVal]];
  if("IntersectionObserver" in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(!e.isIntersecting||seen.has(e.target))return;
      seen.add(e.target);
      const pair=all.find(a=>a[0]===e.target);const c=pair&&pair[1]();
      if(c)c.update();
    }),{threshold:.35});
    all.forEach(a=>{if(a[0])io.observe(a[0]);});
  }
}

/* ---------------- ROI counter ---------------- */
function initRoiCount(){
  const els=[...document.querySelectorAll("[data-count]")];
  if(!els.length)return;
  const run=el=>{
    const to=parseFloat(el.dataset.count),dec=+(el.dataset.dec||0),suf=el.dataset.suf||"",pre=el.dataset.pre||"";
    const t0=performance.now(),dur=1500;
    const step=now=>{
      const p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,3);
      el.textContent=pre+(to*e).toFixed(dec)+suf;
      if(p<1)requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if(!("IntersectionObserver" in window)){els.forEach(run);return;}
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting&&!e.target.dataset.done){e.target.dataset.done="1";run(e.target);io.unobserve(e.target);}
  }),{threshold:.5});
  els.forEach(el=>io.observe(el));
}

/* ---------------- shared row tooltip ---------------- */
function initReturnTips(){
  const tip=document.getElementById("rowTip");if(!tip)return;
  document.querySelectorAll(".rt-table").forEach(t=>{
    t.addEventListener("mousemove",e=>{
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
    t.addEventListener("mouseleave",()=>tip.classList.remove("show"));
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  buildRevenue();
  buildCashflow();
  buildInvestment();
  initReturnTips();
  initRoiCount();
  (function wait(){if(window.Chart)initReturnCharts();else setTimeout(wait,120);})();
});
