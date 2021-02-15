import axios from 'axios';
const API_URL = 'http://localhost:8000';


export default class TeamService{

    constructor(){}


    getTeam() {
        const url = `${API_URL}/api/team/`;
        return axios.get(url).then(response => response.data);
    }
    getTeamByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getTeam(pk) {
        const url = `${API_URL}/api/team/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteTeam(team){
        const url = `${API_URL}/api/team/${team.pk}`;
        return axios.delete(url);
    }
    createTeam(team){
        const url = `${API_URL}/api/team/`;
        return axios.post(url,team);
    }
    updateTeam(team){
        const url = `${API_URL}/api/team/${team.pk}`;
        return axios.put(url,team);
    }
}