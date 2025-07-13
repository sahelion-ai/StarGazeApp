// src/lib/scoreCalculator.js
export function calculateStargazingScore(weather, lightPollution, moonPhase) {
  // Weighted factors (adjust these values)
  const cloudScore = (100 - weather.clouds.all) * 0.5;
  const lightScore = (9 - lightPollution.bortle) * 0.3;
  const moonScore = (100 - moonPhase.illumination) * 0.2;
  
  return Math.min(10, Math.round(
    cloudScore + lightScore + moonScore
  ));
}