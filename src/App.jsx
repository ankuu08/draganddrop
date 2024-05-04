import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const ColorItem = ({ color }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'color',
    item: { type: 'color', color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: color,
        width: '150px',
        height: '150px',
        margin: '5px',
        cursor: 'move',
      }}
    ></div>
  );
};
const DropBody = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'color',
    drop: (item, monitor) => {
      document.body.style.backgroundColor = item.color;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      className='hello'
      ref={drop}
      style={{
        marginTop:'200px',
        marginLeft:'300px',
        width: '30%',
        height: '50vh',
        border: '2px dashed #000',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: canDrop ? '#00ff00' : '#000',
        backgroundColor: isOver ? '#f0f0f0' : '#fff',
      }}
    >
      Drop Here to Change Body Color
    </div>
  );
};
const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '400px', padding: '20px' }}>
          <ColorItem color="red" />
          <ColorItem color="green" />
          <ColorItem color="blue" />
          <ColorItem color="pink" />
          <ColorItem color="brown" />
          <ColorItem color="black" />
        </div>
        <DropBody />
      </div>
    </DndProvider>
  );
};

export default App;
