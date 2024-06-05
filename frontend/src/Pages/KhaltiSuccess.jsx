import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import { Spinner } from 'reactstrap';
import '../style/KhaltiSuccess.css'; // import your CSS file
import { FaCheckCircle } from 'react-icons/fa';

const KhaltiSuccess = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const queryParams = new URLSearchParams(window.location.search);
    const pidx = queryParams.get('pidx');
    console.log(pidx);

    useEffect(() => {
        const verifyPidx = async () => {
            try {
                const response = await axios.post(
                    `${BASE_URL}/payment/verifypidx`,
                    { pidx },
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    setLoading(false);
                   
                }
            } catch (error) {
                setError('Something went wrong while verifying');
                setLoading(false);
            }
        };

        if (!pidx) {
            navigate('/');
            console.log("pidx bigriyou");
            return; // Exit early if no pidx
        }

        verifyPidx();
    }, [pidx, navigate]);

    return (
        <div className="khalti-success-container">
            {loading ? (
                <Spinner color="primary" className="verifying-spinner" />
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="success-message">
                    <FaCheckCircle className="success-icon" />
                    <h1>Payment Successful</h1>
                </div>
            )}
        </div>
    );
};

export default KhaltiSuccess;

