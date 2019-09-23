import React, {
  Component
} from "react";
import axios from "axios";
import {
  Input,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button
} from "reactstrap";

class App extends Component {
  state = {
    contacts: [],
    newContactsData: {
      title: "",
      Number: ""
    },
    editContactData: {
      id: "",
      title: "",
      Number: ""
    },
    editContactData: false,
    editContactModal: false
  };
  componentWillMount() {
    this._refreshContacts();
  }
  toggleeditContactData() {
    this.setState({
      editContactData: !this.state.editContactData
    });
  }
  toggleEditContactModal() {
    this.setState({
      editContactModal: !this.state.editContactModal
    });
  }
  addContact() {
    axios
      .post(
        "https://react-phonecontact-b7a92.firebaseio.com",
        this.state.newContactsData
      )
      .then(response => {
        let {
          contacts
        } = this.state;

        contacts.push(response.data);

        this.setState({
          contacts,
          editContactData: false,
          newContactsData: {
            title: "",
            Number: ""
          }
        });
      });
  }
  updateContact() {
    let {
      title,
      Number
    } = this.state.editContactData;

    axios
      .put(
        "https://react-phonecontact-b7a92.firebaseio.com" +
        this.state.editContactData.id, {
          title,
          Number
        }
      )
      .then(response => {
        this._refreshContacts();

        this.setState({
          editContactModal: false,
          editContactData: {
            id: "",
            title: "",
            Number: ""
          }
        });
      });
  }
  editContact(id, title, Number) {
    this.setState({
      editContactData: {
        id,
        title,
        Number
      },
      editContactModal: !this.state.editContactModal
    });
  }
  deleteContact(id) {
    axios
      .delete("https://react-phonecontact-b7a92.firebaseio.com" + id)
      .then(response => {
        this._refreshContacts();
      });
  }
  _refreshContacts() {
    axios.get("https://react-phonecontact-b7a92.firebaseio.com").then(response => {
      this.setState({
        contacts: response.data
      });
    });
  }
  render() {
    let contacts = this.state.contacts.map(contact => {
      return ( <
        tr key = {
          contact.id
        } >
        <
        td > {
          contact.id
        } < /td> <td> {contact.title} </td > < td > {
          contact.Number
        } < /td>{" "} <
        td >
        <
        Button color = "success"
        size = "sm"
        className = "mr-2"
        onClick = {
          this.editContact.bind(
            this,
            contact.id,
            contact.title,
            contact.Number
          )
        } > {
          " "
        }
        Edit {
          " "
        } <
        /Button>{" "} <
        Button color = "danger"
        size = "sm"
        onClick = {
          this.deleteContact.bind(this, contact.id)
        } > {
          " "
        }
        Delete {
          " "
        } <
        /Button>{" "} < /
        td > {
          " "
        } <
        /tr>
      );
    });
    return ( <
      div className = "App container" >
      <
      h1 > contacts App < /h1> <
      Button className = "my-3"
      color = "primary"
      onClick = {
        this.toggleeditContactData.bind(this)
      } > {
        " "
      }
      Add contact {
        " "
      } <
      /Button> <
      Modal isOpen = {
        this.state.editContactData
      }
      toggle = {
        this.toggleeditContactData.bind(this)
      } >
      <
      ModalHeader toggle = {
        this.toggleeditContactData.bind(this)
      } > {
        " "
      }
      Add a new contact {
        " "
      } <
      /ModalHeader>{" "} <
      ModalBody >
      <
      FormGroup >
      <
      Label
      for = "title" > Title < /Label>{" "} <
      Input id = "title"
      value = {
        this.state.newContactsData.title
      }
      onChange = {
        e => {
          let {
            newContactsData
          } = this.state;

          newContactsData.title = e.target.value;

          this.setState({
            newContactsData
          });
        }
      }
      />{" "} < /
      FormGroup > {
        " "
      } <
      FormGroup >
      <
      Label
      for = "Number" > Number < /Label>{" "} <
      Input id = "Number"
      value = {
        this.state.newContactsData.Number
      }
      onChange = {
        e => {
          let {
            newContactsData
          } = this.state;

          newContactsData.Number = e.target.value;

          this.setState({
            newContactsData
          });
        }
      }
      />{" "} < /
      FormGroup > <
      /ModalBody>{" "} <
      ModalFooter >
      <
      Button color = "primary"
      onClick = {
        this.addContact.bind(this)
      } > {
        " "
      }
      Add contact {
        " "
      } <
      /Button>{" "} <
      Button color = "secondary"
      onClick = {
        this.toggleeditContactData.bind(this)
      } > {
        " "
      }
      Cancel {
        " "
      } <
      /Button>{" "} < /
      ModalFooter > {
        " "
      } <
      /Modal> <
      Modal isOpen = {
        this.state.editContactModal
      }
      toggle = {
        this.toggleEditContactModal.bind(this)
      } >
      <
      ModalHeader toggle = {
        this.toggleEditContactModal.bind(this)
      } > {
        " "
      }
      Edit a new contact {
        " "
      } <
      /ModalHeader>{" "} <
      ModalBody >
      <
      FormGroup >
      <
      Label
      for = "title" > Title < /Label>{" "} <
      Input id = "title"
      value = {
        this.state.editContactData.title
      }
      onChange = {
        e => {
          let {
            editContactData
          } = this.state;

          editContactData.title = e.target.value;

          this.setState({
            editContactData
          });
        }
      }
      />{" "} < /
      FormGroup > {
        " "
      } <
      FormGroup >
      <
      Label
      for = "Number" > Number < /Label>{" "} <
      Input id = "Number"
      value = {
        this.state.editContactData.Number
      }
      onChange = {
        e => {
          let {
            editContactData
          } = this.state;

          editContactData.Number = e.target.value;

          this.setState({
            editContactData
          });
        }
      }
      />{" "} < /
      FormGroup > <
      /ModalBody>{" "} <
      ModalFooter >
      <
      Button color = "primary"
      onClick = {
        this.updateContact.bind(this)
      } > {
        " "
      }
      Update contact {
        " "
      } <
      /Button>{" "} <
      Button color = "secondary"
      onClick = {
        this.toggleEditContactModal.bind(this)
      } > {
        " "
      }
      Cancel {
        " "
      } <
      /Button>{" "} < /
      ModalFooter > {
        " "
      } <
      /Modal> <
      Table >
      <
      thead >
      <
      tr >
      <
      th > # < /th> <th> Title </th > < th > Number < /th> <th> Actions </th > {
        " "
      } <
      /tr>{" "} < /
      thead > <
      tbody > {
        contacts
      } < /tbody>{" "} < /
      Table > {
        " "
      } <
      /div>
    );
  }
}

export default App;