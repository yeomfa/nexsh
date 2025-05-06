import { useRef, useState, createRef, useEffect } from 'react';
import generateUniqueId from '../utils/generateUniqueId';

export const useTerminal = (handlers = {}) => {
  const commands = Object.keys(handlers);
  const defaultCommands = ['clear', 'help', 'history'];
  const allCommands = [...defaultCommands, ...commands];

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
    addOperation();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToBottom());
    });
  };

  // Add operation
  const addOperation = (operation = undefined) => {
    // Default type: 'Output'
    const type = operation?.type === 'input' ? 'input' : 'output';
    const newOperations = [];

    // New operation
    if (operation)
      newOperations.push({
        id: generateUniqueId(),
        ref: createRef(null),
        ...operation,
        type,
      });

    // New input operation
    newOperations.push({
      id: generateUniqueId(),
      ref: createRef(null),
      type: 'input',
      text: '',
    });

    setOperations([...operations, ...newOperations]);
  };

  // Execute command
  const handleInputCommand = async (targetId, commandLine) => {
    // Update text to target
    operations.forEach((operation) => {
      if (operation.id !== targetId) return;

      operation.text = commandLine;
    });

    const [command, ...args] = commandLine
      .split(' ')
      .map((text) => text.trim());

    let resultOperation = {};

    // Validate command
    if (!allCommands.includes(command)) {
      return addOperation({
        type: 'output',
        status: 'error',
        text: `${command}: Command not found!`,
      });
    }

    // Clear terminal
    if (command === 'clear') return clearTerminal();
    if (command === 'help')
      return addOperation({
        type: 'output',
        text: `Available commands: ${allCommands.join(', ')}`,
      });
    if (command === 'history')
      return addOperation({
        type: 'output',
        text: operations
          .filter((operation) => operation.type === 'input')
          .map((operation) => operation.text)
          .join(', '),
      });

    // Handle commands
    resultOperation = await handlers[command](args);

    addOperation(resultOperation);
  };

  // Init term
  useEffect(() => {
    updateCleanSpaceHeight();
    focusInput();
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
