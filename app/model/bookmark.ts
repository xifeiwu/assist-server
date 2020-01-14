'use strict';

module.exports = app => {
    const Sequelize = app.Sequelize;
    const { STRING, INTEGER, DATE, BIGINT, BOOLEAN } = Sequelize;

    const Bookmark = app.model.define('user', {
        id: { type: STRING(64), primaryKey: true },
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
        tableName: 'bookmark',
        underscored: false
    });

    return Bookmark;
};