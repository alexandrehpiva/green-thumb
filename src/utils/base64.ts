type NotFunction<T = any> = T extends Function ? never : T;

export const encode = <T>(value: NotFunction<T>): string => {
  const jsonEncoded = JSON.stringify(value);

  if (jsonEncoded === undefined) {
    throw new Error(`Could not encode the value: ${value}`);
  }

  return btoa(unescape(encodeURIComponent(jsonEncoded)));
};

export const decode = <T extends NotFunction>(value: string): T => {
  try {
    return JSON.parse(decodeURIComponent(escape(window.atob(value))));
  } catch (_) {
    throw new Error(`Could not decode the value: ${value}`);
  }
};
