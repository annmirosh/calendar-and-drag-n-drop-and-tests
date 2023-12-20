import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { useDrop } from 'react-dnd'
import { Item } from './Item'
import { IDateItem } from './model'

const style: CSSProperties = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginLeft: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

export interface ColumnProps {
    label: string
    accept: string[]
    items: IDateItem[]
    onDrop: (item: IDateItem) => void
}

export const Column: FC<ColumnProps> = memo(function Column({
    label,
    accept,
    items,
    onDrop,
}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const isActive = isOver && canDrop
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }

    return (
        <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
            {label}
            <br />
            <br />

            {items.map(item => {
                return <Item key={item.id} {...item}></Item>;
            })}
        </div>
    )
})
