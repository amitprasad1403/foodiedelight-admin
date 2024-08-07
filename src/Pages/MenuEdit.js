import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export default function MenuEdit() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        food_name: '',
        price: '',
        ratings: '',
        category: '',
        status: '',
        food_image: '',
        file: null
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const getMenuFood = async () => {
        const menuEditId = localStorage.getItem('menuEditId');
        const response = await fetch(`http://localhost:5000/api/menu/getMenu/${menuEditId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        if (json.success) {
            setFormData({
                food_name: json.data.food_name,
                price: json.data.price,
                ratings: json.data.ratings,
                category: json.data.category,
                status: json.data.status,
                food_image: json.data.food_image,
                file: null
            });
        } else {
            console.log(json.message);
        }
    };

    const updateMenu = async (e) => {
        e.preventDefault();

        const errors = validate(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            const menuEditId = localStorage.getItem('menuEditId');
            const response = await fetch(`http://localhost:5000/api/menu/update/${menuEditId}`, {
                method: "POST",
                body: formDataToSend
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                toast.success(json.message);
                navigate("/menu");
            } else {
                toast.error(json.message);
            }
        }
    };

    const validate = (values) => {
        const errors = {};
        if (!values.food_name) {
            errors.food_name = 'Name is required';
        }
        if (!values.price) {
            errors.price = 'Price is required';
        }
        if (!values.ratings) {
            errors.ratings = 'Rating is required';
        }
        if (!values.category) {
            errors.category = 'Category is required';
        }
        if (!values.file && !values.food_image) {
            errors.file = 'Image is required';
        }
        return errors;
    };

    useEffect(() => {
        getMenuFood();
    }, []);

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Update Menu Food</h4>
                                    <p className="card-description">Update menu food details</p>
                                    <form className="forms-sample" onSubmit={updateMenu}>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="food_name">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="food_name"
                                                    id="food_name"
                                                    placeholder="Name"
                                                    value={formData.food_name}
                                                    onChange={handleChange}
                                                />
                                                {formErrors.food_name && <p style={{ color: 'red' }}>{formErrors.food_name}</p>}
                                            </div>

                                            <div className="col-md-3 form-group">
                                                <label htmlFor="price">Price</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="price"
                                                    id="price"
                                                    placeholder="Price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                />
                                                {formErrors.price && <p style={{ color: 'red' }}>{formErrors.price}</p>}
                                            </div>

                                            <div className="col-md-3 form-group">
                                                <label htmlFor="ratings">Ratings</label>
                                                <select
                                                    className="form-control"
                                                    name="ratings"
                                                    id="ratings"
                                                    value={formData.ratings}
                                                    onChange={handleChange}
                                                >
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

                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="category">Category</label>
                                                <select
                                                    className="form-control"
                                                    name="category"
                                                    id="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                >
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
                                            <div className="col-md-3 form-group">
                                                <label htmlFor="status">Status</label>
                                                <select
                                                    className="form-control"
                                                    name="status"
                                                    id="status"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="In-Active">In-Active</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="file">Image</label>
                                                {formData.food_image && (
                                                    <div className="py-1">
                                                        <img
                                                            src={`http://localhost:5000/public/menu/${formData.food_image}`}
                                                            alt="menu-image"
                                                            style={{ width: '150px', height: '100px', borderRadius: '10%' }}
                                                        />
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="file"
                                                    id="file"
                                                    onChange={handleChange}
                                                />
                                                {formErrors.file && <p style={{ color: 'red' }}>{formErrors.file}</p>}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-warning mr-2">Update</button>
                                        <Link to="/menu"><button type="button" className="btn btn-light">Cancel</button></Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
