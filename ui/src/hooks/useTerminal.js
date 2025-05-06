import { useRef, useState, createRef, useEffect } from 'react';
import generateUniqueId from '../utils/generateUniqueId';

export const useTerminal = () => {
  const lastOperationRef = useRef(null);
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
  const clearTerminal = () => {
    addOperation('empty');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToBottom());
    });
  };

  // Add operation
  const addOperation = (type = 'output', operation = {}) => {
    if (type === 'empty')
      return setOperations([
        ...operations,
        {
          id: generateUniqueId(),
          ref: createRef(null),
          type: 'input',
          text: '',
        },
      ]);

    setOperations([
      ...operations,
      {
        id: generateUniqueId(),
        ref: createRef(null),
        type,
        ...operation,
      },
      {
        id: generateUniqueId(),
        ref: createRef(null),
        type: 'input',
        text: '',
      },
    ]);
  };

  // Execute command
  const handleInputCommand = (targetId, commandLine) => {
    // Update text to target
    operations.forEach((operation) => {
      if (operation.id !== targetId) return;

      operation.text = commandLine;
    });

    const [command, ...args] = commandLine
      .split(' ')
      .map((text) => text.trim());

    // Validate command
    /*     if (!['clear', 'neofetch'].includes(command))
      return addOperation(); */

    let resultOperation = {};

    switch (command) {
      case 'clear':
        clearTerminal();
        return;

      case 'neofetch':
        resultOperation = {
          status: 'success',
          text: 'Yeah, the command exists!',
        };
        break;

      default:
        resultOperation = {
          status: 'error',
          text: `${command}: Command not found!`,
        };
        break;
    }

    addOperation('output', resultOperation);
  };

  // Init term
  useEffect(() => {
    updateCleanSpaceHeight();
    focusInput();
    // scrollToBottom();
    console.log(operations);
  }, [operations]);

  return {
    operations,
    mainRef,
    lastInputRef,
    focusInput,
    // scrollToBottom,
    clearTerminal,
    handleInputCommand,
    cleanSpaceHeight,
    updateCleanSpaceHeight,
  };
};
