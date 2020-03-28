"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql_1.default.createConnection({
            host: "localhost",
            user: "root",
            password: "Safety6544",
            database: "node_db"
        });
        this.conectarDB();
    }
    static get instance() {
        // asi solo configuramos tener una sola instancia de db
        return this._instance || (this._instance = new this());
    }
    // el static es para qye cuando escribamos mysql. salga la funcion
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err)
                return console.log(err.message);
            this.conectado = true;
            console.log('DB conectada');
        });
    }
}
exports.default = MySQL;
