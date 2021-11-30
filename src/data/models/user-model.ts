import { RowDataPacket } from 'mysql2';
import DB from '../db';

class UserModel {
    tableName = 'users';

    getAll = async (): Promise<RowDataPacket[] | undefined> => {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id > 0`;
            const result = await DB.query(sql, []);
            if (result) {
                return result;
            }
            return undefined;
        }
        catch (error: any) {
            console.log(error);
            return undefined;
        }
    }
}

export default new UserModel;