import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import sequelize from "../configs/dbCon";

class Fac extends Model<InferAttributes<Fac>, InferCreationAttributes<Fac>> {
    declare id: CreationOptional<number>
    declare question: string
    declare answer: string
    declare typeId: number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare state: boolean
}

Fac.init({
    id: {
        autoIncrement: true,
        primaryKey: true, 
        type: DataTypes.INTEGER
    },
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    state: DataTypes.BOOLEAN
}, {
    tableName: 'fac',
    sequelize
});

Fac.beforeSave((fac, options) => {
    fac.createdAt = new Date();
    fac.updatedAt = new Date();
    fac.state = true;
});

Fac.beforeUpdate((fac, options) => {
    fac.updatedAt = new Date();
});

export default Fac