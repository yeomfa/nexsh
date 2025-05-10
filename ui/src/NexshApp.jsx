import { useState } from 'react';
import './NexshApp.css';
import { Content, WindowBar } from './components';
import { useTerminal } from './hooks';
import handlers from './handlers';

function NexshApp() {
  const [windowStatus, setWindowStatus] = useState('normal');
  const terminal = useTerminal(handlers);

  const toggleDimensions = () => {
    setWindowStatus(windowStatus == 'normal' ? 'maximized' : 'normal');
  };

  const closeWindow = () => {
    setWindowStatus('closed');
  };

  return (
    <div className={`window ${windowStatus}`}>
      {/* Window bar */}
      <WindowBar
        toggleDimensions={toggleDimensions}
        closeWindow={closeWindow}
        isLoading={terminal.isLoading}
      />
      {/* Content */}
      <Content terminal={terminal} />
    </div>
  );
}

export default NexshApp;
