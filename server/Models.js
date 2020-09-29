const db = require('../db');

const getFirstReservations = (id, callback) => {
  db.query(`SELECT * FROM reservations WHERE locationId = ${id}`, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const getLocation = (id, callback) => {
  db.query(`SELECT * FROM locations WHERE id = ${id}`, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const postReservation = (reserv, callback) => {
  const { checkin_date, checkout_date, adults, children, infants, price, locationId } = reserv;
  const inArr = checkin_date.split('/');
  const outArr = checkout_date.split('/');
  // console.log(inArr, outArr);
  const finalIn = `${inArr[2]}-${Number(inArr[0]) < 10 ? `0${inArr[0]}` : inArr[0]}-${inArr[1]}`;
  const finalOut = `${outArr[2]}-${Number(outArr[0]) < 10 ? `0${outArr[0]}` : outArr[0]}-${outArr[1]}`;
  // console.log(finalIn, finalOut);
  db.query('INSERT INTO reservations (checkin_date, checkout_date, adults, children, infants, price, locationId) VALUES (?,?,?,?,?,?,?)', [finalIn, finalOut, Number(adults), Number(children), Number(infants), Number(price), Number(locationId)], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

module.exports = { getFirstReservations, getLocation, postReservation };
