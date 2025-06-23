export const getInitial = (name: string) => {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);
};

export const getFullName = (firstName: string, lastName: string) => {
  return `${firstName?.charAt(0).toUpperCase()}${firstName?.slice(1)} ${lastName?.charAt(0).toUpperCase()}${lastName?.slice(1)}`.trim();
};
