import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export default function MenuAdd() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        restaurent_id: localStorage.getItem('menuRestaurentId'),
        food_name: '',
        price: '',
        ratings: '',
        category: '', 
        file: null
    })
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate({ formData });
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            const response = await fetch(`http://localhost:5000/api/menu/addMenuFood`, {
                method: "POST",
                body: formDataToSend
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                console.log("Success");
                toast.success(json.message);
                navigate("/menu");
            } else {
                console.log("Failed");
                toast.error(json.message);
            }
        }
    }

    const validate = (values) => {
        console.log(values.formData)
        const errors = {};
        if (!values.formData.food_name) {
            errors.food_name = 'Name is required';
        }
        if (!values.formData.price) {
            errors.price = 'Price is required';
        }
        if (!values.formData.ratings) {
            errors.ratings = 'Rating is required';
        }
        if (!values.formData.category) {
            errors.category = 'Category is required';
        } 
        if (!values.formData.file) {
            errors.file = 'Image is required';
        }
        return errors;
    };

    useEffect(() => { 
    }, [])

    return (
        <>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add Menu Food</h4>
                                    <p className="card-description">
                                        Add menu food details
                                    </p>
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Name</label>
                                                <input type="text" className="form-control" name="food_name" id="exampleInputUsername1" placeholder="Name" onChange={handleChange} />
                                                {formErrors.food_name && <p style={{ color: 'red' }}>{formErrors.food_name}</p>}
                                            </div>

                                            <div className='col-md-3 form-group'>
                                                <label htmlFor="exampleInputUsername1">Price</label>
                                                <input type="number" className="form-control" name="price" id="exampleInputUsername1" placeholder="Price" onChange={handleChange} />
                                                {formErrors.price && <p style={{ color: 'red' }}>{formErrors.price}</p>}
                                            </div>

                                            <div className='col-md-3 form-group'>
                                                <label htmlFor="exampleInputEmail1">Ratings</label>
                                                <select className="form-control" name="ratings" value={formData.ratings} onChange={handleChange}>
                                                    <option value="">Select Rating</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                                {formErrors.ratings && <p style={{ color: 'red' }}>{formErrors.ratings}</p>}
                                            </div>

                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputEmail1">Category</label>
                                                <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
                                                    <option value="">Select Category</option>
                                                    <option value="Biryani">Biryani</option>
                                                    <option value="Chicken">Chicken</option>
                                                    <option value="Pizza">Pizza</option>
                                                    <option value="Burger">Burger</option>
                                                    <option value="Pasta">Pasta</option>
                                                    <option value="Chinese">Chinese</option>
                                                    <option value="Rolls">Rolls</option>
                                                    <option value="Indian">Indian</option>
                                                </select>
                                                {formErrors.category && <p style={{ color: 'red' }}>{formErrors.category}</p>}
                                            </div> 

                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputEmail1">Image</label>
                                                <input type="file" className="form-control" name="file" id="exampleInputEmail1" onChange={handleChange} />
                                                {formErrors.file && <p style={{ color: 'red' }}>{formErrors.file}</p>}
                                            </div>

                                        </div>  
                                        <button type="submit" className="btn btn-warning mr-2">Submit</button>
                                        <Link to="/menu"><button className="btn btn-light">Cancel</button></Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
