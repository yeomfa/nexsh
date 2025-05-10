import { useContext } from 'react';
import { Operation } from './Operation';
import SessionContext from '../context/SessionContext';

export function OperationsList({ lastInputRef, executeCommand, isLoading }) {
  const { operations } = useContext(SessionContext);

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
            isLoading={isLoading}
          />
        );
      })}
    </ul>
  );
}
