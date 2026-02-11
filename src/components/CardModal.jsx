import React, { useState } from 'react';
import './CardModal.css';
import { LuRefreshCw } from "react-icons/lu"; // A nice flip icon
import { IoClose } from "react-icons/io5";
import { renderManaSymbols, renderOracleText } from '../utils/manaUtils.jsx';



export const CardModal = ({ card, onClose }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const isDoubleFaced = card.card_faces && card.card_faces[0].image_uris;

    const frontImg = isDoubleFaced ? card.card_faces[0].image_uris.normal : card.image_uris?.normal;
    const backImg = isDoubleFaced ? card.card_faces[1].image_uris.normal : null;

    const displayFace = (isFlipped && isDoubleFaced) ? card.card_faces[1] : (isDoubleFaced ? card.card_faces[0] : card);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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