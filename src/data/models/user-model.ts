import { RowDataPacket, createPool } from 'mysql2';
import DB from '../db';

class UserModel {
    tableName = 'users';

    getAll = async (): Promise<RowDataPacket | undefined> => {
        const sql = `SELECT * FROM ${this.tableName} WHERE role = 1`;
        const result = await DB.query(sql, []);
        if (result) {
            return result;
        }
        return undefined;
    }
}

module.exports = new UserModel;