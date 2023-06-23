const databaseConfig = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'user',
    password: 'senha123',
    database: 'prog3',
    define: {
        timestamps: true,
        underscored: false,
        underscoredAll: false,
        freezeTableName: true,
    }
};

export default databaseConfig;

/* Qual a função de cada um desses campos? */