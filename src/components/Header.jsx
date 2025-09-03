
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";
import pixelLogo from '../assets/pixel-art.png';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = () => setOpen(o => !o);
  const close = () => setOpen(false);
  const navClass = ({ isActive }) => (isActive ? "active" : undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // THEME + ORNAMENT STATE
  const [theme, setTheme] = useState(() => localStorage.getItem('site-theme') || 'day');
  const [ornament, setOrnament] = useState(() => localStorage.getItem('ornament-pattern') || 'none');

  useEffect(() => {
    const root = document.documentElement; // for CSS var overrides
    if (theme === 'night') {
      root.setAttribute('data-theme','night');
      document.body.classList.add('night-bg');
    } else {
      root.removeAttribute('data-theme');
      document.body.classList.remove('night-bg');
    }
    localStorage.setItem('site-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.remove('ornament-a','ornament-b');
    if (ornament === 'a') document.body.classList.add('ornament-a');
    if (ornament === 'b') document.body.classList.add('ornament-b');
    localStorage.setItem('ornament-pattern', ornament);
  }, [ornament]);

  const toggleTheme = () => setTheme(t => t === 'day' ? 'night' : 'day');
  const cyclePattern = () => setOrnament(p => p === 'none' ? 'a' : p === 'a' ? 'b' : 'none');

  return (
    <header className={"site-header" + (scrolled ? " scrolled" : "") }>
      <div className="nav-bar container">
        <Link to="/" className="brand" onClick={close}>
          <span className="pixel-mark">✦</span> Көк аспан
        </Link>
        <button className={"nav-toggle" + (open ? " open" : "")} aria-label="Мәзір" aria-expanded={open} onClick={toggle}>
          <span />
          <span />
          <span />
        </button>
        <nav className={open ? "nav-links open" : "nav-links"}>
          <ul>
            <li><NavLink className={navClass} onClick={close} to="/projects">Жобалар</NavLink></li>
            <li><NavLink className={navClass} onClick={close} to="/minigames">mini-ойындар</NavLink></li>
            <li style={{position:'absolute',left:'-9999px',width:'1px',height:'1px',overflow:'hidden'}}><NavLink to="/history">Тайная история</NavLink></li>
            <li><NavLink className={navClass} onClick={close} to="/about">Мен туралы</NavLink></li>
            <li><NavLink className={navClass} onClick={close} to="/contact">Байланыс</NavLink></li>
            <li><button className="lang" type="button">KZ</button></li>
            <li><button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Тақырыпты ауыстыру">{theme === 'day' ? '🌙' : '☀️'}</button></li>
            <li><button type="button" className="pattern-toggle" onClick={cyclePattern} aria-label="Ою өрнек ауыстыру">{ornament === 'none' ? '◻️' : ornament === 'a' ? '🧿' : '✳️'}</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;