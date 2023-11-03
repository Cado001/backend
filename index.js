import  express  from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
const app = express()
app.use(cors())
app.use(express.json())
const MONGO_URI = 'mongodb+srv://biml16gb:mEK8ggrwk1uBRB2J@myfirstcluster.fctdvbv.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(MONGO_URI)
const db = client.db('blogapp-c12')
const blogPosts = db.collection('blog-posts')
client.connect()
console.log('connected to Mongo')
app.get('/', async (req, res) => {
   const allPosts =  await blogPosts.find().toArray()
   console.log('allPosts ->', allPosts)
    res.send(allPosts)
})
app.post('/',async (req, res) => {
    console.log('req ->', req.body)
    const newBlogPost = { title: req.body.title, content: req.body.content}
    const addedItem = await blogPosts.insertOne(newBlogPost)
    console.log('addedItem ->', addedItem)
    res.send(addedItem)
})
app.listen('8080', ()=> console.log('Api listening in port 8080 :sunglasses:'))







