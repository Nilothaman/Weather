// Simple mapping by temperature
export function themeForTemp(tempC) {
  // tweak thresholds to match your palette
  if (tempC <= 0) return "theme-blue";       // very cold
  if (tempC <= 12) return "theme-purple";    // cold
  if (tempC <= 20) return "theme-green";     // mild
  if (tempC <= 28) return "theme-orange";    // warm
  return "theme-red";                        // hot
}
