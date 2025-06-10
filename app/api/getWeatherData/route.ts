import { NextResponse, NextRequest } from "next/server";

// Handles GET requests to /api/getWeatherData?name=...&country=...
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const country = searchParams.get("country");

  console.log("Received city query:", { name, country });

  if (!name || !country) {
    return NextResponse.json(
      { error: "Missing city name or country code" },
      { status: 400 }
    );
  }

  const APIkey = process.env.WEATHER_API_KEY;

  if (!APIkey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const query = `${encodeURIComponent(name)},${encodeURIComponent(country)}`;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${APIkey}&units=metric`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch weather data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather API fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
