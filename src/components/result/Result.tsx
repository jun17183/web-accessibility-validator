import Left from './Left';
import Right from './Right';

export default function Result() {
  return (
    <div className='flex flex-row items-center justify-center gap-x-10 h-screen w-screen min-w-500px'>
      <Left />
      <Right />
    </div>
  );
}