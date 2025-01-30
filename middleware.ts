import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";
const publiPath = ["/login", "/signup", "/"];
const adminPath = ["/admin"];

async function isAdmin(token: string): Promise<boolean> {
  const key = new TextEncoder().encode(SECRET_KEY);
  const { payload } = await jwtVerify(token, key);
  return payload.role === "admin";
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Chemins qui ne nécessitent pas d'authentification
  const isPublicPath = publiPath.includes(path);
  const isAdminPath = adminPath.includes(path);

  // Récupérer le token d'authentification
  const token = request.cookies.get("token")?.value || "";

  // Vérifie son role
  if (token) {
    const userIsAdmin = await isAdmin(token);
    console.log("isAdmin :", userIsAdmin);
    if (!userIsAdmin && isAdminPath) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Configurer les chemins où le middleware sera exécuté
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/signup", "/admin"],
};
