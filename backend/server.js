import express from "express"
import bodyParser from "body-parser"

const contacts = require("./contacts.json")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(express.static("public"))

app.get("/", (req, res) => {
  const allContacts = contacts.contacts
  res.send("Welcome to Adam's server!")
})

app.get("/contacts/", (req, res) => {
  const allContacts = contacts
  res.send(allContacts)
})

app.get("/contacts/:id/", (req, res) => {
  const id = req.params.id
  if (id <= contacts.contacts.length && id != 0) {
    const contact = contacts.contacts[id - 1]
    res.send(contact)
  } else {
    res.send ("404 - No such contact :(")
  }
})

app.get("*", (req, res) => {
  res.sendFile(__dirname + '/public/404.html')
})

app.listen(3015, () =>
  console.log("Example app listening on port 3015!")
)
