const DB = require('../db');
const LoggerError = require('../../utils/logger-error');

class OtpModel {

    findUpdate = async (msisdn, password) => {
        const sql = 'CALL find_update_otp(?, ?)';
        try {
            const results = await DB.query(sql, [msisdn, password]);
            if (results) {
                // sp returns extra data, need the first one
                const data = results[0][0];
                // get key
                let key = Object.keys(data)[0];
                return data[key];
            }
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }

    updateAllForNum = async (msisdn) => {
        const sql = 'CALL update_otp_all_for_num(?)'
        try {
            const result = await DB.query(sql, [msisdn])
            if (result) {
                // sp returns extra data, need the first one
                return result
            }
        }
        catch (e) {
            LoggerError.log(e)
            return undefined
        }
    }

    create = async (msisdn, password) => {
        const sql = 'CALL create_otp(?, ?)';
        try {
            const results = await DB.query(sql, [msisdn, password]);
            if (results) {
                // sp returns extra data, need the first one
                const data = results[0][0];
                // get key
                let key = Object.keys(data)[0];
                return data[key];
            }
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }
}

module.exports = new OtpModel;