(function(){
  const section = document.getElementById('showreel');
  if(!section) return;

  const stage = section.querySelector('.container');
  const cards = Array.from(section.querySelectorAll('.reel-card'));

  const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));
  const lerp  = (a,b,t)=>a+(b-a)*t;
  const smooth = (a,b,x)=>{ const t=clamp((x-a)/(b-a),0,1); return t*t*(3-2*t); };

  const DAMP_IN = 0.8;   // entry smoothness
  const DAMP_OUT = 0.7;  // exit smoothness

  function update(){
    const vh = window.innerHeight;
    const rect = section.getBoundingClientRect();
    const totalScroll = section.offsetHeight - vh;
    const progress = clamp((0 - rect.top) / totalScroll, 0, 1);
    const indexFloat = progress * (cards.length - 1);

    cards.forEach((card, i) => {
      const t = i - indexFloat;
      let opacity = 0;
      let transform = '';

      // hide far cards instantly
      if (t < -1 || t > 1.25) {
        card.classList.add('is-hidden');
        return;
      } else {
        card.classList.remove('is-hidden');
      }

      if (t <= 0) {
        // CURRENT CARD (scrolling out)
        const p = clamp(1 - (-t) / DAMP_OUT, 0, 1);
        const sc = lerp(1.0, 0.6, 1 - p);   // stronger zoom-out (40%)
        const y  = lerp(0, -0.35 * vh, 1 - p);
        const z  = lerp(0, -400, 1 - p);   // push farther back
        opacity = lerp(1, 0.4, 1 - p);     // fade out smoothly
        transform = `translate3d(0, ${y}px, ${z}px) scale(${sc})`;
      } else {
        // NEXT CARD (scrolling in)
        const u = clamp(1 - t / DAMP_IN, 0, 1);
        const sc = lerp(0.8, 1.0, u);      // start smaller, zoom in
        const y  = lerp(0.4 * vh, 0, u);
        const z  = lerp(-300, 0, u);
        opacity = smooth(0, 1, u);
        transform = `translate3d(0, ${y}px, ${z}px) scale(${sc})`;
      }

      card.style.opacity = opacity.toFixed(3);
      card.style.transform = transform;
      card.style.zIndex = 1000 + Math.round((1 - Math.abs(t)) * 500);
    });
  }

  const onScroll = ()=>requestAnimationFrame(update);
  update();
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', update);
})();
