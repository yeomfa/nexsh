import { Square2StackIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Logo, Option, Options } from './';

import '../styles/WindowBar.css';

export function WindowBar({ toggleDimensions, closeWindow }) {
  return (
    <header className="window-bar">
      <div className="container">
        <Logo />

        <Options>
          <Option handler={toggleDimensions}>
            <Square2StackIcon />
          </Option>

          <Option handler={closeWindow}>
            <XMarkIcon />
          </Option>
        </Options>
      </div>
    </header>
  );
}
