import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Not Authorized." }, { status: 401 });

  const body = await req.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const createdIssue = await prisma.issue.create({ data: body });

  return NextResponse.json(createdIssue, { status: 201 });
}
