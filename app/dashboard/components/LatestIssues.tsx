import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      user: true,
    },
  });

  const renderNoIssuesMessage = () => (
    <Flex align="center" justify="center" mt="5">
      <Text>No issues.</Text>
    </Flex>
  );

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      {!issues.length && renderNoIssuesMessage()}
      <Table.Root className="flex">
        <Table.Body>
          {issues.map((i) => (
            <Table.Row key={i.id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${i.id}`}>{i.title}</Link>
                    <IssueStatusBadge status={i.status} />
                  </Flex>
                  {i.userId && (
                    <Avatar
                      src={i.user?.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
