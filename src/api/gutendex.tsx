import axios from "axios";

const KEY : string = process.env.REACT_APP_YOUTUBE_API_KEY || "";


export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/search',
  params:{
    part: 'snippet',
    maxResults: 20,
    key: KEY
  }
})