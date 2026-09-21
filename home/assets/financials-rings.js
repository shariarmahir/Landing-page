/* Shared premium treatment for the page's doughnut/pie charts:
   a segment gap, a hover lift, leader-lined percentages on the larger
   slices, a typeset centre, and an HTML key that carries the values so
   the ring itself stays uncluttered. Loaded before the chart modules. */

/* Arc styling shared by every ring. */
const ARC={
  borderColor:"#FAF6EC",
  borderWidth:2,
  borderRadius:3,
  spacing:2,
  hoverOffset:10,
  hoverBorderColor:"#FAF6EC"
};

/* Base options. total/unit drive the tooltip and centre readout. */
const ringOpts=(total,unit)=>({
  maintainAspectRatio:false,
  cutout:"66%",
  radius:"88%",
  layout:{padding:{top:8,bottom:8,left:8,right:8}},
  animation:{duration:1300,easing:"easeOutQuart",animateRotate:true,animateScale:false},
  plugins:{}
});

/* Centre readout. Shows the hovered slice when there is one, otherwise
   the headline total — so the ring doubles as a readout. */
const ringCenter=(big,small)=>({
  id:"ringCenter",
  afterDraw(chart){
    const meta=chart.getDatasetMeta(0);
    if(!meta.data.length)return;
    const {ctx}=chart;
    const a=meta.data[0];
    const x=a.x,y=a.y;
    // inner radius sets how much room the text has
    const inner=a.innerRadius||60;
    const act=chart.getActiveElements&&chart.getActiveElements();
    let t1=big,t2=small;
    if(act&&act.length){
      const i=act[0].index;
      const v=chart.data.datasets[0].data[i];
      const tot=chart.data.datasets[0].data.reduce((s,n)=>s+n,0);
      t1=(v/tot*100).toFixed(1)+"%";
      t2=chart.data.labels[i];
      if(Array.isArray(t2))t2=t2.join(" ");
    }
    ctx.save();
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    // scale the headline to the space available
    let size=Math.max(13,Math.min(25,inner*0.46));
    ctx.font=`700 ${size}px Fraunces, Georgia, serif`;
    // shrink further if the string is still too wide for the hole
    let guard=0;
    while(ctx.measureText(t1).width>inner*1.72&&size>10&&guard++<12){
      size-=1;ctx.font=`700 ${size}px Fraunces, Georgia, serif`;
    }
    ctx.fillStyle="#151310";
    ctx.fillText(t1,x,y-7);
    ctx.font=`500 ${Math.max(7.5,Math.min(9,inner*0.15))}px 'Spline Sans Mono', monospace`;
    ctx.fillStyle="#6F695B";
    // the caption is clipped rather than allowed to spill past the ring
    const cap=(t2||"").toUpperCase();
    const maxW=inner*1.78;
    let s=cap;
    if(ctx.measureText(s).width>maxW){
      while(s.length>3&&ctx.measureText(s+"…").width>maxW)s=s.slice(0,-1);
      s+="…";
    }
    ctx.fillText(s,x,y+11);
    ctx.restore();
  }
});

/* Percentage on each slice big enough to hold one, with a short leader
   line out to the smaller ones. Slices under 4% are left to the key. */
const ringLeader={
  id:"ringLeader",
  afterDatasetsDraw(chart){
    const meta=chart.getDatasetMeta(0);
    if(!meta.data.length)return;
    const {ctx,chartArea:ca}=chart;
    const ds=chart.data.datasets[0].data;
    const tot=ds.reduce((s,n)=>s+n,0);
    if(!tot)return;
    const narrow=chart.width<340;
    ctx.save();
    ctx.font=`600 ${narrow?9:10}px 'Spline Sans Mono', monospace`;
    ctx.textBaseline="middle";
    meta.data.forEach((a,i)=>{
      const pct=ds[i]/tot*100;
      if(pct<4)return;                       // too thin to label on the ring
      const mid=(a.startAngle+a.endAngle)/2;
      const cos=Math.cos(mid),sin=Math.sin(mid);
      // one decimal throughout, so the ring agrees with the key beneath it
      const tx=pct.toFixed(1)+"%";
      if(pct>=11){
        // comfortably inside the band
        const r=(a.innerRadius+a.outerRadius)/2;
        ctx.textAlign="center";
        ctx.fillStyle="rgba(255,255,255,.96)";
        ctx.fillText(tx,a.x+cos*r,a.y+sin*r);
      }else{
        // leader line out past the ring
        const r0=a.outerRadius+1,r1=a.outerRadius+9;
        ctx.beginPath();
        ctx.moveTo(a.x+cos*r0,a.y+sin*r0);
        ctx.lineTo(a.x+cos*r1,a.y+sin*r1);
        ctx.strokeStyle="rgba(21,19,16,.3)";
        ctx.lineWidth=1;
        ctx.stroke();
        const right=cos>=0;
        ctx.textAlign=right?"left":"right";
        ctx.fillStyle="#57513F";
        let lx=a.x+cos*(r1+3);
        const w=ctx.measureText(tx).width;
        // keep the label inside the canvas
        lx=Math.min(Math.max(lx,ca.left+(right?0:w)),ca.right-(right?w:0));
        ctx.fillText(tx,lx,a.y+sin*(r1+3));
      }
    });
    ctx.restore();
  }
};

/* HTML key beneath a ring: swatch, label, value, share. Carrying the
   numbers here keeps them off the chart and lets them wrap properly. */
function buildKeys(id,rows){
  const el=document.getElementById(id);
  if(!el)return;
  el.innerHTML=rows.map(r=>
    `<li><span class="rk-l"><i style="background:${r[1]}"></i>${r[0]}</span>`+
    `<span class="rk-v">${r[2]}<b>${r[3]}</b></span></li>`).join("");
}
