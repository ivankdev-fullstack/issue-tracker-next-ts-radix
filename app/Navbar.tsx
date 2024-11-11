import { AiFillBug } from "react-icons/ai";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((l, idx) => (
          <Link
            key={idx}
            href={l.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
