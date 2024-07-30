import { useState } from 'react';
import { FaGithub, FaInfoCircle } from "react-icons/fa";
import { IoClose, IoHomeSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetState } from 'reducers/codeSlice';

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
      <div className="result-page h-3/5 min-h-96 lg:w-1/3 w-5/6 p-6 bg-white text-black rounded-lg overflow-auto">
        <div className='mb-6 text-2xl font-bold'>
          <span>About this Site</span>
          <button className='float-right' onClick={onClose}><IoClose /></button>
        </div>
        <p>This site is a simple web accessibility inspection site, where you can upload <strong>a HTML or CSS file</strong> and it inspects the web accessibility based on the uploaded code. It doesn't provide a comprehensive web accessibility inspection, but only a few items.</p>
        <p className='my-3'>Here are the inspection items available:</p>
        <h3 className='text-xl font-bold mt-7 mb-3'>HTML</h3>
        <ul className='mb-7 ul'>
          <li>- Check for the presence of the <strong>'lang'</strong> attribute in the <strong>&lt;html&gt;</strong> tag</li>
          <li>- Check for the existence of <strong>&lt;meta name="viewport"&gt;</strong></li>
          <li>- Check for the <strong>'alt', 'src'</strong> attributes in the <strong>&lt;img&gt;</strong> tag</li>
          <li>- Check for the <strong>'title'</strong> attribute in the <strong>&lt;frame&gt;, &lt;iframe&gt;</strong> tags</li>
          <li>- Check if <strong>'autoplay'</strong> is used in the <strong>&lt;video&gt;, &lt;audio&gt;</strong> tags</li>
          <li>- Check for the use of the <strong>&lt;track&gt;</strong> tag in <strong>&lt;video&gt;, &lt;audio&gt;</strong> tags</li>
          <li>- Simple <strong>XSS</strong> attack check</li>
        </ul>
        <h3 className='text-xl font-bold my-3'>CSS</h3>
        <ul className='ul'>
          <li>- Contrast check for <strong>background, border, and text</strong> (only one element is inspected)</li>
          <li>- Check for the use of <strong>'px'</strong> in <strong>'font-size', 'line-height', 'word-spacing', 'letter-spacing'</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default function Header() {
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const homeClickEvent = () => dispatch(resetState());

  return (
    <header className='flex flex-none items-center justify-between top-0 w-full px-6 py-4 bg-vscode-bg text-white'>
      <div>
        <Link to='/' onClick={homeClickEvent}>
          <span className='font-bold text-xl'>Web Accessibility Validator</span>
        </Link>
      </div>
      <nav className='flex gap-6'>
        <Link to='/' className='flex items-center font-semibold text-xl' onClick={homeClickEvent}>
          <IoHomeSharp size={26} />
        </Link>
        <a
          href='https://github.com/jun17183/web-accessibility-validator'
          target='_black'
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
