"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilterParams = (status: string) => {
    const params = new URLSearchParams();
    if (status && status !== "none") params.append("status", status);

    const orderBy = searchParams.get("orderBy");
    if (orderBy) params.append("orderBy", orderBy!);

    const query = params.size ? `?${params.toString()}` : "";
    router.push("/issues/list" + query);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => setFilterParams(status)}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((s, idx) => (
          <Select.Item key={idx} value={s.value || "none"}>
            {s.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
