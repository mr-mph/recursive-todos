export async function GET() {
  const res = await fetch("https://api.thedogapi.com/v1/images/search");
  const data = await res.json();
  return new Response(JSON.stringify(data));
}
