import { useState } from 'react';

export default function useGlobalProvider() {
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  return {
    openModalSuccess,
    setOpenModalSuccess,
    successMessage,
    setSuccessMessage
  };
}
