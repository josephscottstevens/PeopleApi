import React from 'react'

// people : List { title : String, email_address : String, display_name : String }
class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      people: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/people")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            people: JSON.parse(result)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      )
  }

  renderRow(person) {
    const divStyle = {
      textAlign: "center"
    };
    return (
      <div style={divStyle} className="row">
        <div className="col-sm-4">{person.title}</div>
        <div className="col-sm-4">{person.email_address}</div>
        <div className="col-sm-4">{person.display_name}</div>
      </div>
    )
  }

  renderHeader() {
    const divStyle = {
      textAlign: "center",
      fontWeight: "bold"
    };
    return (
      <div style={divStyle} className="row">
        <div className="col-sm-4">Title</div>
        <div className="col-sm-4">Email Address</div>
        <div className="col-sm-4">Display Name</div>
      </div>
    )
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(typeof (this.state.people));
      console.log(this.state.people);
      return (
        <div className="container-fluid">
          {this.renderHeader()}
          {this.state.people.map(this.renderRow)}
        </div>
      );
    }
  }
}
export default People;