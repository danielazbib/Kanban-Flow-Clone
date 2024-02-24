import React, { useState } from 'react';
import List from './List';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';

//test change
const Board = () => {
  const [lists, setLists] = useState([
    { id: uuidv4(), title: 'Todo', cards: [] },
    { id: uuidv4(), title: 'In Progress', cards: [] },
    { id: uuidv4(), title: 'Done', cards: [] },
  ]);

  const handleCardDrop = (cardId, targetListId) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];

      // Find the source list and card
      const sourceList = updatedLists.find((list) =>
        list.cards.find((card) => card.id === cardId)
      );
      const sourceCard = sourceList.cards.find((card) => card.id === cardId);

      // Remove the card from the source list
      sourceList.cards = sourceList.cards.filter((card) => card.id !== cardId);

      // Find the target list
      const targetList = updatedLists.find((list) => list.id === targetListId);

      // Add the card to the target list
      targetList.cards.push(sourceCard);

      return updatedLists;
    });
  };
  const handleCreateCard = (listId) => {
    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [
              ...list.cards,
              {
                id: uuidv4(),
                content: 'New Card',
                listId,
              },
            ],
          };
        }
        return list;
      });

      return updatedLists;
    });
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {lists.map((list) => (
          <List
            key={list.id}
            list={list}
            cards={list.cards}
            onCardDrop={handleCardDrop} 
            onCreateCard={handleCreateCard}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Board;
