import { useEffect, useState, createElement } from 'react';
import { useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setLanguage, setCode } from 'reducers/codeSlice';

import Left from 'components/result/Left';
import Right from 'components/result/Right';

export default function Result() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setLanguage(location.state.fileType));
    dispatch(setCode(location.state.fileContent));
  }, [location.pathname]);
  
  return (
    <>
      <Left />
      <Right />
    </>
  );
}