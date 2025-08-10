//this will be the requests in promise format, import this to your component and use the functions defined 
import axios from "axios"

function getTeamStats(teamUrl: string){
    const response = axios.get(teamUrl)
    response
    .then(result => {
        return console.log(result)
    })
    .catch(error => {
        return console.log(error)
    })
}

export default getTeamStats

getTeamStats('https://ghibliapi.herokuapp.com')