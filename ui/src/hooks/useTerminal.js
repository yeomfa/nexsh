import { useRef, useState, createRef, useEffect } from 'react';
import generateUniqueId from '../utils/generateUniqueId';

export const useTerminal = () => {
  const lastInputRef = useRef(null);
  const mainRef = useRef(null);
  const [cleanSpaceHeight, setCleanSpaceHeight] = useState('100%');
  const [operations, setOperations] = useState([
    {
      id: generateUniqueId(),
      ref: createRef(null),
      type: 'input',
      text: '',
    },
  ]);

  // Update clean space height
  const updateCleanSpaceHeight = () => {
    const occupiedSpace = operations.reduce((height, operation) => {
      if (operation.text === 'clear') return 0;

      const operationHeight = operation.ref.current.offsetHeight;

      return height + operationHeight;
    }, 0);

    setCleanSpaceHeight(`calc(100% - ${occupiedSpace}px)`);
  };

  // Focus input
  const focusInput = () => {
    lastInputRef.current?.focus();
  };

  // Scroll bottom
  const scrollToBottom = () => {
    const mainEl = mainRef.current;
    mainEl.scrollTop = mainRef.current.scrollHeight;
  };

  // Commands
  const clearTerminal = (args) => {
    const lastOperationRef = createRef(null);

    setOperations([
      ...operations,
      {
        id: generateUniqueId(),
        ref: lastOperationRef,
        type: 'input',
        text: '',
      },
    ]);

    requestAnimationFrame(() => {
      const height = lastOperationRef.current.offsetHeight;
      setCleanSpaceHeight(`calc(100% - ${height}px)`);

      requestAnimationFrame(() => scrollToBottom());
    });
  };

  // Execute command
  const handleInputCommand = (targetId, commandLine) => {
    // Save commandLine
    const newOperations = operations.map((operation) => {
      if (operation.id !== targetId) return operation;

      operation.text = commandLine;

      return operation;
    });

    const [command, ...args] = commandLine
      .split(' ')
      .map((text) => text.trim());

    switch (command) {
      case 'clear':
        clearTerminal();
        break;

      default:
        setOperations([
          ...newOperations,
          {
            id: generateUniqueId(),
            ref: createRef(null),
            type: 'output',
            status: 'error',
            text: `${command}: Command not found!`,
          },
          {
            id: generateUniqueId(),
            ref: createRef(null),
            type: 'input',
            text: '',
          },
        ]);
        break;
    }
  };

  // Init term
  useEffect(() => {
    updateCleanSpaceHeight();
    scrollToBottom();
    focusInput();
  }, [operations]);

  return [
    operations,
    mainRef,
    lastInputRef,
    focusInput,
    scrollToBottom,
    clearTerminal,
    handleInputCommand,
    cleanSpaceHeight,
    updateCleanSpaceHeight,
  ];
};
