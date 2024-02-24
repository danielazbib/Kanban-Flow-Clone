import React from 'react';
import Card from './Card';
import Dropdown from './Dropdown';
import { useDrop } from 'react-dnd';

const List = ({ list, cards, onCardDrop, onCreateCard, onDeleteColumn }) => {
  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => onCardDrop(item.cardId, list.id),
  });

  return (
    <div ref={drop} className="list">
      <h3>{list.title}</h3>
      <Dropdown>
          <button onClick={() => onDeleteColumn(list.id)}>Delete Column</button>
        </Dropdown>
      {cards.map((card) => (
        <Card key={card.id} card={card} onCreateCard={onCreateCard} />
      ))}
      <button onClick={() => onCreateCard(list.id)}>Add New Card</button>
    </div>
  );
};

export default List;

