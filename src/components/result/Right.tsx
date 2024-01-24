import { useSelector } from 'react-redux'
import { RootState } from 'reducers/store';

import Box from 'components/result/Box';
import BoxTitle from 'components/result/BoxTitle';
import CodeBlock from './CodeBlock';
import Highlighter from 'highlighter/Highlighter';

export default function Right() {
  const selectedCode = useSelector((state: RootState) => state.codeReducer.selectedCode);
  const description = useSelector((state: RootState) => state.codeReducer.description);
  const hasProblem = useSelector((state: RootState) => state.codeReducer.hasProblem);

  return (
    <Box>
      <>
        {
          selectedCode ? (
            <>
              <BoxTitle>Suggestion</BoxTitle>
              <CodeBlock><Highlighter parsedCode={selectedCode} /></CodeBlock>
              <div className='p-1'></div>
              <BoxTitle>Description</BoxTitle>
              <div className='code-block h-full my-2 p-8 bg-vscode-bg text-lg overflow-auto rounded-md'>
                {
                  description.map((item, i) => <div key={i} className='discription'>{`- ${item}`}</div>)
                }
              </div>
            </>
          ) : (
            <>
              <BoxTitle>Suggestion</BoxTitle>
              <div className='flex items-center justify-center h-full my-2 bg-vscode-bg text-2xl text-center rounded-md'>
                {
                  hasProblem ? (
                    <span className='text-white'>Please <span className='font-bold text-sky-400'>click on a highligted code</span><br/>to see how it can be improved.</span>
                  ) : (
                    <span className='text-white'>I have nothing to suggest.</span>
                  )
                }
              </div>
            </>
          )
        }
      </>
    </Box>
  );
}