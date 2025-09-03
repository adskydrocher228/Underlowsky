import MiniGameCard from '../components/MiniGameCard';

const minigames = [
  {
    id: 1,
    title: 'Pixel Clicker',
    desc: 'Қарапайым пиксель ойын: басып, ұпай жина!',
    image: '/projects_pixel_gif/mini-game-id-1-intro.gif',
    route: '/minigames/1'
  },
  {
    id: 2,
    title: 'Pixel Flappy',
    desc: 'Пиксель аркадасы: кедергілерден ұшып өтіп, ұпай жина!',
    image: '/projects_pixel_gif/mini-game-id-2-intro.gif',
    route: '/minigames/2'
  },
  {
    id: 3,
    title: 'Pixel 2048',
    desc: '2048 классикалық басқатырғышы пиксель стилінде!',
    image: '/projects_pixel_gif/mini-game-id-3-intro.gif',
    route: '/minigames/3'
  },
  {
    id: 4,
    title: 'Pixel Batyr Runner',
    desc: 'Батыр атпен жаулардан секіріп өтеді — қазақ раннері!',
    image: '/projects_pixel_gif/mini-game-id-4-intro.gif',
    route: '/minigames/4'
  },
  {
    id: 5,
    title: 'Pixel Qazaq Quiz',
    desc: 'Қазақ тарихы мен мәдениеті бойынша викторина!',
    image: '/projects_pixel_gif/mini-game-id-5-intro.gif',
    route: '/minigames/5'
  },
];

const MiniGames = () => (
  <main id="minigames" className="section container">
    <div className="section-header">
      <h2 className="gradient-text">mini-ойындар</h2>
      <p className="muted">Пиксельдік ойын-сауық — бас, ойна, демал!</p>
    </div>
    <div className="cards-grid">
      {minigames.map(game => <MiniGameCard key={game.id} {...game} />)}
    </div>
  </main>
);

export default MiniGames;
