import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='top-0 w-full bg-gray-800 text-white flex items-center justify-between px-6 py-4'>
      <div>
        <Link to='/'>
          <span className='font-bold text-xl'>Web Accessibility Validator</span>
        </Link>
      </div>
      <nav className='flex gap-6'>
        <Link to='/' className='font-semibold text-xl'>
          Home
        </Link>
        <a 
          href='https://github.com/jun17183/web-accessibility-validator' 
          className='font-semibold text-xl'
        >
          About
        </a>
      </nav>
    </header>
  );
}