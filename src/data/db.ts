import mysql from "mysql";
import { Constants } from '../utils/constants';

class DB {
    db: mysql.Pool;

    constructor() {
        this.db = mysql.createPool({
            host: Constants.DB_HOST,
            user: Constants.DB_USER,
            password: Constants.DB_PASS,
            database: Constants.DB_NAME
        });
        this.checkConnection();
    }

    checkConnection(): void {
        this.db.getConnection((err: any, connection: any) => {
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
            return;
        });
    }

    execute = async <T>(sql: string, values: string | object | null): Promise<T> => {
        return new Promise<T>((resolve, reject) => {
            const callback = (err: mysql.MysqlError | null, result: T) => {
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

export default new DB;