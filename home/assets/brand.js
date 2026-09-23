(() => {
  const body=document.body, mobile=document.querySelector('.mobile');
  document.querySelector('#menuOpen')?.addEventListener('click',()=>mobile?.classList.add('open'));
  document.querySelector('#menuClose')?.addEventListener('click',()=>mobile?.classList.remove('open'));
  mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));
  addEventListener('scroll',()=>body.classList.toggle('scrolled',scrollY>24),{passive:true});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target)}}),{threshold:.12});
  document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));
  let started=false;
  function startTerrain(){
    if(started||!window.THREE||!document.querySelector('#terrain'))return; started=true;
    const canvas=document.querySelector('#terrain'),hero=canvas.closest('.hero'),renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true}),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(47,1,.1,180);
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.7)); camera.position.set(0,10,29); scene.fog=new THREE.Fog(0x151310,24,84);
    const W=78,D=45,X=108,Z=63,geo=new THREE.PlaneGeometry(W,D,X,Z);geo.rotateX(-Math.PI/2);const pos=geo.attributes.position,colors=new Float32Array(pos.count*3),a=new THREE.Color(0x17402d),b=new THREE.Color(0x4da776),c=new THREE.Color(0xede6d4),shade=new THREE.Color();
    const height=(x,z,t)=>{const u=(x+W/2)/W;return Math.pow(u,2.1)*12-2+Math.sin(x*.14+t)*Math.cos(z*.13-t*.65)*(1+u)+Math.sin(x*.06-z*.1+t*.3)*1.7};
    for(let i=0;i<pos.count;i++){const y=height(pos.getX(i),pos.getZ(i),0),h=Math.max(0,Math.min(1,(y+3)/13));pos.setY(i,y);shade.copy(a).lerp(b,Math.min(1,h*1.7));if(h>.62)shade.lerp(c,(h-.62)*1.5);colors.set([shade.r,shade.g,shade.b],i*3)}geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
    const points=new THREE.Points(geo,new THREE.PointsMaterial({size:.28,vertexColors:true,transparent:true,opacity:.9,depthWrite:false})),group=new THREE.Group();group.add(points);group.rotation.y=-.22;scene.add(group);
    let ty=-.22,cy=-.22,tx=0,cx=0,drag=false,lx=0,ly=0,t=0,visible=true;canvas.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;ly=e.clientY;canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointermove',e=>{if(!drag)return;ty+=(e.clientX-lx)*.004;tx=Math.max(-.3,Math.min(.3,tx+(e.clientY-ly)*.002));lx=e.clientX;ly=e.clientY});addEventListener('pointerup',()=>drag=false);new IntersectionObserver(e=>visible=e[0].isIntersecting).observe(hero);
    const resize=()=>{renderer.setSize(hero.clientWidth,hero.clientHeight,false);camera.aspect=hero.clientWidth/hero.clientHeight;camera.updateProjectionMatrix()};resize();addEventListener('resize',resize);
    const frame=()=>{requestAnimationFrame(frame);if(!visible)return;t+=.009;for(let i=0;i<pos.count;i++)pos.setY(i,height(pos.getX(i),pos.getZ(i),t));pos.needsUpdate=true;if(!drag)ty+=.0009;cy+=(ty-cy)*.06;cx+=(tx-cx)*.06;group.rotation.y=cy;group.rotation.x=cx;camera.lookAt(0,2,0);renderer.render(scene,camera)};frame();
  }
  /* The hero stats bar is absolutely positioned over the hero, so the hero copy
     has to reserve its height as bottom padding or the text runs underneath it.
     The bar's height varies by page (2-4 stats, labels wrap at narrow widths),
     so measure it rather than assuming a fixed value. */
  const sizeHeroStats=()=>{
    document.querySelectorAll('.hero').forEach(hero=>{
      const stats=hero.querySelector('.hero-stats'),copy=hero.querySelector('.hero-copy');
      if(!stats)return;
      if(getComputedStyle(stats).position!=='absolute'){
        hero.style.removeProperty('--hero-stats-h');hero.style.removeProperty('--hero-min-h');return;
      }
      hero.style.setProperty('--hero-stats-h',Math.ceil(stats.getBoundingClientRect().height)+'px');
      /* aspect-ratio fixes the hero's height, and overflow:hidden clips anything
         taller — so on pages whose headline wraps to three lines the copy would
         be cut off behind the stats bar. Measure the copy's natural height and
         raise the floor only when 16:6 genuinely cannot hold it. */
      if(!copy)return;
      hero.style.removeProperty('--hero-min-h');
      /* Tolerate a few px of slack so a hair of sub-pixel overflow does not cost
         the exact 16:6 ratio; only a real shortfall (a wrapped headline) grows it. */
      const need=Math.ceil(copy.scrollHeight);
      if(need>hero.getBoundingClientRect().height+12)hero.style.setProperty('--hero-min-h',need+'px');
    });
  };
  sizeHeroStats();addEventListener('resize',sizeHeroStats);addEventListener('load',sizeHeroStats);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sizeHeroStats);

  const boot=()=>{body.classList.add('loaded');startTerrain()};addEventListener('load',()=>setTimeout(boot,450));setTimeout(boot,1800);

  function splitLetters(){
    document.querySelectorAll('[data-reveal="letters"]').forEach(el=>{
      const text=el.textContent;
      el.textContent="";
      let i=0;
      for(const ch of text){
        const span=document.createElement("span");
        span.className="L"+(ch==="."?" dot":"");
        span.style.setProperty("--i",i);
        span.textContent=ch===" "?" ":ch;
        el.appendChild(span);
        i++;
      }
    });
  }

  window.showToast=function(title,msg){
    const t=document.getElementById("toastTitle"),m=document.getElementById("toastMsg"),el=document.getElementById("toast");
    if(!el)return;
    t.textContent=title;m.textContent=msg;
    el.classList.add("show");clearTimeout(window.showToast._t);
    window.showToast._t=setTimeout(()=>el.classList.remove("show"),4200);
  };

  function initCopyChips(){
    document.querySelectorAll("[data-email]").forEach(btn=>{
      btn.addEventListener("click",async()=>{
        const email=btn.getAttribute("data-email");
        try{
          await navigator.clipboard.writeText(email);
          showToast("Copied",email+" is on your clipboard");
        }catch(e){
          showToast("Copy this address",email);
        }
      });
    });
  }

  splitLetters();
  initCopyChips();
})();
