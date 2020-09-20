/**
 * Fetch COVID data by country.
 * @param {String} country Name of the country.
 * @returns {Object} Data of requested country.
 */
export const getDataByCountry = (country) => {
  const formattedCountry = country.replace(/\s+/g, '%20');

  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(
      `https://covid19-api.com/country?name=${formattedCountry}&format=json`,
      requestOptions
    )
      .then((res) => {
        res.json().then((json) => {
          if (!json.length) {
            reject('No data returned');
          }
          resolve(json[0]);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Fetch COVID data for all countries.
 * @returns {Array} Array of objects for all countries in alphabetic order.
 */
export const getDataAllCountries = () => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('https://covid19-api.com/country/all?format=json', requestOptions)
      .then((res) => {
        res.json().then((json) => {
          resolve(json);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Gets a report of all country on a given date (DIFFERENT DATE FORMAT TO OTHERS)
 * @param {String} date Date of report (YYYY-MM-DD).
 * @returns {Array} Report of all countries on given date.
 */
export const getDatedReportAll = (date) => {
  return new Promise((resolve, reject) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`https://covid19-api.org/api/status?date=${date}`, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (!json.length) {
          reject('No data returned');
        }
        resolve(json);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Get a report of COVID cases in a country on a specified date.
 * @param {String} country Name of country.
 * @param {String} date Date of report (DD-MM-YYYY).
 * @returns {Object} Report of requested country on given date.
 */
export const getDatedReportByCountry = (country, date) => {
  const formattedCountry = country.replace(/\s+/g, '%20');
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(
      `https://covid19-api.com/report/country/name?name=${formattedCountry}&date=${date}&date-format=DD-MM-YYYY&format=json`,
      requestOptions
    )
      .then((res) => {
        res.json().then((json) => {
          if (json.message) {
            reject(json.message);
          }
          if (!json.length) {
            reject('No data returned');
          }
          resolve(json[0]);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Get a global report of COVID cases on a specified date.
 * @param {String} date Date of report (DD-MM-YYYY).
 * @returns {Object} Report of requested country on given date.
 */
export const getGlobalDatedReport = (date) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(
      `https://covid19-api.com/report/totals?date=${date}&date-format=DD-MM-YYYY&format=json
            `,
      requestOptions
    )
      .then((res) => {
        res.json().then((json) => {
          resolve(json[0]);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Get latest global totals.
 * @returns {Object} Object containing global totoal data.
 */
export const getLatestTotals = () => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('https://covid19-api.com/totals?format=json', requestOptions)
      .then((res) => {
        res.json().then((json) => {
          resolve(json[0]);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Gets all the countries in the world.
 * @returns {Array} Array of objects of all countries in alphabetic order.
 */
export const getCountries = () => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('https://covid19-api.com/help/countries?format=json', requestOptions)
      .then((res) => {
        res.json().then((json) => {
          resolve(json);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
