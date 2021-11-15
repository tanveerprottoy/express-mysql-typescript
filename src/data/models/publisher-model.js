const DB = require('../db');
const LoggerError = require('../../utils/logger-error');

class PublisherModel {
    tableName = 'publishers';

    getAll = async () => {
        const sql = 'CALL get_entities(?)'
        try {
            const results = await DB.query(sql, [this.tableName])
            if (results) {
                // sp returns extra data, need the first one
                return results[0]
            }
            return undefined
        }
        catch (e) {
            LoggerError.log(e)
            return undefined
        }
    }

    getBlockedPublisher = async () => {
        const sql = `SELECT * FROM ${this.tableName} WHERE deleted = ?`;
        try {
            const results = await DB.query(sql, [1])
            if (results) {
                // sp returns extra data, need the first one
                return results
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

    findByCredential = async (credential) => {
        const sql = 'CALL get_publisher_by_credential(?)';
        try {
            const results = await DB.query(sql, [credential]);
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

    create = async (
        email,
        phone,
        fullName,
        passHash,
        address
    ) => {
        const sql = 'CALL create_publisher(?, ?, ?, ?, ?)';
        try {
            const results = await DB.query(sql, [email, phone, fullName, passHash, address]);
            if (results) {
                // sp returns extra data 2d array, need the first one
                return results[0][0];
            }
            console.log(e)
            return undefined;
        }
        catch (e) {
            console.log(e)
            LoggerError.log(e)
            return undefined;
        }
    }

    update = async (
        fullName,
        address,
        id
    ) => {
        const sql = 'CALL update_publisher(?, ?, ?)';
        try {
            const result = await DB.query(sql, [fullName, address, id]);
            if (result) {
                // sp with update query returns obj with affected rows
                return result;
            }
            return undefined;
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }

    updatePublisherStatus = async (id, deletestatus) => {
        const sql = `UPDATE ${this.tableName} SET deleted = ? WHERE id = ?`;
        try {
            const result = await DB.query(sql, [deletestatus, id]);
            if (result) {
                // sp with update query returns obj with affected rows
                return result;
            }
            return undefined;
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }

    delete = async (
        id
    ) => {
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

module.exports = new PublisherModel;