type CacheValue<T> = {
    value: T;
    expiresAt: number;
};

export class ObjCache<T> {
    private cache: CacheValue<T> | null = null;
    private readonly ttl: number;

    constructor(ttl: number) {
        this.ttl = ttl;
    }

    public set(value: T): void {
        const expiresAt = Date.now() + this.ttl;
        this.cache = { value, expiresAt };
    }

    public get(): T | null {
        if (!this.cache) {
            return null;
        }

        if (Date.now() > this.cache.expiresAt) {
            this.cache = null;
            return null;
        }

        return this.cache.value;
    }

    public clear(): void {
        this.cache = null;
    }
}