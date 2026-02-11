import React, { useState } from 'react';
import { LuRefreshCw } from "react-icons/lu"; // A nice flip icon
import './CardGrid.css';

const Card = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isDoubleFaced = card.card_faces && card.card_faces[0].image_uris;

  // Determine which image to show
  const frontImage = isDoubleFaced 
    ? card.card_faces[0].image_uris.normal 
    : card.image_uris?.normal;
    
  const backImage = isDoubleFaced 
    ? card.card_faces[1].image_uris.normal 
    : null;

return (
    <div className="card-container">
      {/* The scene provides the 3D perspective */}
      <div className={`card-scene ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-flipper">
          
          {/* Front Face */}
          <div className="card-face card-front">
            <img src={frontImage} alt={card.name} className="card-image" />
          </div>

          {/* Back Face */}
          {isDoubleFaced && (
            <div className="card-face card-back">
              <img src={backImage} alt={`${card.name} back`} className="card-image" />
            </div>
          )}
          
        </div>
      </div>
      
      {isDoubleFaced && (
        <button 
          className="flip-button" 
          onClick={(e) => {
            e.stopPropagation(); // <--- THIS stops the Modal from opening when flipping
            setIsFlipped(!isFlipped);
          }}
        >
          <LuRefreshCw />
        </button>
      )}
    </div>
  );
};

export const CardGrid = ({ cards, setSelectedCard }) => {
  // 1. Filter the incoming 'cards' prop
  const mainCards = cards.filter(card => 
      !['token', 'emblem', 'art_series'].includes(card.layout)
  );
    
  const extraCards = cards.filter(card => 
      ['token', 'emblem', 'art_series'].includes(card.layout)
  );

  return (
    <div className="card-grid-wrapper">
      {/* SECTION 1: MAIN CARDS */}
      <div className="card-grid">
        {mainCards.map((card) => (
          <div key={card.id} onClick={() => setSelectedCard(card)}> 
              <Card card={card} />
          </div>
        ))}
      </div>

      {/* SECTION 2: EXTRAS (Only renders if extras exist) */}
      {extraCards.length > 0 && (
        <div className="extras-container">
          <div className="extras-divider">
            <span>Tokens & Extras</span>
          </div>
          <div className="card-grid extras-grid">
            {extraCards.map((card) => (
              <div key={card.id} onClick={() => setSelectedCard(card)}> 
                  <Card card={card} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};