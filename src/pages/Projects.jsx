import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    id: 1,
    title: 'Cinezone',
    desc: 'Бұл сайт фильмдерді көру үшін жасалған (тест). Бұл сайтты жасау барысында көптеген жаңа дүниелер зерттелді. Мен веб-технологиялардың мүмкіндіктерін тереңірек түсініп, фильмдер мен сериалдарды көруге арналған платформаларды қалай құру керектігін меңгердім. Бұл — тек техникалық тәжірибе емес, бұл — шығармашылық пен ізденістің нәтижесі.', 

    stack: ['HTML','CSS','JS'],
    repo: 'https://github.com/adskydrocher228/cinezone',
  demo: 'https://adskydrocher228.github.io/cinezone/',
  image: '/projects_pixel_gif/id 1.gif'
  }
  ,{
  id: 2,
  title: 'WoW fan site',
  desc: 'World of Warcraft — бұл жай ғана ойын емес, бұл — әлем. Фанаттық портал аңызға айналған стратегияға арналған!\n\nЭпикалық шайқастар әлеміне есік ашыңыз:\nтөрт раса, культтік батырлар және билік пен сатқындық туралы таңғажайып хикая.\nЖаңалықтар, жаңартулар және Warcraft III жанкүйерлеріне арналған барлық нәрсе — бір жерде!',
  stack: ['HTML','CSS','JS'],
  repo: 'https://github.com/adskydrocher228/funwawrcraft',
  demo: 'https://adskydrocher228.github.io/funwawrcraft/',
  image: '/projects_pixel_gif/id 2.gif'
  }
];

projects.push({
  id: 3,
  title: 'Project X',
  desc: 'Бұл сайт — өнерге арналған кеңістік.\n«Project X» — мен жасаған алғашқы ірі жобалардың бірі.\nОл шығармашылықты, ой еркіндігін және цифрлық эстетиканы біріктіреді.\nӘрбір пиксель — идеяның көрінісі, әрбір жол — ішкі әлемнің үні.\n\nБұл тек бастамасы. Алда — шексіз аспан, жаңа жобалар, жаңа шабыттар.',
  stack: ['HTML','CSS','JS'],
  repo: 'https://adskydrocher228.github.io/Project-X/',
  demo: 'https://adskydrocher228.github.io/Project-X/',
  image: '/projects_pixel_gif/id 3.gif'
});

const Projects = () => (
  <main id="projects" className="section container">
    <div className="section-header">
      <h2 className="gradient-text">Жобалар</h2>
      <p className="muted">Төменде бірнеше үлгілер. Көбірек жақында қосылады.</p>
    </div>
    <div className="cards-grid">
  {projects.map(p => <ProjectCard key={p.id} {...p} />)}
    </div>
  </main>
);

export default Projects;