import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./component/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  //카드와 턴수 스테이트 만들기
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState([0]);

  const [choiceOne, setChoiceOne] = useState(null); //처음 선택 카드
  const [choiceTwo, setChoiceTwo] = useState(null); //두번째 선택 카드
  const [disabled, setDisabled] = useState(false); //선택할수없을때 true

  //카드섞기
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0); //턴수 0
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  //카드 선택 기억
  function handleChoice(card) {
    //첫번째 선택이 있으면 두번째에 넣고 없으면 첫번째에 입력
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  //선택들을 비교하기(useEffect)
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true); //다른 선택을 할수없도록
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        //같은 이미지의 카드들만 matched를 true로 업데이트함
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log("틀렸네요.");
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  //맞추거나 틀렸을때 선택들을 모두 초기화 (턴수는 증가)
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false); //이제 선택가능
  };

  //처음 시작시 설정
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>턴수: {turns}</p>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            handleChoice={handleChoice}
            key={card.id}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
