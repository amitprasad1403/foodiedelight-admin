import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Menu() {
    const navigate = useNavigate();

    const [menuList, setMenulist] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const menuFoodList = async () => {
        const restaurentId = localStorage.getItem('menuRestaurentId');
        const response = await fetch(`http://localhost:5000/api/menu/list/${restaurentId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        if (json.success) {
            setMenulist(json.data);
        } else {
            console.log("Failed to fetch data");
        }
    };

    const handleEdit = (id) => {
        localStorage.setItem('menuEditId', id);
        navigate("/menu_edit");
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/api/menu/delete/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        if (json.success) {
            toast.success(json.message);
            menuFoodList();
        } else {
            toast.error(json.message);
        }
    };

    useEffect(() => {
        menuFoodList();
    }, []);

    // Filter menuList based on searchQuery
    const filteredMenuList = menuList.filter(menu =>
        menu.food_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        menu.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <Link to="/restaurents" style={{ textDecoration: 'none', color: 'black', fontSize: '25px' }}>
                                        <i className="mdi mdi-keyboard-backspace" style={{ cursor: 'pointer' }}></i>
                                    </Link>
                                    <h4 className="card-title"> &emsp;Menu List</h4> <br />
                                    <Link to="/menu_add" style={{ textDecoration: 'none', color: 'white' }}>
                                        <button type="submit" className="btn btn-success mr-2">
                                            Add &nbsp; <i className="mdi mdi-plus-box"></i>
                                        </button>
                                    </Link>
                                    <input
                                        type="text"
                                        placeholder="🔍 Search menu"
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
                                                    <th>Category</th>
                                                    <th>Rating</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredMenuList.length > 0 ? (
                                                    filteredMenuList.map((menu, index) => (
                                                        <tr key={index}>
                                                            <td className="py-1">
                                                                <img src={`http://localhost:5000/public/menu/${menu.food_image}`} alt="menu-image" />
                                                            </td>
                                                            <td>
                                                                {menu.food_name}
                                                            </td>
                                                            <td>
                                                                {menu.category}
                                                            </td>
                                                            <td>
                                                                {menu.ratings ? menu.ratings : '0'}⭐
                                                            </td>
                                                            <td>
                                                                {menu.status === "Active" ? (
                                                                    <label className="badge badge-success">Active</label>
                                                                ) : (
                                                                    <label className="badge badge-danger">In-Active</label>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-inverse-primary btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="Edit" onClick={() => handleEdit(menu.menu_id)}>
                                                                    <i className="mdi mdi-lead-pencil"></i>
                                                                </button>
                                                                &emsp;
                                                                <button type="button" className="btn btn-inverse-danger btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="Delete" onClick={() => handleDelete(menu.menu_id)}>
                                                                    <i className="mdi mdi-delete"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6">List not found.</td>
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
