import mysql2 from "mysql2";
import { Constants } from '../utils/constants';

class DB2 {
    db: mysql2.Pool;

    constructor() {
        this.db = mysql2.createPool({
            host: Constants.DB_HOST,
            user: Constants.DB_USER,
            password: Constants.DB_PASS,
            database: Constants.DB_NAME
        });
        this.checkConnection();
    }

    checkConnection(): void {
        this.db.getConnection((err, connection) => {
            if(err) {
                if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if(err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if(err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if(connection) {
                connection.release();
            }
            return
        });
    }

    execute = async (sql: string, values: any | undefined): Promise<mysql2.RowDataPacket[]> => {
        return new Promise<mysql2.RowDataPacket[]>((resolve, reject) => {
            const callback = (err: mysql2.QueryError | null, result: mysql2.RowDataPacket[], fields: mysql2.FieldPacket[]) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(result);
            }
            this.db.query(sql, values, callback);
        }).catch(error => {
            let message = error.message;
            if(!message) {
                message = "An error occurred";
            }
            throw Error(error.message);
        });
    }
}

export default new DB2;