export function setLocalItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
}

export function getLocalItem(key: string): string {
    const item = sessionStorage.getItem(key);

    if (item != null)
        return item;
    else
        return '';
}