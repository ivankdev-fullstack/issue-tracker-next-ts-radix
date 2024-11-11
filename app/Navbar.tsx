"use client";

import { AiFillBug } from "react-icons/ai";
import Link from "next/link";
import React from "react";
import classnames from "classnames";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const curPath = usePathname();
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
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={classnames({
              "text-zinc-900": link.href === curPath,
              "text-zinc-800": link.href !== curPath,
              "hover:text-zinc-800, transition-colors": true,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
