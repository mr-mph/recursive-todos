import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return new Response(
    "todo - implement something here: " +
      new URL(req.url).searchParams.get("test")
  );
}
