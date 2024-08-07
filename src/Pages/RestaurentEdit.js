import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export default function RestaurentEdit() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        resto_name: '',
        short_desc: '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        ratings: '',
        status: '',
        image: '',
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

    const getRestaurent = async () => {
        const restaurentId = localStorage.getItem('restaurentEditId');
        const response = await fetch(`http://localhost:5000/api/restaurent/get/${restaurentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        if (json.success) {
            setFormData({
                resto_name: json.data.name,
                short_desc: json.data.short_desc,
                phone_number: json.data.phone_number,
                address: json.data.address,
                city: json.data.city,
                state: json.data.state,
                ratings: json.data.ratings,
                status: json.data.status,
                image: json.data.image,
                file: null
            });
        } else {
            console.log(json.message);
        }
    };

    const updateRestaurent = async (e) => {
        e.preventDefault();

        const errors = validate(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            const restaurentId = localStorage.getItem('restaurentEditId');
            const response = await fetch(`http://localhost:5000/api/restaurent/update/${restaurentId}`, {
                method: "POST",
                body: formDataToSend
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                toast.success(json.message);
                navigate("/restaurents");
            } else {
                toast.error(json.message);
            }
        }
    };

    const validate = (values) => {
        const errors = {};
        if (!values.resto_name) {
            errors.resto_name = 'Name is required';
        }
        if (!values.short_desc) {
            errors.short_desc = 'Short desc is required';
        }
        if (!values.phone_number) {
            errors.phone_number = 'Phone number is required';
        }
        if (!values.address) {
            errors.address = 'Address is required';
        }
        if (!values.state) {
            errors.state = 'State is required';
        }
        if (!values.city) {
            errors.city = 'City is required';
        }
        if (!values.file && !values.image) {
            errors.file = 'Image is required';
        }
        return errors;
    };

    useEffect(() => {
        getRestaurent();
    }, []);

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Update Restaurant</h4>
                                    <p className="card-description">
                                        Update restaurant details
                                    </p>
                                    <form className="forms-sample" onSubmit={updateRestaurent}>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Name</label>
                                                <input type="text" className="form-control" name="resto_name" id="exampleInputUsername1" placeholder="Name" value={formData.resto_name} onChange={handleChange} />
                                                {formErrors.resto_name && <p style={{ color: 'red' }}>{formErrors.resto_name}</p>}
                                            </div>

                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Short Description</label>
                                                <input type="text" className="form-control" name="short_desc" id="exampleInputUsername1" placeholder="Short Description" value={formData.short_desc} onChange={handleChange} />
                                                {formErrors.short_desc && <p style={{ color: 'red' }}>{formErrors.short_desc}</p>}
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Phone Number</label>
                                                <input type="text" className="form-control" name="phone_number" id="exampleInputUsername1" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} />
                                                {formErrors.phone_number && <p style={{ color: 'red' }}>{formErrors.phone_number}</p>}
                                            </div>

                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputEmail1">Address</label>
                                                <input type="text" className="form-control" name="address" id="exampleInputEmail1" placeholder="Address" value={formData.address} onChange={handleChange} />
                                                {formErrors.address && <p style={{ color: 'red' }}>{formErrors.address}</p>}
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-3 form-group'>
                                                <label htmlFor="exampleInputUsername1">State</label>
                                                <input type="text" className="form-control" name="state" id="exampleInputUsername1" placeholder="State" value={formData.state} onChange={handleChange} />
                                                {formErrors.state && <p style={{ color: 'red' }}>{formErrors.state}</p>}
                                            </div>

                                            <div className='col-md-3 form-group'>
                                                <label htmlFor="exampleInputEmail1">City</label>
                                                <input type="text" className="form-control" name="city" id="exampleInputEmail1" placeholder="City" value={formData.city} onChange={handleChange} />
                                                {formErrors.city && <p style={{ color: 'red' }}>{formErrors.city}</p>}
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
                                            </div>
                                            <div className='col-md-3 form-group'>
                                                <label htmlFor="exampleInputEmail1">Status</label>
                                                <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
                                                    <option value="">Select Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="In-Active">In-Active</option> 
                                                </select>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputEmail1">Image</label> 
                                                {formData.image && (
                                                    <div className='py-1'>
                                                        <img src={`http://localhost:5000/public/restaurents/${formData.image}`} alt="restaurant-logo" style={{ width: '150px', height: '100px', borderRadius: '10%' }} />
                                                    </div>
                                                )}
                                                <input type="file" className="form-control" name="file" id="exampleInputEmail1" onChange={handleChange} />
                                                {formErrors.file && <p style={{ color: 'red' }}>{formErrors.file}</p>}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-warning mr-2">Update</button>
                                        <Link to="/restaurents"><button type="button" className="btn btn-light">Cancel</button></Link>
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
