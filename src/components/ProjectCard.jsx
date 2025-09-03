import "./ProjectCard.css";

const ProjectCard = ({ title, desc, stack = [], repo, demo, image }) => (
  <article className="project-card fade-in" tabIndex={0}>
    {image && (
      <div className="pc-media">
        <img src={image} alt={title + ' preview'} loading="lazy" />
      </div>
    )}
    {!image && (
      <div className="pc-media placeholder" aria-hidden="true">
        <span className="ph-label">IMAGE / GIF LATER</span>
      </div>
    )}
    <div className="pc-head">
      <h3>{title}</h3>
    </div>
    <p className="pc-desc">{desc}</p>
    <div className="pc-tags">
      {stack.map(s => <span key={s}>{s}</span>)}
    </div>
    <div className="pc-links">
      {demo && <a href={demo} target="_blank" rel="noopener noreferrer" className="pc-btn live">LIVE</a>}
      {repo && <a href={repo} target="_blank" rel="noopener noreferrer" className="pc-btn code">CODE</a>}
    </div>
  </article>
);

export default ProjectCard;