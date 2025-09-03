import React from "react";
import "./About.css";

const About = () => (
  <main id="about" className="section container">
    <div className="section-header">
      <h2 className="gradient-text">Мен туралы</h2>
      {/* <p className="muted">Қысқаша ақпарат</p> */}
    </div>
    <section className="about-me container" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'clamp(60px,10vw,120px) 0 60px',minHeight:'70vh',position:'relative',overflow:'hidden'}}>
      {/* Пиксельный анимированный фон */}
      <div style={{position:'absolute',inset:0,zIndex:0,pointerEvents:'none',background:'repeating-linear-gradient(45deg,#e9dcc4 0 12px,#f5f1e6 12px 24px), url(/assets/pixel-art.png) repeat',opacity:0.13}} />
      <div className="about-photo" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginBottom:'2.2rem',zIndex:1}}>
        <img src="/projects_pixel_gif/about/me-pixel-avatar.png" alt="Pixel Avatar" style={{width:'640px',height:'640px',borderRadius:'64px',boxShadow:'0 24px 96px #2d8fa344',background:'#fffbe8',objectFit:'cover',border:'16px solid #2d8fa3',marginBottom:'1.2rem'}} />
      </div>
      <div className="about-info" style={{maxWidth:'680px',width:'100%',background:'#fffbe8',borderRadius:'16px',boxShadow:'0 4px 24px #2d8fa344',padding:'1.1rem 1.1rem 0.7rem 1.1rem',fontSize:'0.85rem',lineHeight:'1.7',fontWeight:'400',textAlign:'left',zIndex:1}}>
        <p style={{marginBottom:'1.1em',textIndent:'1.5em'}}>Ассалаумағалейкум, ізгі ниетті жан! Атым – Ислам. Ізденіс жолын таңдадым, ғылым мен өнерді тоғыстырып, адамзатқа пайдасы тиер іс жасауды мұрат еттім. <b>«Білім – нұр, өнер – өрнек, екеуі қосылса – кемелдік».</b></p>
        <p style={{marginBottom:'1.1em',textIndent:'1.5em'}}>💻 Ісім – веб-өнер, сөзім – код. React, Next.js, TailwindCSS – менің құралым. Әрбір ісімде тазалық пен әсемдікке ұмтыламын. <b>«Ісіңді таза қылсаң – абыройың артар, ойыңды таза қылсаң – ақылың артар».</b> Код – ойдың айнасы, дизайн – жанның сәні. Ұсақ іссіз ұлы іс тумас, әр түйін – кемелдіктің кілті. <b>«Ұсақты елемеген – ұлылыққа жетпес».</b></p>
        <p style={{marginBottom:'1.1em',textIndent:'1.5em'}}>🎙️ Тек сонымен шектелмеймін. Сөзге жан бітіріп, үнге өң беремін. Фильм мен анимацияға дауыс қосамын. <b>«Сөз – жүректің тілі, үн – жанның үні».</b> Дыбыстау – көңілдің кілті, сезімнің тілі. Әр үн – өнердің өрнегі, әр сөз – жүректің үні.</p>
        <p style={{textIndent:'1.5em'}}>Ұстанымым – тоқырау емес, толассыз даму. Жаңа білім іздеп, жаңа жолға ұмтыламын. <b>«Ізденген жетер, тоқтаған қалар».</b> Ісім тек пайда әкеліп қоймай, жүрекке шабыт сыйласа – мақсатым орындалды. <b>«Адам еңбегі – оның рухының айнасы, ізгілік – сол айнадағы сәуле».</b></p>
        {/* Блок навыков */}
        <div className="skills-block" style={{marginTop:'2.2rem',marginBottom:'0.7rem',textAlign:'center'}}>
          <h3 style={{fontSize:'1.08rem',marginBottom:'1.1rem',color:'#2d8fa3',fontFamily:'Press Start 2P, monospace'}}>Сайтты жасау үшін қолданылған технологиялар</h3>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'1.2rem'}}>
            <span className="pixel-skill" style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'0.3rem'}}>
              {/* React pixel icon */}
              <svg className="pixel-anim" width="38" height="38" viewBox="0 0 38 38"><rect width="38" height="38" fill="#222"/><rect x="7" y="7" width="24" height="24" fill="#61dafb"/><rect x="13" y="13" width="12" height="12" fill="#222"/></svg>
              React
            </span>
            <span className="pixel-skill" style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'0.3rem'}}>
              {/* Vite pixel icon */}
              <svg className="pixel-anim" width="38" height="38" viewBox="0 0 38 38"><rect width="38" height="38" fill="#fffbe8"/><rect x="7" y="7" width="24" height="24" fill="#ffde57"/><rect x="13" y="13" width="12" height="12" fill="#2d8fa3"/></svg>
              Vite
            </span>
            <span className="pixel-skill" style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'0.3rem'}}>
              {/* Next.js pixel icon */}
              <svg className="pixel-anim" width="38" height="38" viewBox="0 0 38 38"><rect width="38" height="38" fill="#fff"/><rect x="7" y="7" width="24" height="24" fill="#222"/><rect x="13" y="13" width="12" height="12" fill="#fff"/></svg>
              Next.js
            </span>
            <span className="pixel-skill" style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'0.3rem'}}>
              {/* Tailwind pixel icon */}
              <svg className="pixel-anim" width="38" height="38" viewBox="0 0 38 38"><rect width="38" height="38" fill="#e9dcc4"/><rect x="7" y="7" width="24" height="24" fill="#38bdf8"/><rect x="13" y="13" width="12" height="12" fill="#fffbe8"/></svg>
              TailwindCSS
            </span>
            <span className="pixel-skill" style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'0.3rem'}}>
              {/* Node.js pixel icon */}
              <svg className="pixel-anim" width="38" height="38" viewBox="0 0 38 38"><rect width="38" height="38" fill="#222"/><rect x="7" y="7" width="24" height="24" fill="#8cc84b"/><rect x="13" y="13" width="12" height="12" fill="#222"/></svg>
              Node.js
            </span>
            <span className="pixel-skill" style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'0.3rem'}}>
              {/* Express pixel icon */}
              <svg className="pixel-anim" width="38" height="38" viewBox="0 0 38 38"><rect width="38" height="38" fill="#fffbe8"/><rect x="7" y="7" width="24" height="24" fill="#222"/><rect x="13" y="13" width="12" height="12" fill="#fffbe8"/></svg>
              Express
            </span>
            <span className="pixel-skill" style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'0.3rem'}}>
              {/* MongoDB pixel icon */}
              <svg className="pixel-anim" width="38" height="38" viewBox="0 0 38 38"><rect width="38" height="38" fill="#e9dcc4"/><rect x="7" y="7" width="24" height="24" fill="#13aa52"/><rect x="13" y="13" width="12" height="12" fill="#fffbe8"/></svg>
              MongoDB
            </span>
            <span className="pixel-skill" style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'0.3rem'}}>
              {/* Socket.io pixel icon */}
              <svg className="pixel-anim" width="38" height="38" viewBox="0 0 38 38"><rect width="38" height="38" fill="#fffbe8"/><rect x="7" y="7" width="24" height="24" fill="#222"/><rect x="13" y="13" width="12" height="12" fill="#fffbe8"/></svg>
              Socket.io
            </span>
            <span className="pixel-skill" style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'0.3rem'}}>
              {/* TypeScript pixel icon */}
              <svg className="pixel-anim" width="38" height="38" viewBox="0 0 38 38"><rect width="38" height="38" fill="#e9dcc4"/><rect x="7" y="7" width="24" height="24" fill="#3178c6"/><rect x="13" y="13" width="12" height="12" fill="#fffbe8"/></svg>
              TypeScript
            </span>
            <span className="pixel-skill" style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'0.3rem'}}>
              {/* Redux pixel icon */}
              <svg className="pixel-anim" width="38" height="38" viewBox="0 0 38 38"><rect width="38" height="38" fill="#fffbe8"/><rect x="7" y="7" width="24" height="24" fill="#764abc"/><rect x="13" y="13" width="12" height="12" fill="#fffbe8"/></svg>
              Redux
            </span>
            <span className="pixel-skill" style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'0.3rem'}}>
              {/* CSS/SCSS pixel icon */}
              <svg className="pixel-anim" width="38" height="38" viewBox="0 0 38 38"><rect width="38" height="38" fill="#e9dcc4"/><rect x="7" y="7" width="24" height="24" fill="#2965f1"/><rect x="13" y="13" width="12" height="12" fill="#fffbe8"/></svg>
              SCSS/CSS
            </span>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default About;

