import React from "react";

import authHeader from "./auth-header";

import MiddleWareService from "../services/middleware.service";
import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class FoodService
{
  async getFoodList()
  {
    const response = await axios.get(API_URL + "food", { headers: authHeader() }).then((response) =>
    {
      return response.data;
    }).catch((error) =>
    {
      return error;
    });
  }
  
  // create food
  async createFood(data)
  {
    const response = await axios.post(API_URL + "food", data, { headers: authHeader() }).then((response) =>
    {
      return response.data;
    }).catch((error) =>
    {
      return error;
    });
  }

  async getCategoryList()
  {
    const response = await axios.get(API_URL + "category", { headers: authHeader() });
    return response.data;
  }
}

export default new FoodService();