import { useState } from 'react';
import './NexshApp.css';
import { Content, WindowBar } from './components';

function NexshApp() {
  const [windowStatus, setWindowStatus] = useState('normal');

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
      />
      {/* Content */}
      <Content />
    </div>
  );
}

export default NexshApp;
