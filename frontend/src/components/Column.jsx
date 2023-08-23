import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import Item from "./Item";

import {
  addColumnPerson,
  updateColumn,
  updateColumnKey,
} from "../../Actions/receipt";
import { display } from "../../Actions/modal";
import { Modals } from "../../Enums/Modals";

const Container = styled.div`
  margin: 8px;
  border-radius: 13px;
  background-color: #f2effc;
  padding: 25px 15px;
  position: relative;
  min-width: 250px;
  max-width: 250px;
`;
const InnerContainer = styled.div`
  margin: 0px 5px;
`;
const ItemList = styled.div`
  min-height: 100%;
`;

const Span = styled.span`
  position: absolute;
  top: 0px;
  right: 10px;
  transition: font-size 0.2s ease;
  -webkit-transition: font-size 0.2s ease;
  -moz-transition: font-size 0.2s ease;
  -o-transition: font-size 0.2s ease;
  &:hover {
    font-size: 17px;
  }
`;

const Column = ({ column, items }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.receipt);

  const {
    columnsData,
    people,
    receiptData: { taxPercent },
  } = data;

  const round = (value) => Math.round(value * 100) / 100;

  const total = useMemo(() => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    return round(total);
  }, [items]);

  const tax = useMemo(() => {
    return round(total * (taxPercent / 100));
  }, [total, taxPercent]);

  const subTotal = useMemo(() => tax + total, [tax, total]);

  const handleDeleteColumn = () => {
    const columnsCopy = { ...columnsData.columns };
    const columnOrderCopy = [...columnsData.columnOrder];
    delete columnsCopy[column.id];

    const newColumnsData = {
      ...columnsData,
      columns: columnsCopy,
      columnOrder: columnOrderCopy.filter((x) => x !== column.id),
    };
    dispatch(updateColumn(newColumnsData));
  };
  const handleCreatePeople = (inputValue) => {
    dispatch(addColumnPerson(inputValue, column.id));
    dispatch(display(Modals.AddPersonModal, true));
  };
  return (
    <Container>
      <Span onClick={handleDeleteColumn}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </Span>

      <CreatableSelect
        onChange={(newValue) =>
          dispatch(updateColumnKey(column.id, "splitBetween", newValue))
        }
        onCreateOption={handleCreatePeople}
        options={people}
        value={column.splitBetween}
        placeholder="Split Between"
        isMulti
      />
      <Droppable droppableId={column.id}>
        {(provided) => (
          <ItemList ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Item key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
            <InnerContainer>{`Tax(${taxPercent} %): $${tax}`}</InnerContainer>
            <InnerContainer>{`Sub Total: $${subTotal}`}</InnerContainer>
          </ItemList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    splitBetween: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
