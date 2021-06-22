export const encode = (value: any) => {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))));
};

export const decode = <T = any>(value: string): T | undefined => {
  try {
    return JSON.parse(decodeURIComponent(escape(window.atob(value))));
  } catch (_) {}
  
  return undefined;
};
