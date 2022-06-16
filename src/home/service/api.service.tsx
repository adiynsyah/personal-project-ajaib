import axios from "axios";


export default class ApiService {
  public getData(param: string) {
    return axios.get(`https://randomuser.me/api/?results=10&pageSize=5${param}`)
      .then(resp => {
        return resp.data
      })
      .catch(err => console.error(err));
  }

}
