import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ card, onCardDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { cardId: card.id, listId: card.listId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`card ${isDragging ? 'dragging' : ''}`}>
      {card.content}
    </div>
  );
};

export default Card;
