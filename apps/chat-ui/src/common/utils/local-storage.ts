enum LocalStorageKeys {
  'watch.user' = 'watch.user',
}

type LocalStorageKey = keyof typeof LocalStorageKeys;

export function setLocalStorage(key: LocalStorageKey, value: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value);
    return true;
  }
  return false;
}

export function removeLocalStorage(key: LocalStorageKey) {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);
    return true;
  }
  return false;
}

export function getLocalStorage(key: LocalStorageKey) {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
}
