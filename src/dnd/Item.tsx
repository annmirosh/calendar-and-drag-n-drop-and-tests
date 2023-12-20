import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { useDrag } from 'react-dnd'

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  color: '#000',
}

export interface ItemProps {
  date: Date
  id: string
  type: string
}

export const Item: FC<ItemProps> = memo(function Item({ date, type, id }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { date, type, id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [id, type],
  )

  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {formatDate(date)}
    </div>
  )
})


function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${month}-${day}-${year}`;

  return formattedDate;
}