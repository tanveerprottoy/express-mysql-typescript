const DB = require('../db');
const LoggerError = require('../../utils/logger-error');
const { multipleColumnSet } = require('../../utils/core-utils');

class UserModel {
    tableName = 'users';

    getAll = async () => {
        const sql = `SELECT * FROM ${this.tableName}`;
        const result = await DB.query(sql);
        if (result) {
            return result;
        }
        return undefined;
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await DB.query(sql, [...values]);
        if (result) {
            // return back the first row (user)
            return result[0];
        }
        return undefined;
    }

    findById = async (id) => {
        const sql = 'CALL get_entity_by_id(?, ?)';
        try {
            const results = await DB.query(sql, [id, this.tableName]);
            if (results) {
                // sp returns extra data 2d array, need the first one
                return results[0][0];
            }
            return undefined;
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }

    createOrReturn = async (userName, fullName, authSrc, imageUrl) => {
        const sql = 'CALL create_or_return_user(?, ?, ?, ?)';
        try {
            const results = await DB.query(sql, [userName, fullName, authSrc, imageUrl]);
            if (results) {
                // sp returns extra data 2d array, need the first one
                return results[0][0];
            }
            return undefined;
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

        const result = await DB.query(sql, [...values, id]);

        return result;
    }

    /*delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    } */
}

module.exports = new UserModel;