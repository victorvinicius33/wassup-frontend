import { useState } from 'react';

export default function useGlobalProvider() {
  const [userData, setUserData] = useState({});
  const [userContacts, setUserContacts] = useState([]);

  return {
    userData,
    setUserData,
    userContacts,
    setUserContacts
  };
}
