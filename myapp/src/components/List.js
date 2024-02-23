import React from 'react';
import Card from './Card';
import { useDrop } from 'react-dnd';

const List = ({ list, cards, onCardDrop, onCreateCard }) => {
  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => onCardDrop(item.cardId, list.id),
  });

  return (
    <div ref={drop} className="list">
      <h3>{list.title}</h3>
      {cards.map((card) => (
        <Card key={card.id} card={card} onCreateCard={onCreateCard} />
      ))}
      <button onClick={() => onCreateCard(list.id)}>Add New Card</button>
    </div>
  );
};

export default List;

