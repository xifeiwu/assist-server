'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('bookmark', {
      id: { type: STRING(64), primaryKey: true},
      parentId: STRING(64),
      index: INTEGER,
      title: STRING(255),
      url: STRING(255),
      dateAdded: BIGINT,
      dateGroupModified: BIGINT,
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
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('bookmark', { id: Sequelize.INTEGER });
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bookmark');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('bookmark');
    */
  }
};
