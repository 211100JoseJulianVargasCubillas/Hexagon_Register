import { MongoClient, Db } from 'mongodb';
import { Signale } from 'signale';

const signale = new Signale();

// Configuración de la conexión a MongoDB
const mongoConfig = {
    url: 'mongodb+srv://Vaquito999:Vaquito1234@dbmantenimiento.n2fxdhr.mongodb.net/',
    dbName: 'Mantenimiento-C2',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as any, // Definir options como any para evitar problemas de tipo
};

// Clase de utilidad para la conexión a MongoDB
class MongoDB {
    private client: MongoClient | null = null;
    private db: Db | null = null;

    async connect() {
        try {
            this.client = await MongoClient.connect(mongoConfig.url, mongoConfig.options);
            this.db = this.client.db(mongoConfig.dbName);
            signale.success('Conexión exitosa a MongoDB');
        } catch (error) {
            signale.error('Error al conectar a MongoDB:', error);
        }
    }

    getDb(): Db | null {
        return this.db;
    }

    async close() {
        if (this.client) {
            await this.client.close();
            signale.info('Conexión cerrada con MongoDB');
        }
    }
}

const mongodb = new MongoDB();

export async function getMongoDBInstance(): Promise<MongoDB> {
    await mongodb.connect();
    return mongodb;
}

export async function closeMongoDBConnection() {
    await mongodb.close();
}
