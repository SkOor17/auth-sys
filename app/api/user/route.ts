// import { User } from "@/app/lib/dico";
// import path from "path";
// import fs from 'fs';

import { User } from "@/app/lib/dico";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
        return NextResponse.json({ error: 'Missing email'}, { status: 400 });
    }

    const filePath = path.resolve(process.cwd(), 'app/lib/users.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const data: Array<User> = JSON.parse(fileContents)

    const user = data.filter((user) => user.email === email)
    
    if (user.length === 1) {
        return NextResponse.json({ message: 'Success', user: JSON.parse(JSON.stringify(user[0])) }, { status: 200 });
    }
}