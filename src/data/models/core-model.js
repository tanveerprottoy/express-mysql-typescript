const DB = require('../db');
const LoggerError = require('../../utils/logger-error');

class CoreModel {

    findByIdRole = async (id, role) => {
        const sql = 'CALL find_by_id_role(?, ?)';
        try {
            const results = await DB.query(sql, [id, role]);
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

    getCombinedData = async () => {
        const sql = 'CALL get_combined_data()';
        try {
            const results = await DB.query(sql);
            if (results) {
                return results;
            }
            return undefined;
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }

    getAudiobookDataForPublisher = async (
        channelId
    ) => {
        const sql = 'CALL get_audiobook_data_for_publisher(?)';
        try {
            const results = await DB.query(sql, [channelId]);
            if (results) {
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

module.exports = new CoreModel;