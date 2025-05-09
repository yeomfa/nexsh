import { useRef, useState, createRef, useEffect, useContext } from 'react';
import generateUniqueId from '../helpers/generateUniqueId';
import SessionContext from '../context/SessionContext';

export const useTerminal = (handlers = {}) => {
  const { updateUserName, updateEnvName, operations, updateOperations } =
    useContext(SessionContext);

  const defaultHandlers = {
    clear: {
      description: 'Clear terminal',
      handler() {
        addOperation();

        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToBottom());
        });
      },
    },
    help: {
      description: 'Show all commands with description',
      handler() {
        const allCommandsMarkup = Object.entries(allHandlers)
          .map(
            ([key, command]) =>
              `
                <div class>
                  <span class="text semibold">${key}</span>
                  <span class="handler-description text lightgray">${
                    command.description ?? ''
                  }</span><br>
                </div>
              `
          )
          .join('');

        return {
          status: 'success',
          type: 'output',
          text: `~ Available commands ~ <br><br> ${allCommandsMarkup}`,
        };
      },
    },
    history: {
      description: 'List history',
      handler() {
        return {
          text: operations
            .filter((operation) => operation.type === 'input')
            .map((operation) => operation.text)
            .join('<br>'),
        };
      },
    },
    set: {
      description: 'Allow yout to change environment variable names',
      handler(args) {
        const names = ['username', 'envname'];
        const [nameToChange, newName] = args;

        if (!names.includes(nameToChange.toLowerCase()) || !newName)
          return addOperation({
            status: 'error',
            text: `Syntax error, try: set < userName, envName> <newNameValue>`,
          });

        if (nameToChange.toLowerCase() === 'username') updateUserName(newName);
        if (nameToChange.toLowerCase() === 'envname') updateEnvName(newName);

        return {
          status: 'success',
          text: `${nameToChange} updated!`,
        };
      },
    },
  };
  const allHandlers = { ...defaultHandlers, ...handlers };
  const allCommands = [...Object.keys(allHandlers)];

  const lastInputRef = useRef(null);
  const mainRef = useRef(null);
  const [cleanSpaceHeight, setCleanSpaceHeight] = useState('100%');

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

    updateOperations([...operations, ...newOperations]);
  };

  // Execute command
  const handleInputCommand = async (targetId, commandLine) => {
    // Update text to target
    operations.forEach((operation) => {
      if (operation.id !== targetId) return;

      operation.text = commandLine;
    });

    // Parse command line
    const [command, ...args] = commandLine
      .split(' ')
      .map((text) => text.trim());

    // Validate command
    if (!allCommands.includes(command)) {
      return addOperation({
        type: 'output',
        status: 'error',
        text: `${command}: Command not found!`,
      });
    }

    // Handle commands
    try {
      const cmd = allHandlers[command];
      const resultOperation = await cmd.handler(args);

      addOperation(resultOperation);
    } catch (e) {
      addOperation({ text: `Execution failed: ${e.message}`, status: 'error' });
      throw new Error(e.message);
    }
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
    handleInputCommand,
    cleanSpaceHeight,
    updateCleanSpaceHeight,
  };
};
