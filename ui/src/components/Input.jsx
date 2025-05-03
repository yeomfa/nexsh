import { ChevronRightIcon } from '@heroicons/react/24/outline';
import '../styles/Input.css';
import { useEffect, useState } from 'react';

export function Input({ id, text, isLastOperation, inputRef, executeCommand }) {
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
      <span className="username">yeomfa</span>

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
