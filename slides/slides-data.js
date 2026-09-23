/* ==========================================================================
   DATA HEIST — Slide Content
   Each entry describes one slide: background image, layout variant, and
   the HTML markup rendered inside the slide's content region.
   ========================================================================== */

const SLIDES = [
  {
    id: "intro",
    image: "assets/slide1.jpg",
    variant: "intro",
    html: `
      <p class="eyebrow">Cybersecurity Event</p>
      <h1 class="headline headline--xl">ABHIGYAN&rsquo;26<span class="headline-break">DATA HEIST</span></h1>
      <p class="subtitle">SRM IST Vadapalani, Chennai &nbsp;&middot;&nbsp; 24 September 2026</p>
      <div class="team-row">
        <span class="team-chip">Sofie</span>
        <span class="team-chip">Jo</span>
        <span class="team-chip">Muthisha</span>
      </div>
    `
  },
  {
    id: "sofie",
    image: "assets/slide2.jpg",
    variant: "glass",
    html: `
      <p class="card-tag">Agent 01</p>
      <h2 class="name-heading">Sofie</h2>
      <div class="glass-card">
        <p>Before I start&hellip; I honestly feel bad for your teammates 😅</p>
        <p>I know you&rsquo;re highly talented, but you keep asking doubts and questions non&#8209;stop&hellip; so this time, go a little easy on them 😂</p>
        <p class="divider-line"></p>
        <p>Fun apart &mdash; Sofie, you&rsquo;re seriously talented.<br>This is your moment to shine.</p>
        <p>I already know you&rsquo;re going to do something amazing&hellip;<br>so I can proudly say, <span class="quote-highlight">&ldquo;my best friend won 1st place.&rdquo;</span> 😎🔥</p>
      </div>
    `
  },
  {
    id: "jo",
    image: "assets/slide3.jpg",
    variant: "energetic",
    html: `
      <p class="card-tag card-tag--blue">Agent 02</p>
      <h2 class="name-heading name-heading--tilt">Jo</h2>
      <div class="energetic-lines">
        <p class="energetic-lead">The most hyper&#8209;active person in the team 😄⚡</p>
        <p>But that&rsquo;s your strength.<br>You bring energy, ideas, and confidence.</p>
        <p class="energetic-cta">Guide your team, keep them focused,<br>and push for <span class="quote-highlight quote-highlight--blue">Top 3 🏆</span></p>
      </div>
    `
  },
  {
    id: "muthisha",
    image: "assets/slide4.jpg",
    variant: "calm",
    html: `
      <p class="card-tag">Agent 03</p>
      <h2 class="name-heading">Muthisha</h2>
      <div class="glass-card glass-card--calm">
        <p>Handling two hyper&#8209;active teammates is not easy 😅</p>
        <p class="divider-line"></p>
        <p>But you are the balance of the team.<br>Stay calm, lead smart, and control the chaos.</p>
        <p class="calm-footnote">And don&rsquo;t miss the bus 😂🚌</p>
      </div>
    `
  },
  {
    id: "final",
    image: "assets/slide5.jpg",
    variant: "final",
    html: `
      <p class="eyebrow eyebrow--final">Mission Briefing Complete</p>
      <h1 class="headline headline--final">ALL THE BEST<span class="headline-break">TEAM 🔥</span></h1>
      <p class="final-subtext">&ldquo;Crack the clues. Win the game.&rdquo;</p>
    `
  }
];
