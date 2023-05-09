import initdb from './models/init-models.js'

import  Sequelize  from 'sequelize';
const sequelize = new Sequelize (
    'devchat', 
    'admin',
    'mateus123', {
        host: 'mysqlserver.cdlulobxj2bw.us-east-2.rds.amazonaws.com',
        dialect: 'mysql', 
        logging: false 
    }
);


const db = initdb(sequelize);
export default db;