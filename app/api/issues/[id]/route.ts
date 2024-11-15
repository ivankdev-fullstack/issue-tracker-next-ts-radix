import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationSchemas";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const issueId = params.id;
  const body = await req.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const isExist = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });

  if (!isExist)
    return NextResponse.json({ error: "Issue nor found." }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(issueId) },
    data: body,
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const issueId = params.id;

  const isExist = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });

  if (!isExist)
    return NextResponse.json({ error: "Issue nor found." }, { status: 404 });

  await prisma.issue.delete({
    where: { id: parseInt(issueId) },
  });

  return NextResponse.json({ isDeleted: true });
}
