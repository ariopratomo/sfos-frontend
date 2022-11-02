import React,{useEffect, useState} from "react";

import { useNavigate } from "react-router-dom";

import FoodService from "../../services/food.service";

const FoodCreate = () =>
{
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategoryList = async () =>
  {
    const response = await FoodService.getCategoryList();
    return response;
  }

  useEffect(() =>
  {
    getCategoryList().then((data) =>
    {
      console.log(data.data);
      setCategories(data.data);
    });

  }, []);

  const handleCreateFood = async (e) =>
  {
    e.preventDefault();
    // random image url from picsum
    let imageUrl = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 100)}`;
    let food = {
      name: name,
      price: price,
      description: description,
      image: imageUrl,
      status: status,
      category_id: category
    }
    const response = await FoodService.createFood(food);
    console.log(response);
  }



  return (<>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-container border-0">
            <form onSubmit={handleCreateFood}>
              {
                message && ( <div className="form-group"> <div className="alert alert-success" role="alert"> {message} </div> </div> ) 
              }
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="text" className="form-control" id="price" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="text" className="form-control" id="image" placeholder="Enter image" value={image} onChange={(e) => setImage(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((category) =>
                  {
                    return (<option key={category.id} value={category.id}>{category.name}</option>);
                  })}
                </select>
              </div>
              {/* status */}
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
                {
                  loading ? <div className="spinner-border text-primary" role="status"> <span className="sr-only">Loading...</span> </div> : <button type="submit" className="btn btn-primary">Submit</button>
                }
            </form>
          </div>
        </div>
      </div>
    </div>
  </>)

  
}

export default FoodCreate;