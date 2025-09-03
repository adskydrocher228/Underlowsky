
import './PhilosophySection.css';
import { useNavigate } from 'react-router-dom';

const PhilosophySection = () => {
  const navigate = useNavigate();
  return (
    <section className="philosophy section" id="philosophy">
      <div className="container philosophy-inner fade-in">
        <blockquote className="abaquote">«Үш-ақ нәрсе адамның қасиеті: Ыстық қайрат, Нұрлы ақыл, Жылы жүрек»<br/>— <span>Абай Құнанбайұлы</span></blockquote>
        <p className="intro">Көк аспанның астында — адам мен әлем, ой мен жүрек үндесетін кеңістік.<br/>Бұл сайт — тек кодтар мен пиксельдер емес, бұл — мағына іздеген жанның тынысы.</p>
        <p>Абай атамыз айтқандай, адам баласы ақылмен, ғылыммен, армен, мінезбен озады. Сол жолда мен — веб-әзірлеуші ретінде — әрбір интерфейсті адамға жақын, жүрекке жылы етіп жасауды мақсат тұтамын.</p>
        <p className="line secret-link" onClick={() => navigate('/history')} style={{cursor:'pointer',textDecoration:'underline dotted'}}>«Ақырын жүріп, анық бас, еңбегің кетпес далаға» — бұл менің ұстанымым.</p>
        <ul className="principles">
          <li><span>Қарапайымдылық</span> — тереңдікке жол.</li>
          <li><span>Өнімділік</span> — уақытпен үндесу.</li>
          <li><span>Қолжетімділік</span> — адамға құрмет.</li>
        </ul>
        <p>Біз бәріміз — бір аспанның астындамыз. Ал осы аспан астында менің миссиям — рухани тереңдік пен технологияны ұштастырып, адамға қызмет ететін цифрлық әлем құру.</p>
      </div>
    </section>
  );
};

export default PhilosophySection;