'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('perfect_day', 'choice1', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('perfect_day', 'choice2', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('perfect_day', 'checkbox', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('perfect_day', 'choice1');
    await queryInterface.removeColumn('perfect_day', 'choice2');
    await queryInterface.removeColumn('perfect_day', 'checkbox');
  },
};
