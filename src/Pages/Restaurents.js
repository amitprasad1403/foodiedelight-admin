import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Restaurents() {
    const navigate = useNavigate();
    const [restaurentList, setRestaurentlist] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const restaurentsList = async () => {
        const response = await fetch(`http://localhost:5000/api/restaurent/list`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        if (json.success) {
            setRestaurentlist(json.data);
        } else {
            console.log("Failed to fetch data");
        }
    };

    const handleEdit = (id) => {
        localStorage.setItem('restaurentEditId', id);
        navigate("/restaurent_edit");
    };

    const handleMenu = (id) => {
        localStorage.setItem('menuRestaurentId', id);
        navigate("/menu");
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/api/restaurent/delete/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        if (json.success) {
            toast.success(json.message);
            restaurentsList();
        } else {
            toast.error(json.message);
        }
    };

    useEffect(() => {
        restaurentsList();
    }, []);

    // Filter restaurentList based on searchQuery
    const filteredRestaurents = restaurentList.filter(resto =>
        resto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resto.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resto.phone_number.includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Restaurent List</h4>
                                    <input
                                        type="text"
                                        placeholder="🔍 Search restaurent"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="form-control mb-3"
                                        style={{width:`20%`,float:`right`}}
                                    />
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Phone Number</th>
                                                    <th>Rating</th>
                                                    <th>City</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredRestaurents.length > 0 ? (
                                                    filteredRestaurents.map((resto, index) => (
                                                        <tr key={index}>
                                                            <td className="py-1">
                                                                <img src={`http://localhost:5000/public/restaurents/${resto.image}`} alt="restaurant-logo" />
                                                            </td>
                                                            <td>
                                                                {resto.name}
                                                            </td>
                                                            <td>
                                                                {resto.phone_number}
                                                            </td>
                                                            <td>
                                                                {resto.ratings ? resto.ratings : '0'}⭐
                                                            </td>
                                                            <td>
                                                                {resto.city}
                                                            </td>
                                                            <td>
                                                                {resto.status === "Active" ? (
                                                                    <label className="badge badge-success">Active</label>
                                                                ) : (
                                                                    <label className="badge badge-danger">In-Active</label>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-inverse-primary btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="Edit" onClick={() => handleEdit(resto.restaurent_id)}>
                                                                    <i className="mdi mdi-lead-pencil"></i>
                                                                </button>
                                                                &emsp;
                                                                <button type="button" className="btn btn-inverse-info btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="Menu" onClick={() => handleMenu(resto.restaurent_id)}>
                                                                    <i className="mdi mdi-menu"></i>
                                                                </button>
                                                                &emsp;
                                                                <button type="button" className="btn btn-inverse-danger btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="Delete" onClick={() => handleDelete(resto.restaurent_id)}>
                                                                    <i className="mdi mdi-delete"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7">List not found.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
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
