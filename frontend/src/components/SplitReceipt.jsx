import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import Column from "./Column";
import CollectMoneyModal from "./modals/CollectMoneyModal";
import { clear, updateColumn } from "../actions/receipt";

const SplitReceipt = () => {
  const dispatch = useDispatch();
  const [showCollectMoney, setShowCollectMoney] = useState(false);
  const data = useSelector((state) => state.receipt);
  const { receiptData, columnsData } = data;

  const handleCreateColumn = () => {
    const id = uuidv4();
    const newColumnsData = {
      ...columnsData,
      columns: {
        ...columnsData.columns,
        [id]: {
          id,
          splitBetween: [],
          itemIds: [],
        },
      },
      columnOrder: [...columnsData.columnOrder, id],
    };
    dispatch(updateColumn(newColumnsData));
  };

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columnsData.columns[source.droppableId];
    const finish = columnsData.columns[destination.droppableId];
    if (start === finish) {
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        itemIds: newItemIds,
      };

      const newColumnsData = {
        ...columnsData,
        columns: {
          ...columnsData.columns,
          [newColumn.id]: newColumn,
        },
      };
      dispatch(updateColumn(newColumnsData));
    } else {
      const startItemIds = Array.from(start.itemIds);
      startItemIds.splice(source.index, 1);
      const newStart = {
        ...start,
        itemIds: startItemIds,
      };

      const finishItemIds = Array.from(finish.itemIds);
      finishItemIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        itemIds: finishItemIds,
      };

      const newColumnsData = {
        ...columnsData,
        columns: {
          ...columnsData.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      dispatch(updateColumn(newColumnsData));
    }
  };
  return (
    <div className="split-container">
      <div className="d-flex m-3">
        <Button variant="secondary" onClick={() => dispatch(clear())}>
          Clear Receipt
        </Button>
        <Button onClick={handleCreateColumn}>Add Column</Button>
        <Button variant="success" onClick={() => setShowCollectMoney(true)}>
          Collect Money
        </Button>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="d-flex m-3">
          {columnsData.columnOrder.map((columnId) => {
            const column = columnsData.columns[columnId];
            const items = [];
            column.itemIds.forEach((itemId) => {
              const item = receiptData.items.find((i) => i.id === itemId);
              items.push(item);
            });
            return <Column key={column.id} column={column} items={items} />;
          })}
        </div>
      </DragDropContext>

      {showCollectMoney && (
        <CollectMoneyModal
          show={showCollectMoney}
          onHide={() => setShowCollectMoney(false)}
        />
      )}
    </div>
  );
};

export default SplitReceipt;
