import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";


const Order = () =>
{

  const [foodList, setFoodList] = useState([]);
  const [foodImage, setFoodImage] = useState([]);
  const [loading, setLoading] = useState(true);

  const [orderList, setOrderList] = useState([]);

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  const [showOrder, setShowOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);





  const getFoodList = async () =>
  {
    let foodArr = [];
    for (let i = 0; i < 16; i++)
    {
      let response = await axios.get("https://foodish-api.herokuapp.com/api/");
      // random price range 10000 - 50000
      let randomPrice = Math.floor(Math.random() * 40000) + 10000;
      // random food name
      let randomFoodName = Math.random().toString(36).substring(7);
      let food = {
        image: response.data.image,
        price: randomPrice,
        name: randomFoodName
      }

      foodArr.push(food);
    }
    return foodArr;
  };

  useEffect(() =>
  {
    const user = AuthService.getCurrentUser();
    if (!user)
    {
      navigate("/login");
    }

    getFoodList().then((data) =>
    {
      // merge foodList and OrderList
      let mergedList = data.map((food) =>
      {
        return {
          ...food,
          order: 0
        }

      });
      setFoodList(mergedList);
      // setFoodList(data);
      setLoading(false);
    });
  }, [navigate]);

  const clickFood = (name, image, price) =>
  {
    let qty = 1;
    let order = {
      name: name,
      image: image,
      price: price,
      qty: qty
    }
    // check if order already exist
    let orderExist = orderList.find((order) => order.name === name);
    if (orderExist)
    {
      // increase qty
      orderExist.qty += 1;
      // increase price
      orderExist.price += price;
      // update order list
      setOrderList([...orderList]);
      setTotalPrice(totalPrice + price);
      // update food list
      let foodExist = foodList.find((food) => food.name === name);
      foodExist.order += 1;
      setFoodList([...foodList]);
    }
    else
    {
      // add new order
      setOrderList([...orderList, order]);
      setTotalPrice(totalPrice + price);
      // update food list
      let foodExist = foodList.find((food) => food.name === name);
      foodExist.order += 1;
      setFoodList([...foodList]);

    }
    setShowOrder(true);

  }

  const toIdr = (price) =>
  {
    return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }

  const removeOrder = (name, price) =>
  {
    let orderExist = orderList.find((order) => order.name === name);
    if (orderExist)
    {
      // decrease qty
      orderExist.qty -= 1;
      // decrease price
      orderExist.price -= price;
      // update order list
      setOrderList([...orderList]);
      setTotalPrice(totalPrice - price);
      // update food list
      let foodExist = foodList.find((food) => food.name === name);
      foodExist.order -= 1;
      setFoodList([...foodList]);
    }

    if (orderExist.qty === 0)
    {
      let newOrderList = orderList.filter((order) => order.name !== name);
      setOrderList(newOrderList);

      if (newOrderList.length === 0)
      {
        setShowOrder(false);
      }
    }

  }



  return (
    <div className="row">
      <div className="col-md-7">
        {loading ? (
          <div className="row">
            {/* for 8x */}
            {[...Array(8)].map((x, i) =>
              <div className="col-md-4" key={i}>
                <div className="card mb-4 shadow-sm">
                  <Skeleton height={150} />
                  <div className="card-body">
                    <Skeleton height={20} />
                  </div>
                </div>
              </div>
            )}
          </div>

        ) : (
          <div className="container">
            <div className="row">
              {foodList.map((food, index) => (
                <div className="col-4 pt-3" key={index}  >
                  <div className="card" onClick={() => clickFood(food.name, food.image, food.price)}>
                    {/* food image */}
                    <img src={food.image} height="150" alt="..." />
                    <div className="card-body text-center p-2">
                      <strong className="card-title">{food.name}</strong>
                      <p className="card-text">{toIdr(food.price)}</p>
                    </div>
                  </div>
                  {
                    food.order > 0 && (
                      <div className="card border-0">
                        
                      <div className="row m-0">
                        <div className="col-3">
                          <button className="btn btn-sm btn-danger" onClick={() => removeOrder(food.name, food.price)}>-</button>
                        </div>
                        <div className="col-6">
                          <p className="text-center">{food.order}</p>
                          </div>
                        <div className="col-3">
                          <button className="btn btn-sm btn-success" onClick={() => clickFood(food.name, food.image, food.price)}>+</button>
                        </div>
                      </div>
                      </div>
                    )
                  }

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="col-md-5 pl-0">
        {showOrder && (
          <div className="card">
            <div className="card-header">
              <h5>Order List</h5>
            </div>
            <div className="card-body">
              {orderList.map((order, index) => (
                <div className="row m-0 py-2" key={index}>
                  <div className="col-4 align-self-center">
                    <img src={order.image} height="60" width="60" alt="..." />
                  </div>
                  <div className="col-8 pl-0">
                    <div className="row">
                      <div className="col-12">
                        <strong>{order.name}</strong>
                      </div>
                      <div className="col-12">
                        <small>{toIdr(order.price)}</small>
                      </div>
                    </div>
                  </div>


                </div>
              ))}

              <hr />
              <div className="row">
                <div className="col-6">
                  <strong>Total</strong>
                </div>
                <div className="col-6 text-right">
                  <strong>{toIdr(totalPrice)}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;