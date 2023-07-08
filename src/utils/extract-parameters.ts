export const extractParameters = (str: string) => {
  const regex = /<([^>]+)>/g;
  const matches = str.match(regex);

  if (matches) {
    const parameters = matches.map((match) => match.slice(1, -1));
    return parameters;
  }

  return [];
};
