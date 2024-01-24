import Result from 'components/result/Result';

export default function ResultPage() {
  return (
    <div className={`
      result-page 
      lg:flex 
      flex-1 
      lg:flex-row 
      flex-col
      lg:gap-x-8 
      lg:space-y-0
      space-y-5
      h-content 
      min-w-500px 
      pt-10 
      pb-10 
      px-10 
      overflow-auto
    `}>
      <Result />
    </div>
  );
}
