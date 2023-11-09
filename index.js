import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'
const app = express()
app.use(cors())
app.use(express.json())
const client = new MongoClient(process.env.MONGO_URI)
const db = client.db('blogapp-c12')
const blogPosts = db.collection('blog-posts')
const usersDb = db.collection('users')
client.connect()
console.log('Connected to Mongo')
app.get('/', async (req, res) => {
    const allPosts = await blogPosts.find().toArray()
    console.log('allPosts -> ', allPosts)
    res.send(allPosts)
})
app.post('/', async (req, res) => {
    const newBlogPost = { title: req.body.title, content: req.body.content }
    await blogPosts.insertOne(newBlogPost)
    const allPosts = await blogPosts.find().toArray()
    res.send(allPosts)
})
// sign up
app.post('/signup', async (req, res) => {
    const userAdded = await usersDb.insertOne({email: req.body.email, password: req.body.password})
    console.log('user added ->', userAdded)
    res.send(userAdded)
})
// log in
app.post('/login',async (req, res) => {
    console.log(req.body)
    const userFound = await usersDb.findOne({email:req.body.email})
    res.send(userFound)
})
app.listen('8080', () => console.log('Api listening on port 8080 🥲'))