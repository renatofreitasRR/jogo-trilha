export function setLocalItem(key: string, value: string): void {
    localStorage.setItem(key, value);
}

export function getLocalItem(key: string): string {
    const item = localStorage.getItem(key);

    if (item != null)
        return item;
    else
        return '';
}