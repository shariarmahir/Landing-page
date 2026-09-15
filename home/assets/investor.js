(() => {
  const money = n => new Intl.NumberFormat('en-BD').format(n);
  document.querySelectorAll('[data-money]').forEach(el => el.textContent = money(Number(el.dataset.money)));

  const nav = document.querySelector('.nav');
  addEventListener('scroll', () => nav?.classList.toggle('is-scrolled', scrollY > 20), {passive:true});
  document.querySelector('.menu')?.addEventListener('click', () => document.querySelector('.nav__links')?.classList.toggle('open'));
  document.querySelectorAll('.nav__links a').forEach(a => a.addEventListener('click', () => document.querySelector('.nav__links')?.classList.remove('open')));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const canvas = document.querySelector('.hero__canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d'); let w, h, t = 0;
    const resize = () => { const ratio = devicePixelRatio || 1; w=canvas.clientWidth; h=canvas.clientHeight; canvas.width=w*ratio; canvas.height=h*ratio; ctx.setTransform(ratio,0,0,ratio,0,0); };
    const draw = () => {
      ctx.clearRect(0,0,w,h); t += .003;
      const cx = w*.72, cy = h*.46, size = Math.min(w,h)*.28;
      for(let ring=0; ring<5; ring++) {
        ctx.beginPath();
        for(let i=0;i<=68;i++) { const a=i/68*Math.PI*2; const wave=Math.sin(a*3+t*4+ring)*16; const x=cx+Math.cos(a+t*(ring%2?-.22:.25))* (size-ring*25+wave); const y=cy+Math.sin(a+t*(ring%2?-.22:.25))* (size*.48-ring*10+wave*.35); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }
        ctx.strokeStyle=ring%2?'rgba(255,179,138,.28)':'rgba(153,214,195,.22)';ctx.lineWidth=1;ctx.stroke();
      }
      for(let i=0;i<50;i++){const a=i/50*Math.PI*2+t*.15;const r=size+18+Math.sin(i+t*2)*18;const x=cx+Math.cos(a)*r;const y=cy+Math.sin(a)*r*.48;ctx.fillStyle='rgba(255,208,183,.65)';ctx.beginPath();ctx.arc(x,y,1.3,0,7);ctx.fill();}
      requestAnimationFrame(draw);
    }; resize(); addEventListener('resize',resize); draw();
  }

  if (window.Chart) {
    Chart.defaults.color = '#94a39f'; Chart.defaults.font.family = 'DM Sans';
    const funding = document.getElementById('fundingChart');
    if (funding) new Chart(funding, {type:'doughnut',data:{labels:['12-month recurring costs','One-time costs','Contingency reserve','Yearly recurring costs'],datasets:[{data:[6600000,1550000,450000,180000],backgroundColor:['#ffb38a','#ff6b4a','#99d6c3','#526e70'],borderWidth:0,hoverOffset:8}]},options:{cutout:'73%',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.label}: BDT ${money(c.raw)}`}}},animation:{animateRotate:true,duration:1200}}});
    const cash = document.getElementById('cashChart');
    if (cash) new Chart(cash,{type:'bar',data:{labels:['One-time setup','Recurring / 12 months','Yearly recurring','Contingency'],datasets:[{data:[1550000,6600000,180000,450000],backgroundColor:['#ff6b4a','#ffb38a','#99d6c3','#526e70'],borderRadius:8,borderSkipped:false}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`BDT ${money(c.raw)}`}}},scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(255,255,255,.08)'},ticks:{callback:v=>`BDT ${(v/100000).toFixed(0)} Lac`}}}}});
  }
})();
