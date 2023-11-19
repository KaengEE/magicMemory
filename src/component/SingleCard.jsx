import "./SingleCard.css";
import React from "react";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  function handleClick() {
    if (disabled === false) {
      handleChoice(card);
    }
  }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front"></img>
        <img
          onClick={handleClick}
          className="back"
          src="/img/cover.png"
          alt="card back"
        ></img>
      </div>
    </div>
  );
};
export default SingleCard;
