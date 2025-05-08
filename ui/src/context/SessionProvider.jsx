import { createRef, useEffect, useState } from 'react';
import SessionContext from './SessionContext';
import generateUniqueId from '../helpers/generateUniqueId';

const sessionInfo = JSON.parse(localStorage.getItem('session-info')) || {
  userName: 'nexsh',
  envName: 'local',
};

function SessionProvider({ children }) {
  const [userName, setUserName] = useState(sessionInfo.userName);
  const [envName, setEnvName] = useState(sessionInfo.envName);
  const [scopeName, setScopeName] = useState('');
  const [operations, setOperations] = useState([
    {
      id: generateUniqueId(),
      ref: createRef(null),
      type: 'input',
      text: '',
    },
  ]);

  // Store session
  const storeSession = () => {
    localStorage.setItem(
      'session-info',
      JSON.stringify({
        userName,
        envName,
      }),
    );
  };

  // Update user name
  const updateUserName = (newUserName) => {
    setUserName(newUserName);
  };

  // Update session name
  const updateScopeName = (newScopeName) => {
    setScopeName(newScopeName);
  };

  // Update enviroment name
  const updateEnvName = (newEnvName) => {
    setEnvName(newEnvName);
  };

  // Update operations
  const updateOperations = (newOperations) => {
    setOperations(newOperations);
  };

  useEffect(() => {
    storeSession();
  }, [operations, userName, envName]);

  return (
    <SessionContext.Provider
      value={{
        userName,
        updateUserName,
        scopeName,
        updateScopeName,
        envName,
        updateEnvName,
        operations,
        updateOperations,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
