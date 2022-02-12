import { useState, useEffect } from 'react';
import {
  checkStrLength,
  checkStrNum,
  checkStrSym,
  checkStrUpper,
} from '../util/validation/validatePassword';

const useValidatePassword = (passwordInput) => {
  const [validators, setValidators] = useState({
    isLong: false,
    hasNumber: false,
    hasSymbol: false,
    hasUpper: false,
  });

  useEffect(() => {
    setValidators({
      isLong: checkStrLength(passwordInput),
      hasNumber: checkStrNum(passwordInput),
      hasSymbol: checkStrSym(passwordInput),
      hasUpper: checkStrUpper(passwordInput),
    });
  }, [passwordInput]);

  return validators;
};

export default useValidatePassword;
