import '../styles/Content.css';
import { OperationsList } from './';
import { useTerminal } from '../hooks';

export function Content() {
  const {
    operations,
    mainRef,
    lastInputRef,
    focusInput,
    handleInputCommand,
    cleanSpaceHeight,
  } = useTerminal();

  return (
    <main ref={mainRef} className="main" onClick={focusInput}>
      <OperationsList
        operations={operations}
        lastInputRef={lastInputRef}
        executeCommand={handleInputCommand}
      />
      <div
        className="clean-space"
        style={{ height: cleanSpaceHeight, backgroundColor: 'red' }}
      ></div>
    </main>
  );
}
