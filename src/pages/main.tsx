import Guideline from 'components/main/Guideline';
import Title from 'components/main/Title';
import Uploader from 'components/main/Uploader';

export default function MainPage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8 items-center justify-center min-w-500px pt-10 pb-14 px-10'>
      <Title />
      <Uploader />
      <Guideline />
    </div>
  );
}
