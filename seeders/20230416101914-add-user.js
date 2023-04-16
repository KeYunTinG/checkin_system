'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{ // 一次新增三筆資料
      name: 'root',
      account: 'root',
      password: await bcrypt.hash('12345678', 10),
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'user1',
      account: 'user1',
      password: await bcrypt.hash('acuser', 10),
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },
  down: async (queryInterface, Sequelize) => { // 清空資料表中所有資料
    await queryInterface.bulkDelete('Users', {})
  }
}