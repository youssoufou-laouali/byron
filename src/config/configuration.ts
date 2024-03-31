const int = (val: string | undefined, num: number): number =>
  val ? (isNaN(parseInt(val)) ? num : parseInt(val)) : num;
const bool = (val: string | undefined, bool: boolean): boolean =>
  val == null ? bool : val == 'true';

export default () => ({
  port: int(process.env.PORT, 3000),
  database: process.env.DATABASE_URL,
  db: {
    host: process.env.HOST,
    port: int(process.env.PORT, 27017),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
});
