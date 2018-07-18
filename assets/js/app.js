import "phoenix_html"
import React from 'react'
import ReactDOM from 'react-dom'

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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
    // For Testing
    //const people = JSON.parse("[{\"title\":\"Direct Security Representative\",\"email_address\":\"isnaoj_nathz@ihooberbrunner.net\",\"display_name\":\"Marisa Casper\"},{\"title\":\"International Usability Agent\",\"email_address\":\"mamixe@lindgren.info\",\"display_name\":\"Griffin Hand\"},{\"title\":\"Global Solutions Technician\",\"email_address\":\"george_aiegwnd@boyer.name\",\"display_name\":\"Mikel Reynolds\"},{\"title\":\"Dynamic Operations Planner\",\"email_address\":\"enoch.kenlieg@beahandooley.com\",\"display_name\":\"Deshaun Baumbach\"},{\"title\":\"Direct Functionality Orchestrator\",\"email_address\":\"jrrey@glover.co\",\"display_name\":\"Meta Pfannerstill\"},{\"title\":\"District Markets Technician\",\"email_address\":\"athena@schroeder.net\",\"display_name\":\"Ivah Rutherford\"},{\"title\":\"International Integration Planner\",\"email_address\":\"tmohas@feestwyman.io\",\"display_name\":\"Charlotte Reynolds\"},{\"title\":\"National Research Consultant\",\"email_address\":\"nntwoa@roberts.co\",\"display_name\":\"Ivah Denesik\"},{\"title\":\"Legacy Configuration Engineer\",\"email_address\":\"dulhe.cilll@reichert.biz\",\"display_name\":\"Lula Kiehn\"},{\"title\":\"Human Usability Technician\",\"email_address\":\"miwnie_nisozk@damore.net\",\"display_name\":\"Durward Lindgren\"},{\"title\":\"Regional Creative Facilitator\",\"email_address\":\"baomi.keenler@okon.org\",\"display_name\":\"Madyson Rodriguez\"},{\"title\":\"Internal Division Director\",\"email_address\":\"ercik@lubowitz.name\",\"display_name\":\"Myrl Sawayn\"},{\"title\":\"Investor Paradigm Officer\",\"email_address\":\"cajkeline@lemke.co\",\"display_name\":\"Cassandra Lebsack\"},{\"title\":\"Corporate Usability Facilitator\",\"email_address\":\"raa_beetty@quigley.info\",\"display_name\":\"Jerod Lowe\"},{\"title\":\"Lead Applications Planner\",\"email_address\":\"an@redhettingerkohler.com\",\"display_name\":\"Sheridan Bogisich\"},{\"title\":\"Lead Branding Architect\",\"email_address\":\"kanira@heaney.biz\",\"display_name\":\"Ignacio Bayer\"},{\"title\":\"Chief Accountability Representative\",\"email_address\":\"camron.nisolac@harber.co\",\"display_name\":\"Demond Weber\"},{\"title\":\"Legacy Intranet Developer\",\"email_address\":\"madison@dubuque.name\",\"display_name\":\"Alene Gleason\"},{\"title\":\"District Interactions Analyst\",\"email_address\":\"anesl.howe@padbergbins.info\",\"display_name\":\"Jermey Bruen\"},{\"title\":\"National Infrastructure Manager\",\"email_address\":\"odrthy@flatley.biz\",\"display_name\":\"Luciano Stracke\"},{\"title\":\"Direct Optimization Producer\",\"email_address\":\"jncksoa@sawayn.com\",\"display_name\":\"Joesph Medhurst\"},{\"title\":\"National Program Executive\",\"email_address\":\"ke_nruel@rauward.info\",\"display_name\":\"Leonardo Breitenberg\"},{\"title\":\"Central Assurance Administrator\",\"email_address\":\"alna@hirthe.biz\",\"display_name\":\"Keagan Tromp\"},{\"title\":\"Dynamic Markets Administrator\",\"email_address\":\"rmia@mertzrath.info\",\"display_name\":\"Henriette Nikolaus\"},{\"title\":\"Regional Markets Associate\",\"email_address\":\"lauernce_ward@wittingkuhic.org\",\"display_name\":\"Janessa Considine\"}]");

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

ReactDOM.render(
  <People></People >,
  document.getElementById('root')
);