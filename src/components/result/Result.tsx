import Left from './Left';
import Right from './Right';

export default function Result() {
  return (
    <div className='flex h-full flex-row items-center justify-center gap-x-10 w-screen min-w-500px'>
      <Left />
      <Right />
    </div>
  );
}