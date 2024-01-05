import Guideline from '../components/main/Guideline';
import Title from '../components/main/Title';
import Uploader from '../components/main/Uploader';

export default function MainPage() {
  return (
    <div className='h-screen min-w-500px pt-10 pb-10 px-10 flex flex-col gap-y-8 items-center justify-center'>
      <Title />
      <Uploader />
      <Guideline />
    </div>
  );
}