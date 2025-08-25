export function timeFromUnix(unix) {
  const d = new Date(unix * 1000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function dateTimeFromUnix(unix) {
  const d = new Date(unix * 1000);
  return d.toLocaleString([], { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" });
}
