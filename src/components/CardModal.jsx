import React, { useState } from 'react';
import './CardModal.css';
import { LuRefreshCw } from "react-icons/lu"; // A nice flip icon
import { IoClose } from "react-icons/io5";
import { renderManaSymbols, renderOracleText } from '../utils/manaUtils.jsx';

const WUBRG_ORDER = ["W", "U", "B", "R", "G"];

const sortColors = (colors) => {
    return [...colors].sort((a, b) => WUBRG_ORDER.indexOf(a) - WUBRG_ORDER.indexOf(b));
};

const getMTGSwirl = (colors) => {
    const colorMap = {
        "W": "#f8f6d8", "U": "#86c3f2", "B": "#4b3d3d", // Lighter black for the swirl
        "R": "#ed8186", "G": "#96be7d",
    };

    // 1. Fallback for colorless
    if (!colors || colors.length === 0) {
        return { "--color-1": "#444", "--color-2": "#222", "--color-3": "#333", "--color-4": "#111", "--color-5": "#000" };
    }

    const sorted = sortColors(colors);
    const hexColors = sorted.map(c => colorMap[c]);

    // 2. Logic for 1 color: Create 3 different brightness levels
    if (hexColors.length === 1) {
        return {
            "--color-1": hexColors[0],
            "--color-2": "#1a1a1a", // Deep background
            "--color-3": hexColors[0] + "88", // Semi-transparent version
            "--color-4": "#000",
            "--color-5": hexColors[0] + "44", // Very faint version
        };
    }

    // 3. Logic for multi-color: Map up to 5 colors, repeating if necessary
    return {
        "--color-1": hexColors[0] || "#1a1a1a",
        "--color-2": hexColors[1] || hexColors[0],
        "--color-3": hexColors[2] || "#1a1a1a",
        "--color-4": hexColors[3] || hexColors[0],
        "--color-5": hexColors[4] || hexColors[1],
    };
};

export const CardModal = ({ card, onClose }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    if (!card) return null;

    // Safety check for colors (standard cards use .colors, DFCs use .colors on the faces)
    const cardColors = card.colors || card.card_faces?.[0]?.colors || [];
    const swirlyVariables = getMTGSwirl(cardColors);

    const isDoubleFaced = card.card_faces && card.card_faces[0].image_uris;
    const frontImg = isDoubleFaced ? card.card_faces[0].image_uris.normal : card.image_uris?.normal;
    const backImg = isDoubleFaced ? card.card_faces[1].image_uris.normal : null;

    const displayFace = (isFlipped && isDoubleFaced) ? card.card_faces[1] : (isDoubleFaced ? card.card_faces[0] : card);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
                style={swirlyVariables} // <--- Dynamic Gradient Applied Here
            >
                <button className="close-btn" onClick={onClose}><IoClose /></button>

                <div className="modal-body">
                    {/* Image Section */}
                    <div className="modal-image-container">
                        <div className={`modal-scene ${isFlipped ? 'is-flipped' : ''}`}>
                            <div className="modal-flipper">
                                <img src={frontImg} className="modal-card-face front" alt="back" />
                                {isDoubleFaced && <img src={backImg} className="modal-card-face back" alt="front" />}
                            </div>
                        </div>
                        {isDoubleFaced && (
                            <button className="flip-button" onClick={() => setIsFlipped(!isFlipped)}><LuRefreshCw /></button>
                            )}   
                    </div>
                    {/* Details Section */}
                    <div className="modal-info">
                       <h2>{displayFace.name}</h2>
                       <h3>{renderManaSymbols(displayFace.mana_cost)}</h3>
                       <h3>{displayFace.type_line}</h3>
                       <h3>Set: {card.set_name}</h3>

                       <div className="card-text-box">
                        <p>{renderOracleText(displayFace.oracle_text)}</p>
                       </div>
                    </div>
                </div>
            </div>
        </div>  
    );
};