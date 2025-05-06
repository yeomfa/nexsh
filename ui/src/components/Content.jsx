import '../styles/Content.css';
import { OperationsList } from './';
import { useTerminal } from '../hooks';

const handlers = {
  greet: {
    desciption: 'Greeting from nexsh',
    handler() {
      return {
        text: 'Welcome to nexsh!',
        status: 'success',
      };
    },
  },
  log: {
    description: 'Use console.log() from nexsh',
    handler(args) {
      console.log(args.join(' '));

      return {
        text: 'Done!',
      };
    },
  },
  alert: {
    description: 'Show alert in the current window',
    handler() {
      window.alert('This is a alert');
      return {
        text: 'Done!',
      };
    },
  },
  async: {
    description: 'Testing async method with promise',
    async handler() {
      return Promise.resolve().then(() => {
        for (let index = 0; index < 10000000000; index++) {}

        return {
          text: 'async function tested!',
          status: 'success',
        };
      });
    },
  },
};

export function Content() {
  const {
    operations,
    mainRef,
    lastInputRef,
    focusInput,
    handleInputCommand,
    cleanSpaceHeight,
  } = useTerminal(handlers);

  return (
    <main ref={mainRef} className="main" onClick={focusInput}>
      <OperationsList
        operations={operations}
        lastInputRef={lastInputRef}
        executeCommand={handleInputCommand}
      />
      <div className="clean-space" style={{ height: cleanSpaceHeight }}></div>
    </main>
  );
}
