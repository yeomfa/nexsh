import {
  ArrowPathIcon,
  Square2StackIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Logo, Option, Options } from './';

import '../styles/WindowBar.css';

export function WindowBar({ toggleDimensions, closeWindow, isLoading }) {
  return (
    <header className="window-bar">
      <div className="container">
        <div className="logo-loader-cont">
          <Logo />

          {isLoading && (
            <div className="loader">
              <ArrowPathIcon />
            </div>
          )}
        </div>

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
