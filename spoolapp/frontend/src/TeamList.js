import  React, { Component } from  'react';
import  TeamService  from  './TeamService';

const  TeamService  =  new  TeamService();
class  TeamList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        teams: [],
        nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    teamService.getTeam().then(function (result) {
        console.log(result);
        self.setState({ teams:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,pk){
    var  self  =  this;
    teamService.deleteTeam({pk :  pk}).then(()=>{
        var  newArr  =  self.state.teams.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        self.setState({teams:  newArr})
    });
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
    teamService.getTeamByURL(this.state.nextPageURL).then((result) => {
        self.setState({ teams:  result.data, nextPageURL:  result.nextlink})
    });
}
render() {

    return (
        <div  className="teams--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Team availability</th>
                <th>Response times</th>
            </tr>
            </thead>
            <tbody>
            {this.state.teams.map( c  =>
                <tr  key={c.pk}>
                <td>{c.pk}  </td>
                <td>{c.team_name}</td>
                <td>{c.team_availability}</td>
                <td>{c.response_times}</td>
                <td>
                <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                <a  href={"/team/" + c.pk}> Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
  }
}
export  default  TeamList;  from  './TeamService';

const  teamService  =  new  TeamService();

class  TeamList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        teams: [],
        nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    teamService.getTeam().then(function (result) {
        console.log(result);
        self.setState({ teams:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,pk){
    var  self  =  this;
    teamService.deleteTeam({pk :  pk}).then(()=>{
        var  newArr  =  self.state.teams.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        self.setState({teams:  newArr})
    });
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
    teamService.getTeamByURL(this.state.nextPageURL).then((result) => {
        self.setState({ teams:  result.data, nextPageURL:  result.nextlink})
    });
}

render() {
    return (
        <div  className="team--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.teams.map( c  =>
                <tr  key={c.pk}>
                <td>{c.pk}  </td>
                <td>{c.first_name}</td>
                <td>{c.last_name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.address}</td>
                <td>{c.description}</td>
                <td>
                <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                <a  href={"/team/" + c.pk}> Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
  }
}
export  default  TeamList;