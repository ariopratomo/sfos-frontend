import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8000/api/';

class middlewareService
{
  async can(permission)
  {
    const response = await axios
      .post(API_URL + 'permission', {
        permission
        }, { headers: authHeader() });
    return response.data;
  }
}

export default new middlewareService();