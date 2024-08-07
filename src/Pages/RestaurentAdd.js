import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export default function RestaurentAdd() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ 
        resto_name: '',
        short_desc: '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        file:null
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
    
            const response = await fetch(`http://localhost:5000/api/restaurent/addRestaurent`, {
                method: "POST",
                body: formDataToSend
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                console.log("Success");
                toast.success(json.message);
                navigate("/restaurents");
            } else {
                console.log("Failed");
                toast.error(json.message);
            }
        }
    }

    const validate = (values) => {
        console.log(values.formData)
        const errors = {};
        if (!values.formData.resto_name) {
            errors.resto_name = 'Name is required';
        }
        if (!values.formData.short_desc) {
            errors.short_desc = 'Short desc is required';
        }
        if (!values.formData.phone_number) {
            errors.phone_number = 'Phone number is required';
        }
        if (!values.formData.address) {
            errors.address = 'Address is required';
        }
        if (!values.formData.state) {
            errors.state = 'State is required';
        }
        if (!values.formData.city) {
            errors.city = 'City is required';
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
                                    <h4 className="card-title">Add Restaurent</h4>
                                    <p className="card-description">
                                        Add restaurent details
                                    </p>
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Name</label>
                                                <input type="text" className="form-control" name="resto_name" id="exampleInputUsername1" placeholder="Name" onChange={handleChange} />
                                                {formErrors.resto_name && <p style={{ color: 'red' }}>{formErrors.resto_name}</p>}
                                            </div>
                                            
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Short Description</label>
                                                <input type="text" className="form-control" name="short_desc" id="exampleInputUsername1" placeholder="Short Description" onChange={handleChange} />
                                                {formErrors.short_desc && <p style={{ color: 'red' }}>{formErrors.short_desc}</p>}
                                            </div>
                                            
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Phone Number</label>
                                                <input type="text" className="form-control" name="phone_number" id="exampleInputUsername1" placeholder="Phone Number" onChange={handleChange} />
                                                {formErrors.phone_number && <p style={{ color: 'red' }}>{formErrors.phone_number}</p>}
                                            </div>
                                            
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputEmail1">Address</label>
                                                <input type="text" className="form-control" name="address" id="exampleInputEmail1" placeholder="Address" onChange={handleChange} />
                                                {formErrors.address && <p style={{ color: 'red' }}>{formErrors.address}</p>}
                                            </div> 
                                            
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">State</label>
                                                <input type="text" className="form-control" name="state" id="exampleInputUsername1" placeholder="State" onChange={handleChange} />
                                                {formErrors.state && <p style={{ color: 'red' }}>{formErrors.state}</p>}
                                            </div>
                                            
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputEmail1">City</label>
                                                <input type="text" className="form-control" name="city" id="exampleInputEmail1" placeholder="City" onChange={handleChange} />
                                                {formErrors.city && <p style={{ color: 'red' }}>{formErrors.city}</p>}
                                            </div> 
                                            
                                        </div>
                                        <div className='row'> 
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputEmail1">Image</label>
                                                <input type="file" className="form-control" name="file" id="exampleInputEmail1" onChange={handleChange} />
                                                {formErrors.file && <p style={{ color: 'red' }}>{formErrors.file}</p>}
                                            </div>
                                            
                                        </div>
                                        <button type="submit" className="btn btn-warning mr-2">Submit</button>
                                        <Link to="/restaurents"><button className="btn btn-light">Cancel</button></Link>
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
