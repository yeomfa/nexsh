import '../styles/Content.css';
import { OperationsList } from './';

export function Content({ terminal }) {
  return (
    <main ref={terminal.mainRef} className="main" onClick={terminal.focusInput}>
      <OperationsList
        lastInputRef={terminal.lastInputRef}
        executeCommand={terminal.handleInputCommand}
        isLoading={terminal.isLoading}
      />
      <div
        className="clean-space"
        style={{ height: terminal.cleanSpaceHeight }}
      ></div>
    </main>
  );
}
