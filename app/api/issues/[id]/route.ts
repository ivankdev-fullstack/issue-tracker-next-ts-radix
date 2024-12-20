import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validators/issueSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Not Authorized." }, { status: 401 });

  const issueId = params.id;
  const body = await req.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  if (body?.userId) {
    const user = await prisma.user.findUnique({ where: { id: body.userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 400 });
    }
  }

  const isExist = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });

  if (!isExist)
    return NextResponse.json({ error: "Issue not found." }, { status: 404 });

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
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Not Authorized." }, { status: 401 });

  const issueId = params.id;

  const isExist = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });

  if (!isExist)
    return NextResponse.json({ error: "Issue not found." }, { status: 404 });

  await prisma.issue.delete({
    where: { id: parseInt(issueId) },
  });

  return NextResponse.json({ isDeleted: true });
}
