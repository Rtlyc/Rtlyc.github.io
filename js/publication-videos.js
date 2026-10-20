// Play silent previews only while visible; native controls remain available.
(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || navigator.connection?.saveData || !('IntersectionObserver' in window)) return;

    const states = new Map();
    const update = (video, state) => {
        if (state.visible && !document.hidden && !state.userPaused && !reducedMotion.matches) {
            video.play().catch(() => {});
        } else if (!video.paused) {
            state.programmaticPause = true;
            video.pause();
        }
    };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
            const state = states.get(target);
            state.visible = isIntersecting;
            update(target, state);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('video[data-demo-autoplay]').forEach(video => {
        const state = { visible: false, userPaused: false, programmaticPause: false };
        states.set(video, state);
        video.addEventListener('pause', () => {
            if (state.programmaticPause) state.programmaticPause = false;
            else state.userPaused = true;
        });
        video.addEventListener('play', () => { state.userPaused = false; });
        observer.observe(video);
    });
    document.addEventListener('visibilitychange', () => states.forEach((state, video) => update(video, state)));
    reducedMotion.addEventListener('change', () => states.forEach((state, video) => update(video, state)));
})();
