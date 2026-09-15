/* K9DB V1 Bridge
   用途：將舊版 K9_OFFICIAL_STATION_DB_V4 安全導入 K9_DATABASE_V1。
   不修改既有 UI，也不刪除舊資料。
*/
(function () {
  "use strict";

  const DB_KEY = "K9_OFFICIAL_STATION_DB_V4";
  const SHIFT_KEY = "K9_SHIFT_DATA";
  const K9DB_KEY = "K9_DATABASE_V1";

  function safeParse(value, fallback) {
    try {
      const parsed = JSON.parse(value);
      return parsed == null ? fallback : parsed;
    } catch (e) {
      return fallback;
    }
  }

  function readDB() {
    return safeParse(localStorage.getItem(K9DB_KEY), {
      version: 1,
      calendarRecords: [],
      archives: [],
      settings: {}
    });
  }

  function writeDB(db) {
    localStorage.setItem(K9DB_KEY, JSON.stringify(db));
  }

  // 第一次載入時，把舊版資料複製到 K9DB V1。
  let db = readDB();

  if (!localStorage.getItem(K9DB_KEY)) {
    const legacy = safeParse(localStorage.getItem(DB_KEY), []);
    const shiftData = safeParse(localStorage.getItem(SHIFT_KEY), []);

    db = {
      version: 1,
      calendarRecords: Array.isArray(legacy) ? legacy : [],
      archives: Array.isArray(legacy) ? legacy : [],
      settings: {
        calendarShiftData: shiftData
      }
    };

    writeDB(db);
  }

  window.K9DB = window.K9DB || {};

  K9DB.get = function () {
    return readDB();
  };

  K9DB.save = function (newDB) {
    writeDB(newDB);
    return newDB;
  };

  K9DB.calendar = K9DB.calendar || {};

  K9DB.calendar.getAll = function () {
    const data = readDB();
    return Array.isArray(data.calendarRecords)
      ? data.calendarRecords
      : [];
  };

  K9DB.calendar.getArchives = function () {
    const data = readDB();
    return Array.isArray(data.archives)
      ? data.archives
      : [];
  };

  K9DB.calendar.save = function (records) {
    const data = readDB();
    data.calendarRecords = Array.isArray(records) ? records : [];
    data.archives = Array.isArray(records) ? records : [];
    writeDB(data);
    return data.calendarRecords;
  };

  K9DB.calendar.addArchive = function (archive) {
    const data = readDB();
    if (!Array.isArray(data.archives)) data.archives = [];
    data.archives.push(archive);
    writeDB(data);
    return archive;
  };

  K9DB.calendar.findArchive = function (id) {
    return K9DB.calendar.getArchives().find(x =>
      String(x.id) === String(id)
    ) || null;
  };

  K9DB.calendar.removeArchive = function (id) {
    const data = readDB();
    data.archives = (data.archives || []).filter(x =>
      String(x.id) !== String(id)
    );
    data.calendarRecords = (data.calendarRecords || []).filter(x =>
      String(x.id) !== String(id)
    );
    writeDB(data);
    return true;
  };

  K9DB.settings = K9DB.settings || {};

  K9DB.settings.get = function (key, fallback) {
    const data = readDB();
    return Object.prototype.hasOwnProperty.call(data.settings || {}, key)
      ? data.settings[key]
      : fallback;
  };

  K9DB.settings.set = function (key, value) {
    const data = readDB();
    if (!data.settings) data.settings = {};
    data.settings[key] = value;
    writeDB(data);
    return value;
  };

  console.log("[K9DB] V1 bridge ready.");
})();
