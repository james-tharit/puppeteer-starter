export const isValidUrl = (s: string): string => {
  try {
    new URL(s);
    return s;
  } catch (e) {
    console.error("Invalid url");
    process.exit(128);
  }
};
