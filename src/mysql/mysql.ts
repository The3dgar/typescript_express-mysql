import mysql from 'mysql'


export default class MySQL {
  private static _instance: MySQL;

  cnn: mysql.Connection;

  conectado: boolean = false

  constructor() {
    console.log('Clase inicializada');

    this.cnn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234567",
      database: "node_db"
    })

    this.conectarDB()

  }

  public static get instance() {
    // asi solo configuramos tener una sola instancia de db
    return this._instance || (this._instance = new this())
  }

  // el static es para qye cuando escribamos mysql. salga la funcion
  static ejecutarQuery(query: string, callback: Function) {
    this.instance.cnn.query(query, (err, results: Object[], fields) => {
      if (err) {
        console.log('Error en query')
        console.log(err)
        return callback(err)
      }

      if (results.length === 0) {
        callback('El registro solicitado no existe')
      }
      else {
        callback(null, results)
      }

    })
  }



  private conectarDB() {
    this.cnn.connect((err: mysql.MysqlError) => {
      if (err) return console.log(err.message);
      this.conectado = true
      console.log('DB conectada');
    })
  }


}