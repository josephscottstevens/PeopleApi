import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPeople, showNone, showUniqueCharacters, showPossibleDuplicates, selectRow } from './peopleActions.js'
import { countCharacters, listPossibleDupes } from "./functions.js"

class People extends React.Component {
  componentDidMount() {
    this.props.getPeople();
  }

  renderRow(person) {
    const backgroundColor = (this.props.rowId === person.id) ? "#eee" : "white";
    const divStyle = {
      textAlign: "center",
      backgroundColor: backgroundColor
    };
    return (
      <div key={person.id} style={divStyle} className="row tableRow" onClick={() => this.props.selectRowClick(person.id)}>
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

  renderTable(domId = "", headers = [], rows = []) {
    const bodyHelper = (t) => {
      return (<tr key={t[0]}>
        <td>{t[0]}</td>
        <td>{t[1]}</td>
      </tr>);
    }
    const headerHelper = (t) => {
      return (<th key={t}>{t}</th>);
    }
    return (
      <table key={domId} id={domId}>
        <thead>
          <tr>
            {headers.map(headerHelper)}
          </tr>
        </thead>
        <tbody>
          {rows.map(bodyHelper)}
        </tbody>
      </table>
    );
  }

  renderDetails() {
    if (this.props.show == "UNIQUE_CHARACTERS") {
      if (!this.props.rowId) return <h4>Please select a person</h4>;
      const person = this.props.people.find(t => t.id == this.props.rowId);
      const entries = countCharacters(person.email_address);
      return (this.renderTable("peopleTable", ["Character", "Count"], entries));
    } else if (this.props.show == "POSSIBLE_DUPLICATES") {
      const emails = this.props.people.map(t => t.email_address);
      //emails.push("miwnie_nisozz@damore.net"); // For testing
      const possibleDupes = listPossibleDupes(emails, 2);
      return (this.renderTable("peopleTable", ["Possible Duplicates", ""], possibleDupes));
    } else {
      return <div></div>;
    }
  }

  render() {
    const { error, people, isLoaded, show, showNoneClick, showUniqueCharactersClick, showPossibleDuplicatesClick } = this.props

    const btnStyle = {
      marginBottom: "12px",
      marginRight: "8px"
    };
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      const btnClass = (t) => {
        if (t === this.props.show) return "btn btn-primary"
        else return "btn btn-default"
      }
      return (
        <div className="container-fluid">
          <div className="col-sm-8">
            <div key="-1" className="row">
              <button style={btnStyle} type="button" onClick={showNoneClick} className={btnClass("NONE")}>Show None</button>
              <button style={btnStyle} type="button" onClick={showUniqueCharactersClick} className={btnClass("UNIQUE_CHARACTERS")}>Show Unique Characters</button>
              <button style={btnStyle} type="button" onClick={showPossibleDuplicatesClick} className={btnClass("POSSIBLE_DUPLICATES")}>Show Possible Duplicates</button>
              <a id="toggleLink" href="./elm">Elm Version</a>
            </div>

            {this.renderHeader()}
            {people.map(t => this.renderRow(t))}
          </div>
          <div className="col-sm-4">
            {this.renderDetails()}
          </div>

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
  rowId: PropTypes.number,
  showNoneClick: PropTypes.func.isRequired,
  showUniqueCharactersClick: PropTypes.func.isRequired,
  showPossibleDuplicatesClick: PropTypes.func.isRequired,
  selectRowClick: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLoaded: state.isLoaded,
  error: state.error,
  people: state.people,
  show: state.show,
  rowId: state.rowId
});

const mapDispatchToProps = dispatch => ({
  getPeople: () => dispatch(getPeople()),
  showNoneClick: () => dispatch(showNone()),
  showUniqueCharactersClick: () => dispatch(showUniqueCharacters()),
  showPossibleDuplicatesClick: () => dispatch(showPossibleDuplicates()),
  selectRowClick: rowId => dispatch(selectRow(rowId))
})

export default connect(mapStateToProps, mapDispatchToProps)(People);