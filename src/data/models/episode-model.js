const DB = require('../db');
const LoggerError = require('../../utils/logger-error');
const coreUtils = require('../../utils/core-utils');
const { param } = require('../../routers/v1/auth-router');

class EpisodeModel {
    tableName = 'episodes';

    getAllBYAudiobookId = async (params) => {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE audiobook_id = ?`;
            const result = await DB.query(sql, [params[0]]);
            if (result) {
                return result;
            }
            return undefined;

        } catch (e) {
            coreUtils.printStringify(e);
            LoggerError.log(e)
            return undefined;
        }
    }

    create = async (
        name,
        fileUrl,
        audiobookId
    ) => {
        const sql = 'CALL create_episode(?, ?, ?)';
        try {
            const results = await DB.query(
                sql,
                [
                    name,
                    fileUrl,
                    audiobookId
                ]
            );
            if (results) {
                // sp returns extra data, need the first one
                return results[0][0];
            }
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }
}

module.exports = new EpisodeModel;