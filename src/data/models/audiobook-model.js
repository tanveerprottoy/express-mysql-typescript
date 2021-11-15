const DB = require('../db');
const LoggerError = require('../../utils/logger-error');
const coreUtils = require('../../utils/core-utils');

class AudiobookModel {
    tableName = 'audiobooks';

    getAll = async () => {
        try {
            const sql = 'SELECT a.*, c.name AS category_name FROM audiobooks AS a'
                + ' LEFT JOIN categories AS c ON c.id = a.category_id';
            const result = await DB.query(sql);
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

    getAllPendings = async () => {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE approval_status = ?`;
            const results = await DB.query(sql, [0]);
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

    getAllRejecteds = async () => {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE approval_status = ?`;
            const results = await DB.query(sql, [2]);
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

    updatePendings = async (id, status) => {
        try {
            const sql = `UPDATE ${this.tableName} SET approval_status = ? WHERE id = ?`;
            const results = await DB.query(sql, [status, id]);
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

    getAllByChannelId = async (channelId) => {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE channel_id = ? AND approval_status = ?`;
            const results = await DB.query(sql, [channelId, 1]);
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

    findOne = async (params) => {
        try {
            const sql = 'CALL get_audiobook(?, ?)';
            const results = await DB.query(sql, [params[0], params[1]]);
            let audiobook = results[0][0]
            let rate = results[1][0]
            audiobook.rating = rate.rating
            audiobook.rating_count = rate.rating_count
            let userRatingReview = results[2][0]
            audiobook.user_rating = userRatingReview.user_rating
            audiobook.review = userRatingReview.review
            const audiobookCountObj = results[3][0]
            let key = Object.keys(audiobookCountObj)[0]
            audiobook.is_favorite = audiobookCountObj[key] > 0 ? true : false
            // episodes are in index [4]
            audiobook.episodes = results[4]
            if (audiobook) {
                return audiobook;
            }
            return undefined;
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }

    findOneforAdmin = async (params) => {
        try {
            const sql = 'CALL get_audiobook(?, ?)';
            const results = await DB.query(sql, [params[0], 1]);
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

    findOneOld = async (params) => {
        try {
            const sql = 'CALL get_audiobook_old(?, ?)';
            const results = await DB.query(sql, [params[0], params[1]]);
            /* coreUtils.printStringify(result[0][0]);
            coreUtils.printStringify(result[1][0]); */
            var audiobook = results[0][0];
            const audiobookCountObj = results[1][0];
            let key = Object.keys(audiobookCountObj)[0];
            audiobook.is_favorite = audiobookCountObj[key] > 0 ? true : false;
            /* console.log('trackCountObj ' + trackCountObj);
            console.log('key ' + key);
            console.log('trackCount ' + trackCountObj[key]); */
            if (audiobook) {
                return audiobook;
            }
            return undefined;
        }
        catch (e) {
            coreUtils.printStringify(e);
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
            coreUtils.printStringify(e);
            LoggerError.log(e)
            return undefined;
        }
    }

    getPlaylist = async (count) => {
        const sql = 'CALL get_playlist(?)';
        try {
            const results = await DB.query(sql, [count]);
            if (results) {
                return results[0];
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
        description,
        author,
        contributingArtists,
        price,
        audiobookImageUrl,
        categoryId,
        channelId
    ) => {
        const sql = 'CALL create_audiobook_stand_alone(?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            const results = await DB.query(
                sql,
                [
                    name,
                    description,
                    author,
                    contributingArtists,
                    price,
                    audiobookImageUrl,
                    categoryId,
                    channelId
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

    createCombined = async (
        name,
        description,
        author,
        contributingArtists,
        price,
        thumbPath,
        filePath,
        categoryId,
        channelId
    ) => {
        const sql = 'CALL create_audiobook_combined(?, ?, ?, ?, ?, ?, ?, ?, ?)'
        try {
            const results = await DB.query(sql, [name, description, author, contributingArtists, price, thumbPath, filePath, categoryId, channelId])
            if (results) {
                // sp returns extra data, need the first one
                return results[0][0]
            }
        }
        catch (e) {
            LoggerError.log(e)
            return undefined
        }
    }

    createOrUpdateRating = async (
        rating,
        review,
        audiobookId,
        userId
    ) => {
        const sql = 'CALL create_or_update_rating(?, ?, ?, ?)';
        try {
            const results = await DB.query(sql, [rating, review, audiobookId, userId]);
            if (results) {
                // sp returns extra data, need the first one
                const data = coreUtils.getValueForKey(results[0][0])
                console.log(data)
                return data
            }
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }

    updatePlayCount = async (
        audiobookId
    ) => {
        const sql = 'CALL update_play_count(?)';
        try {
            const result = await DB.query(sql, [audiobookId]);
            if (result) {
                return result
            }
        }
        catch (e) {
            LoggerError.log(e)
            return undefined;
        }
    }

    updateTrackFiles = async (
        id,
        thumbPath,
        filePath
    ) => {
        const sql = 'UPDATE tracks SET thumb_path = ?, file_path = ? WHERE id = ?';
        try {
            const results = await DB.query(sql, [thumbPath, filePath, id]);
            if (results) {
                return results;
            }
        }
        catch (e) {
            coreUtils.printStringify(e);
            LoggerError.log(e)
            return undefined;
        }
    }
}

module.exports = new AudiobookModel;