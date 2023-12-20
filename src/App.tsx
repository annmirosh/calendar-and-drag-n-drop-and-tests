import React from 'react';
import { Routes, Route } from "react-router-dom";
import DndContainer from './dnd/DndContainer';
import CalendarContainer from './calendar/CalendarContainer';
import { Layout } from './Layout';
import { NoMatch } from './NoMatch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CalendarContainer />} />
        <Route path="dnd" element={<DndContainer />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
