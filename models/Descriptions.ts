import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import sequelize from "../configs/dbCon";

class Description extends Model<InferAttributes<Description>, InferCreationAttributes<Description>> {
    declare id: CreationOptional<number>
    declare name: string
    declare university: string
    declare standar: string
    declare premium: string
    declare integral: string
    declare idEnterprise: number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare state: boolean
}

Description.init({
    id: {
        autoIncrement: true,
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    name: DataTypes.STRING,
    university: DataTypes.STRING,
    standar: DataTypes.STRING,
    premium: DataTypes.STRING,
    integral: DataTypes.STRING,
    idEnterprise: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    state: DataTypes.BOOLEAN
}, {
    sequelize,
    tableName: 'descriptions'
})

Description.beforeSave((description, options) => {
    description.createdAt = new Date();
    description.updatedAt = new Date();
    description.state = true
});

Description.beforeUpdate((description, option) => {
    description.updatedAt = new Date();
})

export default Description