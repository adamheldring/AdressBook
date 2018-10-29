import React from "react"

class App extends React.Component {

state = {
  contacts: [],
  currentContact: {},
  counter: 1,
  viewingAll: false,
  viewingSingle: false
}

getAllContactsFromAPI = () => {
  const query = "http://localhost:3015/contacts/"
  fetch(query)
    .then(response => response.json())
    .then(result => {
      this.setState({
        contacts: result.contacts,
      }, () => console.log(this.state.contacts))
    })
}

getSingleContactFromAPI = () => {
  const id = this.state.counter
  const query = `http://localhost:3015/contacts/${id}`
  fetch(query)
    .then(response => response.json())
    .then(result => {
      this.setState({
        currentContact: result,
        viewingSingle: true
      }, () => console.log(this.state.currentContact))
    })
}
allVisible = () => {
  this.setState({
    viewingAll: !this.state.viewingAll
  })
}

prevContact = () => {
  if (this.state.counter > 1) {
    this.setState({
      counter: this.state.counter - 1
    }, () => this.getSingleContactFromAPI())
  } else {
    console.log("No previous entry...")
  }
}

nextContact = () => {
  if (this.state.counter < this.state.contacts.length) {
    this.setState({
      counter: this.state.counter + 1
    }, () => this.getSingleContactFromAPI())
  } else {
     console.log("No next entry...")
  }
}

componentDidMount() {
  this.getAllContactsFromAPI()
}
  render() {
    return (
      <div>
        <header className="header">
          <h1>WELCOME TO<br />THE FANCY FRONTEND<br />OF THE GREAT ADRESS BOOK</h1>
        </header>
        <section className="allContacts-container">
          <div className="button-container">
            <button onClick={this.allVisible}>VIEW ALL CONTACTS</button>
            {(this.state.viewingAll) && this.state.contacts.map(contact => {
              return <p>{contact.name}<br /></p>
            })}
          </div><br /><br />

        </section>
        <section className="singleContact-container">
          <button onClick={this.getSingleContactFromAPI}>VIEW ONE CONTACT</button>
          <br /><br />
            {(this.state.viewingSingle) &&
              <div className="single-contact">
                <button onClick={this.prevContact}>-</button><br />
                  Id: {this.state.currentContact.id}<br />
                  Name: {this.state.currentContact.name}<br />
                  Phone: {this.state.currentContact.phoneNumber}<br />
                  @: {this.state.currentContact.emailAddress}<br />
                <button onClick={this.nextContact}>+</button>
              </div>
            }
        </section>
      </div>
    )
  }

}

export default App
