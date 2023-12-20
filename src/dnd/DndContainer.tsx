import React from 'react';
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import { Column } from './Column';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { IColumn, IDateItem } from './model';

export const ItemTypes = {
  TODO: 'todo',
  INPROGRESS: 'in-progress',
  COMPLETED: 'completed',
  DELETED: 'deleted',
}

const columnIndexMap = {
  [ItemTypes.TODO]: 0,
  [ItemTypes.INPROGRESS]: 1,
  [ItemTypes.COMPLETED]: 2,
  [ItemTypes.DELETED]: 3,
}



export const DndContainer: FC = memo(function Container() {
  const [columns, setColumns] = useState<IColumn[]>([
    {
      label: 'ToDo',
      accepts: [],
      items: [
        { id: '1', date: new Date(2023, 11, 12), type: ItemTypes.TODO },
        { id: '2', date: new Date(2023, 11, 14), type: ItemTypes.TODO },
        { id: '3', date: new Date(2023, 11, 15), type: ItemTypes.TODO },
      ],
      itemType: ItemTypes.TODO
    },
    { label: 'In progress', accepts: [ItemTypes.TODO, ItemTypes.COMPLETED, ItemTypes.DELETED], items: [], itemType: ItemTypes.INPROGRESS },
    { label: 'Completed', accepts: [ItemTypes.INPROGRESS], items: [], itemType: ItemTypes.COMPLETED },
    { label: 'Deleted', accepts: [ItemTypes.INPROGRESS, ItemTypes.COMPLETED,], items: [], itemType: ItemTypes.DELETED },
  ])


  const handleDrop = useCallback((colToIndex: number, item: IDateItem) => {
    setColumns(prevColumns => {
      const colFromIndex = columnIndexMap[item.type];
      const newItem = { ...item, type: prevColumns[colToIndex].itemType };
      const newColumns = [...prevColumns];
      newColumns[colFromIndex].items = prevColumns[colFromIndex].items.filter(curItem => curItem.id !== newItem.id);
      newColumns[colToIndex].items = [...prevColumns[colToIndex].items, newItem].sort(function (a, b) {
        const dateA = +a.date;
        const dateB = +b.date;

        return dateA - dateB;
      });

      return newColumns;
    })
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {columns.map(({ label, accepts, items }, index) => (
            <Column
              key={label}
              label={label}
              accept={accepts}
              items={items}
              onDrop={(item) => handleDrop(index, item)}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  )
})


export default DndContainer;
