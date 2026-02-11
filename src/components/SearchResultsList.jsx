import React, { useState } from 'react'; // Add useState
import './SearchResultsList.css';
import { renderManaSymbols } from '../utils/manaUtils.jsx';

export const SearchResultsList = ({ results, setGridResults, setResults, setSelectedCard }) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleSelect = (card) => {
        setSelectedCard(card);
        setGridResults([card]);
        setResults([]);
        setHoveredCard(null); // Clear preview on select
    };

    return (
        <div className="search-results-list-wrapper">
            <div className="search-results-list">
                {results.map((card, id) => (
                    <div 
                        key={id} 
                        className="search-result-item" 
                        onClick={() => handleSelect(card)}
                        onMouseEnter={() => setHoveredCard(card)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="card-name">{card.name}</div>
                        <div className="card-mana-cost">
                            {renderManaSymbols(card.mana_cost)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Hover Preview Card */}
            {hoveredCard && (
                <div className="search-preview-window">
                    <img 
                        src={hoveredCard.card_faces ? hoveredCard.card_faces[0].image_uris.normal : hoveredCard.image_uris?.normal} 
                        alt="preview" 
                    />
                </div>
            )}
        </div>
    );
};