import { Model, InferAttributes, CreationOptional, InferCreationAttributes, DataTypes } from "sequelize";
import sequelize from "../configs/dbCon";

class Packages extends Model<InferAttributes<Packages>, InferCreationAttributes<Packages>> {
    declare id: CreationOptional<number>
    declare name: string
    declare code: number
    declare type_Id: number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare state: boolean
}

Packages.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    code: {
        unique: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type_Id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    state: DataTypes.BOOLEAN
}, {
    tableName: 'packages',
    sequelize
});

Packages.beforeSave((packages, options) => {
    packages.createdAt = new Date();
    packages.updatedAt = new Date();
    packages.state = true
});

Packages.beforeUpdate((packages, options) => {
    packages.updatedAt = new Date();
});

export default Packages