import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
// @ts-ignore
import { Sanitizer } from 'sanitize';
import logError from "@/utils/logError";


const sanitizer = new Sanitizer();
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { content, userId } = await request.json();
        if (!content || !userId) {
            return NextResponse.json({ error: "Content/User Id is required" }, { status: 400 });
        }
        // Call external API
        const response = await fetch("https://aicheck.undetectable.ai/detect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                text: sanitizer.str(content),
                key: process.env.UD_API_KEY
            })
        }).then(res => res.json());
        if (response.human) {
            let score = response.human;
            await prisma.documents.create({
                data: {
                    userId,
                    content,
                    score,
                    createdAt: new Date(),
                },
            });
            return NextResponse.json({ score }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    } catch (err) {
        logError(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
