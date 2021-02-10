import axios from "axios";

export class API_Service {
  baseUrl = "http://174.142.6.165:3000";
  auth_token = "";

  async start(user) {
    return await this.login(user);
  }

  async login(user) {
    await axios.post(`${this.baseUrl}/login`, user).then((resp) => {
      this.auth_token = resp.data;
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${this.auth_token}`;
        return config;
      });
    });
  }

  async getUserList() {
    let data;
    await axios.get(`${this.baseUrl}/api/frontend/userList`).then((resp) => {
      data = resp.data;
    });
    return data;
  }

  async getUserById(id) {
    let data;
    await axios.get(`${this.baseUrl}/api/frontend/doctors/${id}`).then((resp) => {
      data = resp.data;
    });
    return data;
  }

  async getPrescriptionList() {
    let data;
    await axios.get(`${this.baseUrl}/api/frontend/prescriptionList`).then((resp) => {
      data = resp.data;
    });
    return data;
  }
}
