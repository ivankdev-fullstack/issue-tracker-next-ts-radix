import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Box, Flex, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { IssueActions, IssueTable } from "./components";
import { columnNames, IssueQuery } from "./components/IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      {!issues.length && (
        <Text className="text-center" my="5">
          No issues.
        </Text>
      )}
      <IssueTable searchParams={searchParams} issues={issues} />
      <Box mt="3">
        <Pagination pageSize={pageSize} curPage={page} itemCount={issueCount} />
      </Box>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
