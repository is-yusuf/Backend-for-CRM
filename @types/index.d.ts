// custom_typings/index.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_PASS: string;
    API_KEY: string;
    DB_DIALECT: dialect;
    SECRET_KEY: string;
  }
}
