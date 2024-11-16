"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

const AssigneeSelect = async ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const onAssign = async (userId: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        userId: userId === "none" ? null : userId,
      });
    } catch (e) {
      toast.error("Changes could not be saved.");
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.userId || ""}
        onValueChange={(userId) => onAssign(userId)}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Item value="none">None</Select.Item>
            {users?.map((u) => (
              <Select.Item key={u.id} value={u.id}>
                {u.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster></Toaster>
    </>
  );
};

export default AssigneeSelect;
