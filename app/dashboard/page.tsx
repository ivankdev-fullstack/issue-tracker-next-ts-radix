import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { IssueChart, IssueSummary, LatestIssues } from "./components";

const Dashboard = async () => {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);

  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueChart statuses={{ open, inProgress, closed }} />
          <IssueSummary statuses={{ open, inProgress, closed }} />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
};

export const dynamic = "force-dynamic";

export default Dashboard;
