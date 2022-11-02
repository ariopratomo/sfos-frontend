import React,{useState,useEffect} from "react";


import FoodService from "../../services/food.service";

const FoodList = () =>
{
  const [foods, setFoods] = useState([]);
  
 const  getFoodList = async () =>
  {
    const response = await FoodService.getFoodList();
    console.log(response);
  }

  useEffect(() =>
  {
    getFoodList();
  }
  , []);

  return ( 
    <>  </>
  )

}

export default FoodList;