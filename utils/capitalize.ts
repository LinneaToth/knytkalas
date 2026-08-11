export const capitalize = (word: string) => {
  return (
    String(word).charAt(0).toUpperCase() + String(word).toLowerCase().slice(1)
  );
};
