// Convert wind speed from m/s to beaufort scale
export function toBeaufort(wind) {
  let beaufort = 0;
  if (wind < 0.3) {
    beaufort = 0;
  } else if (wind >= 0.3 && wind <= 1.5) {
    beaufort = 1;
  } else if (wind >= 1.6 && wind <= 3.3) {
    beaufort = 2;
  } else if (wind >= 3.4 && wind <= 5.4) {
    beaufort = 3;
  } else if (wind >= 5.5 && wind <= 7.9) {
    beaufort = 4;
  } else if (wind >= 8 && wind <= 10.7) {
    beaufort = 5;
  } else if (wind >= 10.8 && wind <= 13.8) {
    beaufort = 6;
  } else if (wind >= 13.9 && wind <= 17.1) {
    beaufort = 7;
  } else if (wind >= 17.2 && wind <= 20.7) {
    beaufort = 8;
  } else if (wind >= 20.8 && wind <= 24.4) {
    beaufort = 9;
  } else if (wind >= 24.5 && wind <= 28.4) {
    beaufort = 10;
  } else if (wind >= 28.5 && wind <= 32.6) {
    beaufort = 11;
  } else if (wind >= 32.7) {
    beaufort = 12;
  }
  return beaufort;
}

export function formatBytes(bytes, decimals) {
  if (bytes == 0) return '0 Byte';
  const k = 1000; // or 1024 for binary
  const dm = decimals + 1 || 3;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
