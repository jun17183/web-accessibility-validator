import Guideline from '../components/main/Guideline';
import Title from '../components/main/Title';
import Uploader from '../components/main/Uploader';

export default function MainPage() {
  return (
    <div className='min-w-500px pt-10 pb-14 px-10 flex-1 flex flex-col gap-y-8 items-center justify-center'>
      <Title />
      <Uploader />
      <Guideline />
    </div>
  );
}