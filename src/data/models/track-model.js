const DB = require('../db');
const LoggerError = require('../../utils/logger-error');
const coreUtils = require('../../utils/core-utils');

class TrackModel {
    tableName = 'tracks';

    findOne = async (params) => {
        try {
            const sql = 'CALL get_track(?, ?)';
            const results = await DB.query(sql, [params[0], params[1]]);
            /* coreUtils.printStringify(result[0][0]);
            coreUtils.printStringify(result[1][0]); */
            var track = results[0][0];
            const trackCountObj = results[1][0];
            let key = Object.keys(trackCountObj)[0];
            track.is_favorite = trackCountObj[key] > 0 ? true : false;
            /* console.log('trackCountObj ' + trackCountObj);
            console.log('key ' + key);
            console.log('trackCount ' + trackCountObj[key]); */
            if (track) {
                return track;
            }
            return undefined;
            /* const sql = 'SELECT * FROM tracks WHERE id = ? LIMIT 1';
            const sql1 = 'SELECT EXISTS(SELECT * FROM users_tracks WHERE user_id = ? AND track_id = ?) AS TRACK_COUNT'
            const sql2 = 'SELECT COUNT(*) AS TRACK_COUNT FROM users_tracks WHERE user_id = ? AND track_id = ?';
            const result = await DB.query(sql, [params[0]]);
            const result1 = await DB.query(sql1, [params[1], params[0]]);
            const result2 = await DB.query(sql2, [params[1], params[0]]);
            /* console.log('params' + params);
            console.log('res' + coreUtils.printStringify(result));
            console.log('res 1' + coreUtils.printStringify(result1)); */
            /*             coreUtils.printStringify(result2.COUNT);
                        console.log('stringifyToObject' + coreUtils.stringifyToObject(result2));
                        const t = coreUtils.stringifyToObject(result1);
                        coreUtils.printStringify(t);
                        for (const key in result2[0]) {
                            if (result2[0].hasOwnProperty(key)) {
                                var value = result2[0][key];
                                //do something with value;
                                console.log('value' + value);
                            }
                        } */
            /* console.log('res 3' + result[0]);
            console.log('res 4' + result1[0]);
            if (results) {
                return results;
            } */
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
            coreUtils.printStringify(e);
            LoggerError.log(e)
            return undefined;
        }
    }

    createTrack = async (
        name,
        description,
        author,
        audiobook,
        contributingArtists,
        category,
        genre,
        thumbPath,
        filePath
    ) => {
        const sql = 'CALL create_track_old(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            const results = await DB.query(sql, [name, description, author, audiobook, contributingArtists, category, genre, thumbPath, filePath]);
            if (results) {
                // sp returns extra data, need the first one
                return results[0][0];
            }
        }
        catch (e) {
            coreUtils.printStringify(e);
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

module.exports = new TrackModel;