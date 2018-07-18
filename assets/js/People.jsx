import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPeople, showNone, showUniqueCharacters, showPossibleDuplicates } from './peopleActions.js'

class People extends React.Component {
  componentDidMount() {
    this.props.getPeople();
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
      <div key="-2" style={divStyle} className="row">
        <div className="col-sm-4">Title</div>
        <div className="col-sm-4">Email Address</div>
        <div className="col-sm-4">Display Name</div>
      </div>
    )
  }

  render() {
    const { error, people, isLoaded, showNoneClick, showUniqueCharactersClick, showPossibleDuplicatesClick } = this.props
    const btnStyle = {
      marginBottom: "12px",
      marginRight: "8px"
    };
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="container-fluid">
          <div key="-1" className="row">
            <button style={btnStyle} type="button" onClick={showNoneClick} className="btn btn-primary">Show None</button>
            <button style={btnStyle} type="button" onClick={showUniqueCharactersClick} className="btn btn-default">Show Unique Characters</button>
            <button style={btnStyle} type="button" onClick={showPossibleDuplicatesClick} className="btn btn-default">Show Unique Characters</button>
          </div>

          {this.renderHeader()}
          {people.map(this.renderRow)}
        </div>
      );
    }
  }
}

People.propTypes = {
  error: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired,
  people: PropTypes.array.isRequired,
  show: PropTypes.string.isRequired,
  showNoneClick: PropTypes.func.isRequired,
  showUniqueCharactersClick: PropTypes.func.isRequired,
  showPossibleDuplicatesClick: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLoaded: state.isLoaded,
  error: state.error,
  people: state.people,
  show: state.show,
});

const mapDispatchToProps = dispatch => ({
  getPeople: () => dispatch(getPeople()),
  showNoneClick: () => dispatch(showNone()),
  showUniqueCharactersClick: () => dispatch(showUniqueCharacters()),
  showPossibleDuplicatesClick: () => dispatch(showPossibleDuplicates())
})

export default connect(mapStateToProps, mapDispatchToProps)(People);