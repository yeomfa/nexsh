import { useState } from 'react';
import SessionContext from './SessionContext';

const sessionInfo = JSON.parse(localStorage.getItem('session-info')) || {
  userName: 'nexsh',
  envName: 'local',
};

function SessionProvider({ children }) {
  const [userName, setUserName] = useState(sessionInfo.userName);
  const [envName, setEnvName] = useState(sessionInfo.envName);
  const [scopeName, setScopeName] = useState('');

  // Update user name
  const updateUserName = (newUserName) => {
    setUserName(newUserName);

    localStorage.setItem(
      'session-info',
      JSON.stringify({ ...sessionInfo, userName: newUserName })
    );
  };

  // Update session name
  const updateScopeName = (newScopeName) => {
    setScopeName(newScopeName);
  };

  // Update enviroment name
  const updateEnvName = (newEnvName) => {
    setEnvName(newEnvName);
    localStorage.setItem(
      'session-info',
      JSON.stringify({ ...sessionInfo, envName: newEnvName })
    );
  };

  return (
    <SessionContext.Provider
      value={{
        userName,
        updateUserName,
        scopeName,
        updateScopeName,
        envName,
        updateEnvName,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
