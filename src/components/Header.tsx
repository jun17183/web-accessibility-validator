export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-gray-800 text-white flex items-center justify-between px-6 py-4">
      <div>
        <a href="#">
          <span className="font-bold">Web Accessibility Validator</span>
        </a>
      </div>
      <nav className="flex gap-4">
        <a className="font-semibold hover:underline" href="#">
          Home
        </a>
        <a className="font-semibold hover:underline" href="#">
          About
        </a>
      </nav>
    </header>
  );
}