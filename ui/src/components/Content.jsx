import '../styles/Content.css';
import { OperationsList } from './';
import { useTerminal } from '../hooks';

const handlers = {
  greet() {
    return {
      text: 'Welcome to nexsh!',
      status: 'success',
    };
  },
  greetLog() {
    console.log('Welcome to nexh');
  },
  log(args) {
    console.log(args.join(' '));
  },
  alert() {
    window.alert('This is a alert');
  },
  async async() {
    return Promise.resolve().then(() => {
      for (let index = 0; index < 10000000000; index++) {}

      return {
        text: 'async function tested!',
        status: 'success',
      };
    });
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
