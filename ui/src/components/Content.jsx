import { useEffect, useRef, useState } from 'react';
import '../styles/Content.css';
import { Input, Output } from './';

export function Content() {
  const lastInputRef = useRef(null);
  const mainRef = useRef(null);
  const [operations, setOperations] = useState([
    {
      id: generateId(),
      type: 'input',
      text: '',
    },
  ]);

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  const focusInput = () => {
    lastInputRef.current?.focus();
  };

  const scrollBottom = () => {
    const mainEl = mainRef.current;

    mainEl.scrollTop = mainRef.current.scrollHeight;
  };

  // Commands
  const clear = (args) => {
    setOperations([
      {
        id: generateId(),
        type: 'input',
        text: '',
      },
    ]);
  };

  const executeCommand = (commandLine) => {
    const [command, ...args] = commandLine
      .split(' ')
      .map((text) => text.trim());

    switch (command) {
      case 'clear':
        clear();
        break;

      default:
        setOperations([
          ...operations,
          {
            id: generateId(),
            type: 'output',
            status: 'error',
            text: `${commandLine}: Command not found!`,
          },
          {
            id: generateId(),
            type: 'input',
            text: '',
          },
        ]);
        break;
    }
  };

  useEffect(() => {
    focusInput();
    scrollBottom();
  }, [operations]);

  return (
    <main ref={mainRef} className="main" onClick={focusInput}>
      <ul>
        {operations.map((operation, index) => {
          const isLastOperation = index === operations.length - 1;

          return (
            <li
              className={`operation ${isLastOperation ? 'last' : ''}`}
              key={operation.id}
            >
              {operation.type === 'input' ? (
                <Input
                  {...operation}
                  isLastOperation={isLastOperation}
                  inputRef={isLastOperation ? lastInputRef : null}
                  executeCommand={executeCommand}
                />
              ) : (
                <Output {...operation} />
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
