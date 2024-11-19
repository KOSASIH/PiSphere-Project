export const config = {
    db: {
        uri: 'mongodb://localhost:27017/pisphere',
    },
    server: {
        port: process.env.PORT || 5000,
    },
};
