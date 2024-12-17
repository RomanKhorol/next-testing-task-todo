import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Разрешить все домены или замените на точный домен
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  };

  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  return NextResponse.next();
}
