"use client";

import { Button, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  const { status } = useSession();

  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <Button>
        <Link
          href={
            status === "unauthenticated" ? "/api/auth/signin" : "/issues/new"
          }
        >
          New Issue
        </Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
