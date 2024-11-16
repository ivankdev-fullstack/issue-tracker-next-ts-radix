import { IssueStatusBadge, TableRowLink as Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Box, Table } from "@radix-ui/themes";
import NextLink from "next/link";

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  {
    label: "Issue",
    value: "title",
  },
  {
    label: "Status",
    value: "status",
    className: "hidden sm:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden sm:table-cell",
  },
];

export const columnNames = columns.map((c) => c.value);

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((c) => (
            <Table.ColumnHeaderCell
              key={c.value}
              className={c?.className || ""}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: c.value,
                  },
                }}
              >
                {c.label}
              </NextLink>
              {c.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(({ id, title, status, createdAt }) => (
          <Table.Row key={id}>
            <Table.Cell>
              <Link href={`/issues/${id}`}>{title}</Link>
              <Box className="block md:hidden">
                <IssueStatusBadge status={status} />
              </Box>
            </Table.Cell>
            <Table.Cell className="hidden sm:table-cell">
              <IssueStatusBadge status={status} />
            </Table.Cell>
            <Table.Cell className="hidden sm:table-cell">
              {createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
