import * as express from 'express'
import * as uuid from 'uuid'
import * as http from 'http'
import * as createIO from 'socket.io'
import * as path from 'path'
import axios from 'axios'
import * as bodyParser from 'body-parser'
import { joinBudget, getCollaborators } from './database' 

export class Node {

  id = uuid.v4()
  app: express.Application
  server: http.Server
  io: any 
  budget: string
  //collaborators: Node[] = []

  constructor(public name: string, public endpoint: string, public port:number) {
    this.app = express()
    this.app.use(bodyParser.json());
    this.server = http.createServer(this.app)
    this.io = createIO(this.server)
    let socket: any;

    this.budget = "TEST-BUDGET"

    this.io.on('connection', s => {
      socket = s
      socket.emit('node', this.toJSON())
      socket.on('activate', id => {
        //register 
        console.log("ACTIVATED")
      })
      socket.on('deactivate', id => {
        //unregister
        console.log("DEACCTIVATED")
      })
    })

    this.app.get('/', (req, res) => {
      //res.sendFile(path.resolve('./index.html'));
      this.joinBudget("NEW");
      res.end()
    })

    this.app.get('/sendBudget', (req, res) => {
      //update model with req.body.whatever
      this.sendBudget()
    })

    this.app.post('/updateBudget', (req, res) => {
      //update model with req.body.whatever
      console.log("GOT IT")
      res.end()
    })
  }

  joinBudget(budgetName) { //creates if doesn't exist or else joins existing
    joinBudget(budgetName, this.endpoint)
    this.budget = this.budget
  }

  getCollaborators() {
    return getCollaborators(this.budget)
  }

  async sendBudget() {
    let collaborators = await this.getCollaborators()
    Object.keys(collaborators).forEach(key => { //collaborators[key].endpoint
      console.log(collaborators[key].endpoint)
      axios.post(
          collaborators[key].endpoint + '/updateBudget',
          { id: this.id } //model
      ).catch((error) => {
        console.log("ERROR:"+error)
      })
    })
  }

  start() {
    this.server.listen(this.port)
  }

  toJSON() {
    return {
      name: this.name
    }
  }

}
