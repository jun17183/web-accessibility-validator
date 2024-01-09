import Box from './Box';
import BoxTitle from './BoxTitle';
import CustomSyntaxHighlighter from './CustomSyntaxHighlighter';

interface RightProps {
  suggestion?: string;
  language: 'html' | 'css';
  description?: string;
}

export default function Right({ suggestion, language, description }: RightProps) {
  return (
    <Box>
      <>
        {
          suggestion ? (
            <>
              <BoxTitle>Suggestion</BoxTitle>
              <CustomSyntaxHighlighter language={language} code={suggestion} />
              <BoxTitle>Description</BoxTitle>
              <div className='flex items-center justify-center h-full my-2 bg-one-light text-2xl text-center rounded-md'>
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