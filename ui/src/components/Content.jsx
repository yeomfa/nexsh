import { useEffect, useRef, useState } from 'react';
import '../styles/Content.css';
import { OperationsList } from './';
import { useTerminal } from '../hooks';

export function Content() {
  const [
    operations,
    mainRef,
    lastInputRef,
    focusInput,
    scrollToBottom,
    _,
    executeCommand,
    cleanSpaceHeight,
    updateCleanSpaceHeight,
  ] = useTerminal();

  return (
    <main ref={mainRef} className="main" onClick={focusInput}>
      <OperationsList
        operations={operations}
        lastInputRef={lastInputRef}
        executeCommand={executeCommand}
      />
      <div className="clean-space" style={{ height: cleanSpaceHeight }}></div>
    </main>
  );
}
