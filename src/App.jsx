import { useEffect, useRef } from 'react';
import artwork from './artwork.html?raw';
import './fluid-layout.css';
import { fluidSection } from '../scripts/fluid-values.mjs';
import './styles.css';
import section0 from './sections/contact-navigation.html?raw';
import section1 from './sections/introduction.html?raw';
import section2 from './sections/beeline-introduction.html?raw';
import section3 from './sections/beeline-home-screen.html?raw';
import section4 from './sections/beeline-roaming.html?raw';
import section5 from './sections/beeline-gaming-portal.html?raw';
import section6 from './sections/beeline-board-game.html?raw';
import section7 from './sections/beeline-finance.html?raw';
import section8 from './sections/beeline-family.html?raw';
import section9 from './sections/beeline-achievements.html?raw';
import section10 from './sections/beeline-referral.html?raw';
import section11 from './sections/beeline-feedback.html?raw';
import section12 from './sections/beeline-workshop.html?raw';
import section13 from './sections/beeline-showreel.html?raw';
import section14 from './sections/beeline-impact.html?raw';
import section15 from './sections/constructly-introduction.html?raw';
import section16 from './sections/constructly-demo.html?raw';
import section17 from './sections/constructly-orders.html?raw';
import section18 from './sections/constructly-timeline.html?raw';
import section19 from './sections/constructly-impact.html?raw';
import section20 from './sections/tele2-introduction.html?raw';
import section21 from './sections/tele2-demo.html?raw';
import section22 from './sections/tele2-research.html?raw';
import section23 from './sections/tele2-screens.html?raw';
import section24 from './sections/tele2-impact.html?raw';
import section25 from './sections/footer.html?raw';

const sections = [section0,section1,section2,section3,section4,section5,section6,section7,section8,section9,section10,section11,section12,section13,section14,section15,section16,section17,section18,section19,section20,section21,section22,section23,section24,section25].map(fluidSection);

export default function App() {
  const content = useRef(null);
  useEffect(() => {
    const videos = [...content.current.querySelectorAll('video')];
    const observer = new IntersectionObserver(entries => {
      for (const {target, isIntersecting} of entries) {
        target.muted = true;
        if (isIntersecting) target.play().catch(() => {});
        else target.pause();
      }
    }, {rootMargin: '150px 0px', threshold: 0.01});
    videos.forEach(video => observer.observe(video));
    return () => { observer.disconnect(); videos.forEach(video => video.pause()); };
  }, []);
  return <>
    <main ref={content} className="framer-2LKcP framer-Jq33B framer-72rtr7" style={{minHeight:'100vh',width:'auto'}}>
      {sections.map((html,index) => <div className="section-mount" key={index} dangerouslySetInnerHTML={{__html:html}} />)}
    </main>
    <div className="portfolio-artwork" dangerouslySetInnerHTML={{__html:artwork}} />
    <section className="coming-soon" aria-label="Portfolio coming soon">
      <p>It’s in progress. Coming soon…</p>
    </section>
  </>;
}
