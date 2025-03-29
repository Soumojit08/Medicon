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
        servers: [
            {
                url: "http://localhost:3000",
            },
            {
                url: "https://medicon-4pta.onrender.com"
            }
        ]
    },
    apis: ['./routes/*.js', './index.js']
}

export default swaggerOptions;