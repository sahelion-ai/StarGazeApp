import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const lat = url.searchParams.get('lat');
  const lon = url.searchParams.get('lon');
  
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OWM_KEY}&units=metric`
  );
  
  return json(await response.json());
}