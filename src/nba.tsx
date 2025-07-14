//this will be the requests in promise format, import this to your component and use the functions defined 
import axios from "axios"


async function getData(url: string){
    try{
        new Promise((resolve,reject) => {
            const response = await axios.get(url)
            
        })
    }
}