import { NextRequest, NextResponse } from "next/server";
import Logger from "@/loggerServer";
import { getServerSession } from "next-auth";
import prisma from "../_db/db";
import { authOptions } from "../../../authOptions";
import Contract, { ContractWithExtras, CreateContract } from "../../../models/contract";
import { formatObligations } from "../_utils";
import { Obligation } from "@prisma/client";
import { createWeeksContractObligations } from "./_utils/contractUtils";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<{ error: string } | Contract>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { obligationIds, signatures, contractees, ...contractData } =
      data as CreateContract;
    const now = new Date();

    const obligations: Obligation[] = await prisma.obligation.findMany({
      where: {
        obligationId: {
          in: obligationIds,
        },
      },
    });

    const contractResponse = await prisma.contract.create({
      data: { ...contractData, creatorId: session.user.userId },
    });

    let populatedObligations: Obligation[] = [];

    for (const contractee of contractees) {
      const createUserContractPromsie = prisma.userContract.create({
        data: {
          contractId: contractResponse.contractId,
          userId: contractee.userId,
          signedAt: signatures.includes(contractee.userId) ? now : null,
        },
      });
      const createContractObligationsPromise = createWeeksContractObligations(
        obligations,
        contractResponse,
        [contractee.userId],
      );

      const result = await Promise.all([
        createUserContractPromsie,
        createContractObligationsPromise,
      ]);

      populatedObligations = result[1].obligations;
    }

    const formattedObligations = formatObligations(populatedObligations);

    const contract: ContractWithExtras = {
      contractId: contractResponse.contractId,
      creatorId: session.user.userId,
      dueDate: contractResponse.dueDate,
      title: contractResponse.title,
      description: contractResponse.description,
      createdAt: contractResponse.createdAt,
      obligations: formattedObligations,
      signatures: [session.user],
      contractees,
    };

    return NextResponse.json({ ...contract }, { status: 200 });
  } catch (error: any) {
    Logger.error("Error creating contract", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contractId = req.nextUrl.searchParams.get("id") as string;
    const contract = await prisma.contract.findUnique({
      where: { contractId },
    });
    if (!contract) {
      return NextResponse.json(
        { error: "Contract not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ result: contract }, { status: 200 });
  } catch (error: any) {
    Logger.error("Error fetching contract", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contractId = req.nextUrl.searchParams.get("id") as string;
    const data = await req.json();
    const contract = await prisma.contract.update({
      where: { contractId },
      data,
    });
    return NextResponse.json({ result: contract }, { status: 200 });
  } catch (error: any) {
    Logger.error("Error updating contract", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contractId = req.nextUrl.searchParams.get("id") as string;
    await prisma.contract.delete({
      where: { contractId },
    });
    return NextResponse.json(
      { message: "Contract deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    Logger.error("Error deleting contract", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
