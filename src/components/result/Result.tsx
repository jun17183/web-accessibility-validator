import { useEffect, useState, createElement } from 'react';
import { useLocation } from 'react-router-dom';

import { Language } from 'utils/types';
import Left from 'components/result/Left';
import Right from 'components/result/Right';

export default function Result() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<Language>('html');
  const [selectedCode, setSelectedCode] = useState('');

  const location = useLocation();

  useEffect(() => {
    setLanguage(location.state.fileType);
    setCode(location.state.fileContent);
  }, [location.pathname]);
  
  return (
    <>
      <Left language={language} code={code} />
      <Right language={language} description='add alt option.' />
    </>
  );
}