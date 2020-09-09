const average = (min: number, max: number): number => Math.round((min + max) / 2);
const random = (min: number, max: number): number => Math.round(Math.random() * (max - min)) + min;

export { average, random };
