import prisma from "@/prisma/client";
import { cache } from "react";

export const fetchIssue = cache((issueId: number) => {
  return prisma.issue.findUnique({ where: { id: issueId } });
});
