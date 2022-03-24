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


