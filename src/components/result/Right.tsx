import { useSelector } from 'react-redux'
import { RootState } from 'reducers/store';

import Box from 'components/result/Box';
import BoxTitle from 'components/result/BoxTitle';
import CodeBlock from './CodeBlock';

export default function Right() {
  const selectedCode = useSelector((state: RootState) => state.codeReducer.selectedCode);
  const description = useSelector((state: RootState) => state.codeReducer.description);

  return (
    <Box>
      <>
        {
          selectedCode ? (
            <>
              <BoxTitle>Suggestion</BoxTitle>
              <CodeBlock><>{selectedCode}</></CodeBlock>
              <div className='p-1'></div>
              <BoxTitle>Description</BoxTitle>
              <div className='code-block h-full my-2 p-8 bg-vscode-bg text-lg overflow-auto rounded-md'>
                <span className='text-white'>{description}</span>
              </div>
            </>
          ) : (
            <>
              <BoxTitle>Suggestion</BoxTitle>
              <div className='flex items-center justify-center h-full my-2 bg-vscode-bg text-2xl text-center rounded-md'>
                <span className='text-white'>Please <span className='font-bold text-sky-400'>click on a code</span> to see <br/> how it can be improved.</span>
              </div>
            </>
          )
        }
      </>
    </Box>
  );
}