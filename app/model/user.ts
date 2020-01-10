'use strict';

module.exports = app => {
    const Sequelize = app.Sequelize;
    const { STRING, INTEGER, BIGINT, DATE } = Sequelize;

    const User = app.model.define('user', {
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
        tableName: 'user',
        underscored: false
    });

    return User;
};