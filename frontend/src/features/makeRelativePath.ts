export function makeRelativePath(url: string): string {
    try {
        const parsed = new URL(url);
        return parsed.pathname;
    } catch {
        return url;
    }
}

export function replaceLocalhostWithBackend(url: string): string {
    try {
        const parsed = new URL(url);

        if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
        parsed.hostname = '';
        }

        return parsed.toString();
    } catch {
        return url;
    }
}