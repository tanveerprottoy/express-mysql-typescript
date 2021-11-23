import mysql2, { RowDataPacket } from "mysql2";
import { Constants } from '../utils/constants';

class DB {
    db: mysql2.Pool;

    constructor() {
        this.db = mysql2.createPool({
            host: Constants.DB_HOST,
            user: Constants.DB_USER,
            password: Constants.DB_PASS,
            database: Constants.DB_DATABASE
        });
        this.checkConnection();
    }

    checkConnection(): void {
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) {
                connection.release();
            }
            return
        });
    }

    query = async (sql: string, values: any | undefined): Promise<mysql.QueryFunction> => {
        return new Promise<mysql2.RowDataPacket>((resolve, reject) => {
            const callback = (err: mysql.MysqlError | null, result: mysql.QueryFunction) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            }
            this.db.query(sql, values, callback);
        }).catch(error => {
            throw Error;
        });
    }
}

export default new DB;