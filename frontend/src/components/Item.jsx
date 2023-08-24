import React from "react";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

function Item({ item, index }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="item-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <span>{item.name}</span>
          <span>{item.price}</span>
        </div>
      )}
    </Draggable>
  );
}

export default Item;

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
