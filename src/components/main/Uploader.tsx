import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Uploader() {
  const [fileNm, setFileNm] = useState('');
  const [fileType, setFileType] = useState('html');
  const [fileContent, setFileContent] = useState('');
  
  const fileInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const uploadFile = () => {
    console.log('upload file')
    fileInput.current?.click();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);

    if (file) {
      if (file.type !== 'text/html' && file.type !== 'text/css') {
        alert('Only one .html or .css file can be uploaded.');
        return;
      }

      const fr = new FileReader();

      fr.onload = (e) => {
        const fileContent = e.target?.result;

        if (typeof fileContent === 'string' && typeof file?.name === 'string') {
          console.log(file.type)
          setFileNm(file.name);
          setFileType(file.type.split("/")[1]);
          setFileContent(fileContent);
        }
      }
      fr.readAsText(file);
    } else {
      // 취소 시에도 해당 alert 노출됨. 수정 필요 : fixme
      alert('File upload failed');
    }
  }

  const testFile = () => {
    if (fileContent) {
      navigate('/result', {
        state: {
          fileType: fileType,
          fileContent: fileContent
        }
      });
    } else {
      alert('Please upload a file');
    }
  }

  return (
    <div className='flex w-full items-center gap-x-4 justify-center'>
      <div className='flex h-20 w-4/12 min-w-96 bg-white rounded-full shadow-md p-4'>
        <input
          type='text'
          className='w-full pl-3 text-xl box-border cursor-pointer outline-none focus:outline-none'
          value={fileNm}
          readOnly
          onClick={uploadFile}
        />
        <input 
          type='file' 
          className='hidden' 
          accept='.html, .css'
          ref={fileInput}
          onChange={handleFileChange}
        />
        <button 
          className='h-full w-32 px-5 py-2 bg-cyan-500 font-semibold text-xl text-white rounded-full shadow-sm shadow-slate-400 box-border'
          onClick={uploadFile}
        >
          Upload
        </button>
      </div>
      <button 
        className='h-14 w-24 min-w-20 px-5 py-2 bg-blue-500 font-semibold text-xl text-white rounded-full shadow-md shadow-slate-400 box-border'
        onClick={testFile}
      >
        Test
      </button>
    </div>
  );
}
