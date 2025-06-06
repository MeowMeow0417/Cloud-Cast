import { NextResponse, NextRequest } from "next/server";

// Handles GET requests to /api/getLocation?city=CityName
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cityname = searchParams.get('city');

  if (!cityname) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  const APIkey = process.env.WEATHER_API_KEY;

  if (!APIkey) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch weather data' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Weather API fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
