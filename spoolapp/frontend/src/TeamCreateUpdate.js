import React, { Component } from 'react';
import  TeamService  from  './TeamService';

const teamTervice = new TeamService();

class TeamCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
            teamTervice.getTeam(params.pk).then((c)=>{
            this.refs.team_name.value = c.first_name;
            this.refs.team_availability.value = c.last_name;
            this.refs.response_times.value = c.email;
          })
        }
      }

      handleCreate(){
        customersService.createCustomer(
          {
            "team_name": this.refs.team_name.value,
            "team_availability": this.refs.team_availability.value,
            "response_times": this.refs.response_times.value,
        }
        ).then((result)=>{
          alert("Customer created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        customersService.updateCustomer(
          {
            "pk": pk,
            "team_name": this.refs.team_name.value,
            "team_availability": this.refs.team_availability.value,
            "response_times": this.refs.response_times.value,
        }
        ).then((result)=>{
          console.log(result);
          alert("Customer updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Team Name:</label>
              <input className="form-control" type="text" ref='team_name' />

            <label>
              Team Availability:</label>
              <input className="form-control" type="text" ref='team_availability'/>

            <label>
              Response Times:</label>
              <input className="form-control" type="text" ref='response_times' />
            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }
}

export default TeamCreateUpdate;