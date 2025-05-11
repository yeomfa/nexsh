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
  const [currDatabase, setCurrDatabase] = useState({});
  const [pathName, setPathName] = useState('/dbs');
  const [operations, setOperations] = useState([]);

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

  // Update path name
  const updatePathName = (newPathName) => {
    setPathName(newPathName);
  };

  // Update enviroment name
  const updateEnvName = (newEnvName) => {
    setEnvName(newEnvName);
  };

  // Update operations
  const updateOperations = (newOperations) => {
    setOperations(newOperations);
  };

  // Update currDatabase
  const updateCurrDatabase = (newDatabase) => {
    setCurrDatabase(newDatabase);
  };

  useEffect(() => {
    storeSession();
  }, [userName, envName]);

  return (
    <SessionContext.Provider
      value={{
        userName,
        updateUserName,
        pathName,
        updatePathName,
        envName,
        updateEnvName,
        operations,
        updateOperations,
        currDatabase,
        updateCurrDatabase,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
