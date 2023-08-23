import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

const Container = styled.div`
  border-radius: 10px;
  padding: 8px;
  margin: 8px 0px;
  background-color: white;
  display: flex;
  justify-content: space-between;
`;

function Item({ item, index }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <span>{item.name}</span>
          <span>{item.price}</span>
        </Container>
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
