import { useContext, useEffect } from 'react';
import { Operation } from './Operation';
import SessionContext from '../context/SessionContext';

export function OperationsList({ lastInputRef, executeCommand }) {
  const { operations } = useContext(SessionContext);

  useEffect(() => { });
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
