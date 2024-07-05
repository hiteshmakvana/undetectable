import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import logError from "@/utils/logError";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { id, name, email, avatar } = await request.json();
        if (!id) {
            return NextResponse.json({ error: "User id is required" }, { status: 400 });
        }
        let user = await prisma.users.findUnique({
            where: { id },
        });
        if (user) {
            user = await prisma.users.update({
                where: { id },
                data: {
                    lastLogin: new Date()
                },
            })
        } else {
            user = await prisma.users.create({
                data: {
                    id,
                    name,
                    email,
                    avatar,
                    createdAt: new Date(),
                    lastLogin: new Date()
                },
            });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        console.log(err);
        logError(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
