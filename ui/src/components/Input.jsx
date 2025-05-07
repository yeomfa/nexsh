import { ChevronRightIcon } from '@heroicons/react/24/outline';
import '../styles/Input.css';
import { useContext, useEffect, useState } from 'react';
import SessionContext from '../context/SessionContext';

export function Input({ id, text, isLastOperation, inputRef, executeCommand }) {
  const { userName, scopeName, envName } = useContext(SessionContext);
  const [value, setValue] = useState(text);

  const updateInputValue = (e) => {
    const key = e.target.value;

    setValue(key);
  };

  const sendCommand = (e) => {
    const key = e.key;

    if (key !== 'Enter') return;

    if (value !== '') executeCommand(id, value);
  };

  useEffect(() => {
    setValue(text);
  }, [text]);

  return (
    <div className="input">
      <span className="username">
        {userName}@{envName}{' '}
        <span className="session-name">
          {scopeName ? `(${scopeName})` : ''}
        </span>
      </span>

      <div className="input-field">
        <span className="arrow">
          <ChevronRightIcon />
        </span>

        <input
          ref={inputRef}
          value={value}
          onChange={updateInputValue}
          readOnly={!isLastOperation}
          onKeyDown={sendCommand}
        />
      </div>
    </div>
  );
}
