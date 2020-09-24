import CMap from './countries.json';
/**
 * Fetch COVID data by country.
 * @param {String} country Name of the country.
 * @returns {Object} Data of requested country.
 */
export const getDataByCountry = (country) => {
  const formattedCountry = CMap[country];

  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(
      `https://covid19-api.org/api/status/${formattedCountry}`,
      requestOptions
    )
      .then((res) => {
        res.text().then((text) => {
          const data = JSON.parse(text);
          if (data) {
            resolve(data);
          } else {
            reject('No data returned');
          }
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
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('https://covid19-api.org/api/status', requestOptions)
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
 * Gets a report of all country on a given date
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
 * @param {String} date Date of report (YYYY-MM-DD).
 * @returns {Object} Report of requested country on given date.
 */
export const getDatedReportByCountry = (country, date) => {
  const formattedCountry = CMap[country];
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(
      `https://covid19-api.org/api/status/${formattedCountry}?date=${date}`,
      requestOptions
    )
      .then((res) => {
        if (res.status === 400) {
          reject('Invalid Request');
        }
        res.text().then((text) => {
          const data = JSON.parse(text);
          if (data) {
            resolve(data);
          } else {
            reject('Error retrieving data');
          }
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

    fetch('https://covid19-api.org/api/countries', requestOptions)
      .then((res) => {
        res.text().then((text) => {
          const data = JSON.parse(text);
          if (data) {
            resolve(data);
          } else {
            reject('Error retrieving data');
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getMobility = (country) => {
  return new Promise((resolve, reject) => {

    fetch(`https://storage.googleapis.com/covid19-open-data/v2/${country}/main.json`)
      .then((res) => {
        res.text().then((text) => {
          const data = JSON.parse(text);
          if (data) {
            resolve(data);
          } else {
            reject('Error retrieving data');
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const getMobilityCountries = () => {
  return new Promise((resolve, reject) => {

    fetch(`https://storage.googleapis.com/covid19-open-data/v2/mobility.json`)
      .then((res) => {
        res.text().then((text) => {
          const data = JSON.parse(text);
          if (data) {
            resolve(data);
          } else {
            reject('Error retrieving data');
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}