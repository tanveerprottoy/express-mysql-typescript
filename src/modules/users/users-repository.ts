import DB from '../../data/db';

class UserModel {
    tableName = "users";

    getAll = async (): Promise<any> => {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id > 0`;
            const result = await DB.execute(sql, []);
            return result;
        }
        catch(error: any) {
            console.error(error);
            return null;
        }
    }
}

export default new UserModel;