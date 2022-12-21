const express = require("express")
const cors = require("cors")

const app = express()


const userRoutes = require("./routes/userRoute.js")
const jobRoutes = require("./routes/jobRoute.js")
const taskRoutes = require("./routes/taskRoute.js")
const globalRoutes = require("./routes/globalRoute.js")
const port = process.env.PORT || 3001;

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send("Hello from Server")
})
app.use('/api/user', userRoutes)
app.use('/api/job', jobRoutes)
app.use('/api/task', taskRoutes)
app.use('/api/data', globalRoutes)

app.listen(port, () => {
    console.log("Server is running on port 3001")
})