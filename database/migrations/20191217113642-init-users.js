'use strict';

/**

updateAt: {
  type: DATE,
  defaultValue: Sequelize.fn('NOW'),
  allowNull: false,
}
will cause error for mysql under version 5.6.5

fix: change type DATE to 'TIMESTAMP'

updatedAt: {
  type: 'TIMESTAMP',
  defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  allowNull: false
}
*/
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('user', {
      id: { type: BIGINT(20), primaryKey: true, autoIncrement: true },
      username: {
        type: STRING(255),
        unique: true,
        allowNull: false
      },
      realname: {
        type: STRING(255),
        unique: true,
        allowNull: true
      },
      password: STRING(255),
      email: STRING(100),
      role: STRING(100),
      age: INTEGER,
      birthday: DATE,
      passwordMd5: STRING(255),
      passwordSha256: STRING(255),
      visitCount: {
        type: BIGINT(20),
        defaultValue: 0
      },
      lastVisit: DATE,
      createdAt: {
        type: DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
      },
      updatedAt: {
        type: DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
      },
    }, {
      charset: 'utf8',
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('user', { id: Sequelize.INTEGER });
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('user');
    */
  }
};
