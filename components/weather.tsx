"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardHeader,
  //   CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { LuCloudy } from "react-icons/lu";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaThermometer, FaThermometerHalf } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

// weather interface

interface Weather {
  temprature: number;
  description: string;
  location: string;
  unit: string;
}

export default function Weather() {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


// handle search form submission

const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const trimmedLocation = location.trim();
  if(trimmedLocation === ""){
    setError("please enter valid location")
    setWeather(null)
    return
  }
  setIsLoading(true); 
  setError(null); 

  try {
    // Fetch weather data from the weather API
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`
    );
    console.log(response)
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    const weatherData: Weather = {
      temprature: data.current.temp_c, 
      description: data.current.condition.text, 
      location: data.location.name, // 
      unit: "C", 
    };
    setWeather(weatherData); 
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setError("City not found. Please try again."); 
    setWeather(null); 
  } finally {
    setIsLoading(false);
  }
};


function getTemperatureMessage(temperature: number, unit: string): string {
  if (unit === "C") {
    if (temperature < 0) {
      return `It's freezing at ${temperature}°C! Bundle up!`;
    } else if (temperature < 10) {
      return `It's quite cold at ${temperature}°C. Wear warm clothes.`;
    } else if (temperature < 20) {
      return `The temperature is ${temperature}°C. Comfortable for a light jacket.`;
    } else if (temperature < 30) {
      return `It's a pleasant ${temperature}°C. Enjoy the nice weather!`;
    } else {
      return `It's hot at ${temperature}°C. Stay hydrated!`;
    }
  } else {
    
    return `${temperature}°${unit}`;
  }
}

function getWeatherMessage(description: string): string {
  switch (description.toLowerCase()) {
    case "sunny":
      return "It's a beautiful sunny day!☀🌞🌴";
    case "partly cloudy":
      return "Expect some clouds and sunshine.🌞☁";
    case "cloudy":
      return "It's cloudy today.☁";
    case "overcast":
      return "The sky is overcast.☁";
    case "rain":
      return "Don't forget your umbrella! It's raining. ☔💦";
    case "thunderstorm":
      return "Thunderstorms are expected today.⚡☔💦☁";
    case "snow":
      return "Bundle up! It's snowing.❄⛄";
    case "mist":
      return "It's misty outside.☁💨";
    case "fog":
      return "Be careful, there's fog outside.💨";
    default:
      return description; // Default to returning the description as-is
  }
}

// Function to get a location message based on the current time
function getLocationMessage(location: string): string {
  const currentHour = new Date().getHours();
  const isNight = currentHour >= 18 || currentHour < 6; // Determine if it's night time

  return ` ${location} ${isNight ? "at Night" : "During the Day"}`;
}


return (
  <div className="flex justify-center items-center h-screen">
    {/* Center the card within the screen */}
    <Card className="w-full max-w-md mx-auto text-center">
      {/* Card header with title and description */}
      <CardHeader>
        <CardTitle><b><i>⛅☔ Weather Widget ⛅☔</i></b></CardTitle>
        <CardDescription>
          <i><u>Search for the current weather conditions in your city.</u></i>
        </CardDescription>
      </CardHeader>
      {/* Card content including the search form and weather display */}
      <CardContent>
        {/* Form to input and submit the location */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 text-white">
          <Input
            type="text"
            placeholder="Enter a city name"
            value={location}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLocation(e.target.value) 
            }
            aria-label="City name"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Search"}{" "}
            
          </Button>
        </form>
        
        {error && (
          <div className="mt-4 text-red-500" role="alert" aria-live="assertive">
            {error}
          </div>
        )}
        
        {weather && (
          <div className="mt-4 grid gap-2">
            {/* Display temperature message with icon */}
            <div className="flex items-center gap-2">
            <FaThermometerHalf className="w-6 h-6 text-red-600" />
              <div className="text-white">{getTemperatureMessage(weather.temprature, weather.unit)}</div>
            </div>
            
            <div className="flex items-center gap-2">
              <LuCloudy className="w-6 h-6 text-blue-300" />
              <div className="text-white">{getWeatherMessage(weather.description)}</div>
            </div>
            
            <div className="flex items-center gap-2">
            <FiMapPin className="w-6 h-6 text-yellow-200" />
              <div className="text-white">{getLocationMessage(weather.location)}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);
}
