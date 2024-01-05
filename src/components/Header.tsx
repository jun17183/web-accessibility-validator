import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='fixed top-0 w-full bg-gray-800 text-white flex items-center justify-between px-6 py-4'>
      <div>
        <a href='#'>
          <span className='font-bold'>Web Accessibility Validator</span>
        </a>
      </div>
      <nav className='flex gap-4'>
        <Link to='/' className='font-semibold hover:underline'>
          Home
        </Link>
        <a href='https://github.com/jun17183/web-accessibility-validator' className='font-semibold hover:underline'>
          About
        </a>
      </nav>
    </header>
  );
}