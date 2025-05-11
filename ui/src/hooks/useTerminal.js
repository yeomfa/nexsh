import {
  useRef,
  useState,
  createRef,
  useEffect,
  useContext,
  useLayoutEffect,
} from 'react';
import generateUniqueId from '../helpers/generateUniqueId';
import SessionContext from '../context/SessionContext';

export const useTerminal = (handlers = {}) => {
  const contextController = useContext(SessionContext);

  const defaultHandlers = {
    // TODO: This should set CleanSpace component height
    clear: {
      description: 'Clear terminal',
      handler() {
        addOperation({
          userName: contextController.userName,
          pathName: contextController.pathName,
          envName: contextController.envName,
          id: generateUniqueId(),
          ref: createRef(null),
          type: 'input',
          text: '',
          isExecuted: false,
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
                  <span class="handler-description text lightgray">${command.description ?? ''
              }</span><br>
                </div>
              `,
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
          text: contextController.operations
            .filter((operation) => operation.type === 'input')
            .map((operation) => operation.text)
            .join('<br>'),
        };
      },
    },
    set: {
      description: 'Allow yout to change environment variable names',
      async handler(args) {
        const names = ['username', 'envname'];
        const [nameToChange, newName] = args;

        if (
          !nameToChange ||
          !names.includes(nameToChange.toLowerCase()) ||
          !newName
        )
          return {
            status: 'error',
            text: `Invalid param, try: set [userName, envName] newNameValue`,
          };

        if (nameToChange.toLowerCase() === 'username') updateUserName(newName);
        if (nameToChange.toLowerCase() === 'envname') updateEnvName(newName);
      },
    },
  };
  const allHandlers = { ...defaultHandlers, ...handlers };
  const allCommands = [...Object.keys(allHandlers)];

  const lastInputRef = useRef(null);
  const mainRef = useRef(null);
  const [cleanSpaceHeight, setCleanSpaceHeight] = useState('100%');
  const [isLoading, setIsLoading] = useState(false);

  // Update clean space height
  const updateCleanSpaceHeight = () => {
    const occupiedSpace = contextController.operations.reduce(
      (height, operation) => {
        if (operation.text === 'clear') return 0;

        const operationHeight = operation.ref.current.offsetHeight;

        return height + operationHeight;
      },
      0,
    );

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
        userName: contextController.userName,
        pathName: contextController.pathName,
        envName: contextController.envName,
        type,
        id: generateUniqueId(),
        ref: createRef(null),
        ...operation,
      });

    contextController.updateOperations([
      ...contextController.operations,
      ...newOperations,
    ]);
  };

  // Execute command
  const handleInputCommand = async (targetId, commandLine) => {
    setIsLoading(true);
    // Update text to target
    contextController.operations.forEach((operation) => {
      if (operation.id !== targetId) return;

      operation.text = commandLine;
      operation.isExecuted = true;
    });

    // Parse command line
    const [command, ...args] = commandLine
      .split(' ')
      .map((text) => text.trim());

    // Validate command
    if (!allCommands.includes(command)) {
      setIsLoading(false);
      return addOperation({
        type: 'output',
        status: 'error',
        text: `${command}: Command not found!`,
      });
    }

    // Handle commands
    try {
      const cmd = allHandlers[command];
      const resultOperation = await cmd.handler(args, contextController);

      addOperation(resultOperation);
    } catch (e) {
      addOperation({ text: `Execution failed: ${e.message}`, status: 'error' });
      throw new Error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Init term
  useLayoutEffect(() => {
    const lastOperation =
      contextController.operations[contextController.operations.length - 1];

    updateCleanSpaceHeight();
    focusInput();
    scrollToBottom();

    if (
      !lastOperation ||
      lastOperation.type !== 'input' ||
      lastOperation.isExecuted
    )
      addOperation({
        userName: contextController.userName,
        pathName: contextController.pathName,
        envName: contextController.envName,
        id: generateUniqueId(),
        ref: createRef(null),
        type: 'input',
        text: '',
        isExecuted: false,
      });

    console.log(contextController.currDatabase);
  }, [contextController.operations]);

  return {
    operations: contextController.operations,
    mainRef,
    lastInputRef,
    focusInput,
    handleInputCommand,
    cleanSpaceHeight,
    updateCleanSpaceHeight,
    isLoading,
  };
};
