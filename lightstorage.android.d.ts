import { Common } from './lightstorage.common';
import { File } from "tns-core-modules/file-system";
export declare class Lightstorage extends Common {
    static extension: string;
    static folder: string;
    static folderInit: string;
    get(reference: string): Promise<any>;
    mergeItem(object1: Object, object: Object, overwrite?: string): Object;
    set(reference: string, data: Object, overwrite?: string): Promise<any>;
    update(reference: string, data: Object): Promise<any>;
    delete(reference: string): Promise<any>;
    push(reference: string, object: Object): Promise<any>;
}
export declare class Reference {
    static split(reference: any): Object;
    static getFile(reference: string): File;
}
export declare class InitJsonDb {
    constructor();
    folderInit(): void;
    static fileInit(filename: string): boolean;
}
export declare class createJson {
    static indexing(reference: string, element: Object, value: any): void;
    static imbricated(a: string, objects: any, AutoIncrementID?: boolean): any;
    static getItem(reference: any): Promise<any>;
    static filter(reference: string): Array<String>;
    static orderBy(order: Object): void;
}
