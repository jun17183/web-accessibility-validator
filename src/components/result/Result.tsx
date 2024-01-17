import { useEffect, useState, createElement } from 'react';
import { useLocation } from 'react-router-dom';

import { setLanguage, setCode } from 'redux/codeSlice';

import Left from 'components/result/Left';
import Right from 'components/result/Right';

export default function Result() {
  const location = useLocation();

  useEffect(() => {
    setLanguage(location.state.fileType);
    setCode(location.state.fileContent);
  }, [location.pathname]);
  
  return (
    <>
      <Left />
      <Right />
    </>
  );
}