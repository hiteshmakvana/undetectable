import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import logError from "@/utils/logError";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { user: string } }) {
    try {
        const userId = params.user
        if (!userId) {
            return NextResponse.json({ error: "User Id is required" }, { status: 400 });
        }
        const documents = await prisma.documents.findMany({
            where: {
                userId
            }
        })
        return NextResponse.json(documents, { status: 200 });
    } catch (err) {
        logError(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
