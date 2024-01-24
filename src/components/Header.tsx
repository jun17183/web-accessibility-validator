import { Link } from 'react-router-dom';
import { FaGithub, FaInfoCircle } from "react-icons/fa";
import { IoHomeSharp, IoClose } from "react-icons/io5";
import { useState } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const InfoModal = ({ show, onClose }: ModalProps) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className='fixed z-50 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'
    >
      <div className="result-page h-1/2 min-h-96 lg:w-1/3 w-5/6 p-6 bg-white text-black rounded-lg overflow-auto">
        <div className='mb-6 text-2xl font-bold'>
          <span>About this Site</span>
          <button className='float-right' onClick={onClose}><IoClose /></button>
        </div>
        <p>This site is a simple web accessibility inspection site, where you can upload HTML or CSS files and it inspects the web accessibility based on the uploaded code. It doesn't provide a comprehensive web accessibility inspection, but only a few items.</p>
        <p className='my-3'>Here are the inspection items available:</p>
        <h3 className='text-xl font-bold mt-7 mb-3'>HTML</h3>
        <ul className='mb-7'>
          <li>- Check for the presence of the 'lang' attribute in the &lt;html&gt; tag</li>
          <li>- Check for the existence of &lt;meta name="viewport"&gt;</li>
          <li>- Check for the 'alt', 'src' attributes in the &lt;img&gt; tag</li>
          <li>- Check for the 'title' attribute in the &lt;frame&gt;, &lt;iframe&gt; tags</li>
          <li>- Check if 'autoplay' is used in the &lt;video&gt;, &lt;audio&gt; tags</li>
          <li>- Check for the use of the &lt;trac&gt; tag in &lt;video&gt;, &lt;audio&gt; tags</li>
          <li>- Simple XSS attack check</li>
        </ul>
        <h3 className='text-xl font-bold my-3'>CSS</h3>
        <ul>
          <li>- Contrast check for background, border, and text (only one element is inspected)</li>
          <li>- Check for the use of 'px' in 'font-size', 'line-height', 'word-spacing', 'letter-spacing'</li>
        </ul>
      </div>
    </div>
  );
}

export default function Header() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <header className='flex flex-none items-center justify-between top-0 w-full px-6 py-4 bg-vscode-bg text-white'>
      <div>
        <Link to='/'>
          <span className='font-bold text-xl'>Web Accessibility Validator</span>
        </Link>
      </div>
      <nav className='flex gap-6'>
        <Link to='/' className='flex items-center font-semibold text-xl'>
          <IoHomeSharp size={26} />
        </Link>
        <a
          href='https://github.com/jun17183/web-accessibility-validator'
          className='flex items-center font-semibold text-xl'
        >
          <FaGithub size={26} />
        </a>
        <a
          className='flex items-center font-semibold text-xl cursor-pointer'
          onClick={handleOpenModal}
        >
          <FaInfoCircle size={26} />
        </a>
      </nav>
      <InfoModal show={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
}
