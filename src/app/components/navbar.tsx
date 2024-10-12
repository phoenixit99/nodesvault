import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <div className="text-2xl font-bold">Material Tailwind</div>
      <div className="space-x-4">
        <Link href="/page">
          <a className="hover:underline">Page</a>
        </Link>
        <Link href="/account">
          <a className="hover:underline">Account</a>
        </Link>
        <Link href="/docs">
          <a className="hover:underline">Docs</a>
        </Link>
      </div>
      <div className="space-x-4">
        <button className="text-gray-500">Sign In</button>
        <button className="px-4 py-2 bg-black text-white rounded-md">Blocks</button>
      </div>
    </nav>
  );
};

export default Navbar;