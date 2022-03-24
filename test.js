// ! sebelum lanjut biar dependencies nya sama jalanin => npm install

// * kurang seeder aja, buat dummy concert atau yang lain juga bisa
// * untuk migrate db tinggal jalanin 'Set Up DB' aja satu-satu
// * kalau udah beres setup bisa langsung masukin ke git nanti bisa clone

// * -- Set Up DB --

// sequelize model:generate --name User --attributes email:string,password:string,role:string,fullName:string,age:integer,gender:string

// sequelize model:generate --name Ticket --attributes seatNumber:string,type:string

// sequelize model:generate --name Concert --attributes bandName:string,performanceDate:date,totalAudience:integer


// sequelize migration:generate --name add_column_UserId_toTicket_FK_for_table_User

// sequelize migration:generate --name add_column_ConcertId_toTicket_FK_for_table_Concert


// * Seeders //

// ? sequelize seed:generate --name table_name(plural) // sesuain aja sebelum di jalanin di terminal

// const nodemailer = require('nodemailer')
// let transporter = nodemailer.createTransport({
//     service: "hotmail",
//     auth: {
//         user: "narutosakura15@outlook.com",
//         pass: "Narutosasuke"
//     }
// });

// let mailOptions = {
//     from: 'narutosakura15@outlook.com',
//     to: `adlanmalik16@yahoo.com`,
//     subject: 'Test masuk nodemailer',
//     // text: `You have already booked ticket for DeWePe Project and this your ticket information
//     // Name: ${result.User.fullName}
//     // Seat Number: ${result.seatNumber}
//     // Type: ${result.type}
//     // Your Ticket Code: ${result.code}
//     // Guest Star: ${result.Concert.guestStar}
//     // `
//     text: 'TESTTTTTTTTTT'
// };

// transporter.sendMail(mailOptions, (err, info) => {
//     if (err) console.log(err);
// });

// console.log('success send email from nodemailer')

// postgres
// hoohlvwqoycspv
// c38b22b26f41c38a12eb8b4ab1b3ac631658b599c08cb2cab4ae26d27bfed0b0
// ec2-3-225-213-67.compute-1.amazonaws.com
// 5432
// ddpvd04ru7nvf5