import { NextResponse, NextRequest } from "next/server";

// Handles GET requests to /api/getLocation?q=CityName
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cityname = searchParams.get("q");
  const APIkey = process.env.WEATHER_API_KEY;

  if (!cityname) {
    return NextResponse.json({ error: true, message: "City is required" }, { status: 400 });
  }

  if (!APIkey) {
    return NextResponse.json({ error: true, message: "Missing API key" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityname)}&limit=15&appid=${APIkey}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: true, message: "Failed to fetch location data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // If no cities are found, return a controlled error
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: true, message: "No results found" }, { status: 404 });
    }

    // Only return the fields you need
    const trimmedData = data.map((city: any) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state,
    }));

    return NextResponse.json({ data: trimmedData });
  } catch (error) {
    console.error("OpenWeather API error:", error);
    return NextResponse.json({ error: true, message: "Internal server error" }, { status: 500 });
  }
};
