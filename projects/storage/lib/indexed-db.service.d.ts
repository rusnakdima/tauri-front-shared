import { StorageService } from "./storage.service";
export declare class IndexedDbService implements StorageService {
    private dbName;
    private storeName;
    private db;
    constructor(dbName?: string, storeName?: string);
    private initDb;
    private getStore;
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
    keys(): string[];
    keysAsync(): Promise<string[]>;
}
