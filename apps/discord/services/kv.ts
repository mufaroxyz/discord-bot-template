type CacheValue<T> = {
    value: T;
    expiresAt: number;
};

export class KvCache<T> {
    private cache: Map<string, CacheValue<T>> = new Map();
    private readonly ttl: number;

    constructor(ttl: number) {
        this.ttl = ttl;
    }

    public set(key: string, value: T): void {
        const expiresAt = Date.now() + this.ttl;
        this.cache.set(key, { value, expiresAt });
    }

    public get(key: string): T | null {
        const cacheValue = this.cache.get(key);
        if (!cacheValue) {
            return null;
        }

        if (Date.now() > cacheValue.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return cacheValue.value;
    }

    public getAll(): Map<string, T> {
        return new Map([...this.cache.entries()].map(([key, value]) => [key, value.value]));
    }

    public delete(key: string): void {
        this.cache.delete(key);
    }

    public clear(): void {
        this.cache.clear();
    }
}