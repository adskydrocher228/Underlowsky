import "./HeroSection.css";
import pixelArtImg from "../assets/pixel-art.png";

const HeroSection = () => (
  <section className="hero container" id="home">
    <div className="hero-content fade-in">
      <h1 className="hero-title gradient-text">Көк аспанның астында</h1>
      <p className="lead">Мен Ислам — Қазақстанның шексіз далаларындағы <span className="highlight">веб-әзірлеуші</span>.</p>
      <p className="sub">Қарапайым, өнімді және қол жетімді веб-интерфейстерді құруға назар аударамын.</p>
      <div className="hero-buttons">
        <a href="projects" className="btn primary">Жобаларды қарау</a>
        <a href="contact" className="btn secondary">Байланыс</a>
      </div>
      <div className="meta-row">
        <span>⚡ Жылдамдық</span>
        <span>📦 Қарапайымдық</span>
        <span>🌍 Қолжетімділік</span>
      </div>
    </div>
    <div className="hero-image">
      <div className="image-wrap">
        <img src={pixelArtImg} alt="Pixel Art Yurt" loading="lazy" />
      </div>
    </div>
  </section>
);

export default HeroSection;