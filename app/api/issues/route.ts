import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({message: 'Not Authorized.'}, { status: 401 });
  
  const body = await req.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const createdIssue = await prisma.issue.create({ data: body });

  return NextResponse.json(createdIssue, { status: 201 });
}
