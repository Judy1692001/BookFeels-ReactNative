//API
import axios from "axios";
export const baseURL = "http://192.168.1.5:8000/";


export const RemoveFromBookShelf = async (userToken,bookTitle) => {
   try{
        const url = `${baseURL}api/bookshelf/remove/`;
        console.log("credintials", bookTitle);
       const response= await axios.post(
            url,
            { "title": bookTitle },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
            }
       );
       console.log('API response:', response.data);
        return response.data;
    }catch(err ){
        console.log("ERROR", err);
        throw err;
      }
  };