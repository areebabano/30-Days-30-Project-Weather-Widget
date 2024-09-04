import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { location } = req.query;  // Get the location from the query parameters

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Get your API key from environment variables
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    res.status(200).json({
      location: data.location.name,
      temperature: data.current.temp_c,
      description: data.current.condition.text,
      icon: data.current.condition.icon,
    });
  } catch (error) {
    res.status(500).json({ error: "Failled to fetch weather data" });
  }
}
