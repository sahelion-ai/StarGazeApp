export async function getWeather(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bcb2df27869854f582eb01073a72afb3&units=metric`
  );
  return await response.json();
}
const [weather, lightData] = await Promise.all([
  getWeather(lat, lng),
  fetch(`https://www.lightpollutionmap.info/QueryRaster/?ql=world_2020&qt=point&qd=${lng},${lat}`)
    .then(r => r.json())
]);

