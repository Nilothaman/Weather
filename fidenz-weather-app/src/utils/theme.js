// Simple mapping by temperature
export function themeForTemp(tempC) {
  if (tempC <= 0) return "theme-blue";       
  if (tempC <= 12) return "theme-purple";  
  if (tempC <= 20) return "theme-green";   
  if (tempC <= 28) return "theme-orange";   
  return "theme-red";                      
}
