// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { location } = req.query;  // Get the location from the query parameters

//   if (!location) {
//     return res.status(400).json({ error: 'Location is required' });
//   }

//   try {
//     const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Get your API key from environment variables
//     const response = await fetch(
//       `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
//     );

//     if (!response.ok) {
//       throw new Error('Failed to fetch weather data');
//     }

//     const data = await response.json();

//     res.status(200).json({
//       location: data.location.name,
//       temperature: data.current.temp_c,
//       description: data.current.condition.text,
//       icon: data.current.condition.icon,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failled to fetch weather data" });
//   }
// }


import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const apiKey = process.env.WEATHER_API_KEY; // Server-side only environment variable

  if (!location) {
    return NextResponse.json({ error: 'Location is required' }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    );

    if (!response.ok) {
      if (response.status === 400) {
        return NextResponse.json({ error: 'City not found' }, { status: 404 });
      }
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}
