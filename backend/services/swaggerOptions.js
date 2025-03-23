const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Medicon API',
            description: 'Medicon API Information',
            contact: {
                name: 'Medicon'
            },
        },
        servers: ["http://localhost:3000"]
    },
    apis: ['./routes/*.js', './index.js']
}

export default swaggerOptions;