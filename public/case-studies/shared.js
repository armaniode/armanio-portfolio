// The exported pages are standalone: only visible project videos need playback logic.
const videos = [...document.querySelectorAll('video')];
const desktop = window.matchMedia('(min-width: 1280px)');
const observer = new IntersectionObserver(entries => {
  for (const {target, isIntersecting} of entries) {
    target.muted = true;
    if (isIntersecting && desktop.matches) target.play().catch(() => {});
    else target.pause();
  }
}, {rootMargin: '150px 0px', threshold: 0.01});
for (const video of videos) {
  video.preload = 'metadata';
  observer.observe(video);
}
desktop.addEventListener('change', () => {
  for (const video of videos) {
    video.pause();
    observer.unobserve(video);
    observer.observe(video);
  }
});
