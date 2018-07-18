import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPeople } from './peopleActions.js'

class People extends React.Component {
  componentDidMount() {
    this.props.dispatch(getPeople());
  }

  renderRow(person) {
    const divStyle = {
      textAlign: "center"
    };
    return (
      <div key={person.id} style={divStyle} className="row">
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
      <div key="0" style={divStyle} className="row">
        <div className="col-sm-4">Title</div>
        <div className="col-sm-4">Email Address</div>
        <div className="col-sm-4">Display Name</div>
      </div>
    )
  }

  render() {
    const { error, people, isLoaded } = this.props
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="container-fluid">
          {this.renderHeader()}
          {people.map(this.renderRow)}
        </div>
      );
    }
  }
}
//{ error: null, isLoaded: false, people: [] }
People.propTypes = {
  error: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired,
  people: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  isLoaded: state.isLoaded,
  error: state.error,
  people: state.people
});

export default connect(mapStateToProps)(People);