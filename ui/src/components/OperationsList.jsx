import { Operation } from './Operation';

export function OperationsList({ operations, lastInputRef, executeCommand }) {
  return (
    <ul>
      {operations.map((operation, index) => {
        const isLastOperation = index === operations.length - 1;

        return (
          <Operation
            key={operation.id}
            isLastOperation={isLastOperation}
            lastInputRef={lastInputRef}
            executeCommand={executeCommand}
            operation={operation}
          />
        );
      })}
    </ul>
  );
}
