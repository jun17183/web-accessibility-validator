import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setLanguage, setCode } from 'reducers/codeSlice';

import Left from 'components/result/Left';
import Right from 'components/result/Right';

export default function Result() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.state)

    if (!location.state || !location.state.fileType || location.state.fileContent) {
      alert(`Can't find a file`);
      navigate('/');
    } else {
      dispatch(setLanguage(location.state.fileType));
      dispatch(setCode(location.state.fileContent));
    }
  }, [location.pathname]);
  
  return (
    <>
      <Left />
      <Right />
    </>
  );
}