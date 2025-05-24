import { FiTrash, FiThumbsUp } from "react-icons/fi";
import '../styles/Card.css'; 

const Card = ({ card }) => {
  return (
    <div className="card-tile">
      <p>{card.message}</p>
      <img src={card.gifUrl} alt="Card gif" className="card-gif" />
      <div className="card-footer">
        <span>{card.upvotes || 0} Upvotes</span>
        <div className="card-actions">
          <FiThumbsUp />
          <FiTrash />
        </div>
      </div>
    </div>
  );
};

export default Card;
