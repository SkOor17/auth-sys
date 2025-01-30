import { User, UserPayload } from "@/app/lib/dico";
import { generateAccessToken, generateRefreshToken } from "@/app/lib/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    // Missing informations
    if (!body || !body.email || !body.password) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let user: User = {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        pass: ""
    }

    try {
        const response = await fetch(`${process.env.URL}/api/user?email=${body.email}`)
        
        const data = await response.json();
        user = data.user
    } catch (error) {
        return NextResponse.json({ error: 'User does not exist'+error }, { status: 400 });       
    }

    if (!user) {
        return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    if (user.pass !== body.password) {
        return NextResponse.json({ error: 'Wrong password' }, { status: 400 });
    }

    const userPayload: UserPayload = {
        id: user.id,
        email: user.email,
        role: user?.role,
    }

    const token = generateAccessToken(userPayload)
    const refreshToken = generateRefreshToken(userPayload)

    const res = NextResponse.json({ status: 200 })
    res.headers.append('Set-Cookie', 
        `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
    )
    res.headers.append('Set-Cookie', 
        `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict`
    )

    return res
}