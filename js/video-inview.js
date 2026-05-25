(function(){
  const vids = document.querySelectorAll('video[data-autoplay-inview]');
  if (!('IntersectionObserver' in window)) return;
  let activeVid = null;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting && e.intersectionRatio > 0.5) {
        if (activeVid && activeVid !== v) {
          activeVid.pause();
          activeVid.currentTime = 0;
          activeVid.classList.remove('is-playing');
        }
        v.play().then(() => v.classList.add('is-playing')).catch(() => {});
        activeVid = v;
      } else {
        v.pause();
        v.classList.remove('is-playing');
      }
    });
  }, { threshold: [0, 0.5, 1] });
  vids.forEach(v => io.observe(v));
})();
