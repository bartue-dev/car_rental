export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 200); // 0-199 instead of 0-255
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `rgb(${r}, ${g}, ${b})`;
};