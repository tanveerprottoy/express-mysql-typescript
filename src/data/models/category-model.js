const DB = require('../db');
const LoggerError = require('../../utils/logger-error');

class CategoryModel {
    tableName = 'categories';

    getAll = async () => {
        const sql = 'CALL get_entities(?)'
        try {
            const results = await DB.query(sql, [this.tableName])
            if (results) {
                return results[0]
            }
            return undefined
        }
        catch (e) {
            LoggerError.log(e)
            return undefined
        }
    }

    findById = async (id) => {
        const sql = 'CALL get_entity_by_id(?, ?)';
        try {
            const results = await DB.query(sql, [id, this.tableName]);
            if (results) {
                // sp returns extra data, need the first one
                return results[0][0];
            }
            return undefined;
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }

    create = async (
        name,
        imageUrl,
        publisherId
    ) => {
        return undefined
    }

    delete = async (id) => {
        const sql = 'CALL delete_entity_soft(?, ?)';
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
}

module.exports = new CategoryModel;