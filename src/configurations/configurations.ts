// config.ts
interface Configuration {
    mongoURI: string;
    port: string;
    secret: string;
}

const config: Configuration = {
    mongoURI:
        process.env.MONGODB_URI ||
        "mongodb+srv://200538922:rJj6x7qBHgvzSP9s@cluster0.op2dsua.mongodb.net/movies",
    port: process.env.PORT || "3000",
    secret: process.env.SECRET || "secret",
};

export default config;
