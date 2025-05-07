import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NexshApp from './NexshApp';

import './main.css';
import SessionProvider from './context/SessionProvider';

// Get root
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <SessionProvider>
      <NexshApp />
    </SessionProvider>
  </StrictMode>
);
