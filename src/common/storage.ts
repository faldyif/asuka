import * as fs from "fs";

export enum FileType {
    Beatmap = 'beatmap',
}

export default class Storage {
    private static createFolderIfNotExists(fileType: FileType) {
        if (!fs.existsSync(`${process.cwd()}/storage/${fileType}`)){
            fs.mkdirSync(`${process.cwd()}/storage/${fileType}`);
        }
    }

    static write(fileName: string, fileType: FileType, content: string) {
        this.createFolderIfNotExists(fileType);

        fs.writeFileSync(`${process.cwd()}/storage/${fileType}/${fileName}`, content);
    }

    static read(fileName: string, fileType: FileType): string {
        return fs.readFileSync(`${process.cwd()}/storage/${fileType}/${fileName}`, 'utf8')
    }

    static isExists(fileName: string, fileType: FileType): boolean {
        return fs.existsSync(`${process.cwd()}/storage/${fileType}/${fileName}`)
    }
}
