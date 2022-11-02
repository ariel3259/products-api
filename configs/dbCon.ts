import { Sequelize } from "sequelize";


const sequelize: Sequelize = new Sequelize(process.env.DATABASE + '' , process.env.USERNAME_DB + '', process.env.PASSWORD, {
    host: `${process.env.HOST}`,
    port: parseInt(process.env.PORT_DB || ''),
    dialect: 'mysql'
});

export default sequelize