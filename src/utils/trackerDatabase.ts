// import mysql, { PoolConnection } from "mysql2/promise";
// import * as dotenv from "dotenv";

// dotenv.config();
// const host = "db-03.mariadb.selteer.net";
// const user = "xprod_ilookwhlog";
// const pass = "tBCytr356LS4LGwT4Ljy2SYwdpyjT8Jr";
// console.log("host", host);
// let poolTracker = mysql.createPool({
//   connectionLimit: 10,
//   host: host,
//   user: user,
//   password: pass,
//   database: user,
// });

// (async () => {
//   const connection = await poolTracker.getConnection();
//   try {
//     console.log("Pool Tracker Connected!");
//     connection.release();
//   } catch (err: any) {
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       console.error("Database connection was closed.");
//     }
//     if (err.code === "ER_CON_COUNT_ERROR") {
//       console.error("Database has too many connections.");
//     }
//     if (err.code === "ECONNREFUSED") {
//       console.error("Database connection was refused.");
//     }
//   }
// })();
// // async function resetConnection() {
// //   const connection = await poolTracker.getConnection();
// //   const [process] = await connection.query<any[]>("show PROCESSLIST");
// //   // const sleep = process.find((row) => {
// //   //   return row.Command === "Sleep";
// //   // });
// //   // const kill = await connection.query(`KILL ${sleep.Id}`);
// //   process.map(row => {})
// //   console.log("prs", process);
// // }
// // resetConnection();
// export default poolTracker;
