declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        DATABASE_URL: string;
        JWT_SECRET: string;
        NODE_ENV: 'development' | 'production' | 'test';
    }
}