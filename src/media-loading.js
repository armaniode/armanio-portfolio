// Preserve the original media URLs and dimensions, but avoid fetching offscreen files.
export function deferMedia(html) {
  return html.replace(/<(img|video)\b[^>]*>/gi, tag => tag
    .replace(/\ssrc=/i, ' data-src=')
    .replace(/\spreload="[^"]*"/i, ' preload="none"'));
}

export function setupMediaLoading(root) {
  const desktop = window.matchMedia('(min-width: 1280px)');
  const images = [...root.querySelectorAll('img[data-src]')];
  const videos = [...root.querySelectorAll('video[data-src]')];
  const visible = element => {
    const rect = element.getBoundingClientRect();
    return desktop.matches && rect.width > 0 && rect.height > 0;
  };
  const load = element => {
    if (!visible(element) || element.hasAttribute('src')) return;
    if (element.tagName === 'VIDEO') element.preload = 'auto';
    else element.decoding = 'async';
    element.src = element.dataset.src;
  };
  const imageObserver = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting && visible(target)) {
        load(target);
        imageObserver.unobserve(target);
      }
    }
  }, { rootMargin: '400px 0px', threshold: 0 });
  const videoLoader = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting && visible(target)) {
        load(target);
        videoLoader.unobserve(target);
      }
    }
  }, { rootMargin: '800px 0px', threshold: 0 });
  const playback = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting && visible(target)) {
        load(target);
        target.muted = true;
        target.play().catch(() => {});
      } else target.pause();
    }
  }, { rootMargin: '150px 0px', threshold: 0.01 });
  const observe = () => {
    imageObserver.disconnect();
    videoLoader.disconnect();
    playback.disconnect();
    videos.forEach(video => video.pause());
    if (!desktop.matches) return;
    // Prioritize the visible images, including when arriving at a project anchor.
    for (const image of images) {
      const rect = image.getBoundingClientRect();
      if (visible(image) && rect.bottom > 0 && rect.top < window.innerHeight) {
        image.fetchPriority = 'high';
        load(image);
      } else if (!image.hasAttribute('src')) imageObserver.observe(image);
    }
    for (const video of videos) {
      if (!video.hasAttribute('src')) videoLoader.observe(video);
      playback.observe(video);
    }
  };
  observe();
  desktop.addEventListener('change', observe);
  return () => {
    imageObserver.disconnect();
    videoLoader.disconnect();
    playback.disconnect();
    desktop.removeEventListener('change', observe);
    videos.forEach(video => video.pause());
  };
}
