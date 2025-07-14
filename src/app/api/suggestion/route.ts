export async function GET() {
  while (true) {
    const res = await fetch("https://bored-api.appbrewery.com/random");
    const data = await res.json();
    if (data.activity.length < 15) {
      return new Response(JSON.stringify(data));
    }
  }
}
