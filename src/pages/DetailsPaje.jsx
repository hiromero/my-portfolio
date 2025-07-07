import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function DetailsPage() {
    const [details, setDetails] = useState([]);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        axios.get('http://localhost:5000/api/owner/details', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setDetails(res.data));
    }, []);

    return (
        <div>
            <h2>My Details</h2>
            {/* map over details and render them with edit/delete buttons */}
        </div>
    );
}
