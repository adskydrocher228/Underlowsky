import './MiniGameCard.css';
import { useNavigate } from 'react-router-dom';

const MiniGameCard = ({ id, title, desc, image, route }) => {
  const navigate = useNavigate();
  return (
    <article className="minigame-card fade-in" tabIndex={0}>
      {image && (
        <div className="mg-media">
          <img src={image} alt={title + ' preview'} loading="lazy" />
        </div>
      )}
      <div className="mg-head">
        <h3>{title}</h3>
      </div>
      <p className="mg-desc">{desc}</p>
      <button className="mg-btn play" onClick={() => navigate(route)}>
        Играть
      </button>
    </article>
  );
};

export default MiniGameCard;
