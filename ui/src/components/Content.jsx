import '../styles/Content.css';
import { OperationsList } from './';
import { useTerminal } from '../hooks';
import { useState } from 'react';
import handlers from '../handlers';

export function Content() {
  const {
    operations,
    mainRef,
    lastInputRef,
    focusInput,
    handleInputCommand,
    cleanSpaceHeight,
  } = useTerminal(handlers);

  return (
    <main ref={mainRef} className="main" onClick={focusInput}>
      <OperationsList
        operations={operations}
        lastInputRef={lastInputRef}
        executeCommand={handleInputCommand}
      />
      <div className="clean-space" style={{ height: cleanSpaceHeight }}></div>
    </main>
  );
}
