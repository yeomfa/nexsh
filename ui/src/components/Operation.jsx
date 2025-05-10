import { Input, Output } from './';
import '../styles/Operation.css';

export function Operation({
  isLastOperation,
  lastInputRef,
  executeCommand,
  operation,
  isLoading,
}) {
  return (
    <li
      ref={operation.ref}
      className={`operation ${isLastOperation ? 'last' : ''}`}
    >
      {operation.type === 'input' ? (
        <Input
          {...operation}
          isLastOperation={isLastOperation}
          inputRef={isLastOperation ? lastInputRef : null}
          executeCommand={executeCommand}
          isLoading={isLoading}
        />
      ) : (
        <Output {...operation} />
      )}
    </li>
  );
}
