import { Language } from 'utils/types';
import Box from 'components/result/Box';
import BoxTitle from 'components/result/BoxTitle';
import CodeBlock from './CodeBlock';

interface RightProps {
  suggestion?: string;
  language: Language;
  description?: string;
}

export default function Right({ suggestion = 'dd', language, description }: RightProps) {
  return (
    <Box>
      <>
        {
          suggestion ? (
            <>
              <BoxTitle>Suggestion</BoxTitle>
              <CodeBlock><>{suggestion}</></CodeBlock>
              <BoxTitle>Description</BoxTitle>
              <div className='code-block h-full my-2 p-8 bg-one-light text-lg overflow-auto rounded-md'>
                <span>{description}</span>
              </div>
            </>
          ) : (
            <>
              <BoxTitle>Suggestion</BoxTitle>
              <div className='flex items-center justify-center h-full my-2 bg-one-light text-2xl text-center rounded-md'>
                <span>Please <span className='font-bold text-red-500'>click on a code</span> to see <br/> how it can be improved.</span>
              </div>
            </>
          )
        }
      </>
    </Box>
  );
}