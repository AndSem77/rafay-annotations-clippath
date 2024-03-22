import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ChakraProvider } from '@chakra-ui/react';
import { BarrierProvider } from './context/BarrierContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BarrierProvider>
    <DndProvider backend={HTML5Backend}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </DndProvider>
  </BarrierProvider>
);
