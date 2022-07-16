declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            NEXT_PUBLIC_PEER_PORT: string;
            NEXT_PUBLIC_PEER_PATH: string;
            NEXT_PUBLIC_PEER_HOST: string;
        }
    }
}

export {};