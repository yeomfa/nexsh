import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NexshApp from './NexshApp';

import './main.css';

// Get root
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <NexshApp />
  </StrictMode>,
);
