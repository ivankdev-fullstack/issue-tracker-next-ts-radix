"use client";

import { AiFillBug } from "react-icons/ai";
import Link from "next/link";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const Navbar = () => {
  const curPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className={classnames({
                      "text-zinc-900": link.href === curPath,
                      "text-zinc-800": link.href !== curPath,
                      "hover:text-zinc-800, transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="api/auth/signout">Log out</Link>
            )}
            {status !== "authenticated" && (
              <Link href="api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
