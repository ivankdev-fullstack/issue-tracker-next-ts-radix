import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  statuses: { open: number; inProgress: number; closed: number };
}

const IssueSummary = ({ statuses }: Props) => {
  const { open, inProgress, closed } = statuses;
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="3">
      {containers.map((c) => (
        <Card key={c.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${c.status}`}
            >
              {c.label}
            </Link>
            <Text size="5" className="font-bold">
              {c.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
