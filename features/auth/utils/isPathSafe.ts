export const isPathSafe = (requestedPath: string): boolean => {
  if (!requestedPath) return false;

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(requestedPath);
  } catch {
    return false;
  }
  const isBypass = decodedPath.startsWith("//") || decodedPath.startsWith("\\");

  if (isBypass || !decodedPath.startsWith("/")) {
    return false;
  }

  const noQueriesPath = decodedPath.split("?")[0];
  const basePath = noQueriesPath.split("/")[1];

  const validPaths = [
    "",
    "login",
    "onboarding",
    "dashboard",
    "createEvent",
    "event",
  ];

  return validPaths.includes(basePath);
};
