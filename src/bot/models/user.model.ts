import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IUserCreationAttr {
  user_id: number | undefined;
  username: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
}

@Table({ tableName: "user" })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  user_id: number | undefined;

  @Column({
    type: DataType.STRING,
  })
  username: string | undefined;

  @Column({
    type: DataType.STRING,
  })
  first_name: string | undefined;

  @Column({
    type: DataType.STRING,
  })
  last_name: string | undefined;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string | undefined;

  @Column({
    type: DataType.STRING,
  })
  lang: string | undefined;

  @Column({
    type: DataType.STRING,
  })
  last_state: string | undefined;

  @Column({
    type: DataType.STRING,
  })
  search_type: string | undefined;

  @Column({
    type: DataType.BOOLEAN,
  })
  status: boolean | undefined;
}
