import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/verify/${token}`);
        setStatus('success');
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              notification: 'Email verified successfully! You can now login.' 
            }
          });
        }, 3000);
      } catch (error) {
        setStatus('error');
        // Redirect to register after 3 seconds on error
        setTimeout(() => {
          navigate('/register', { 
            state: { 
              notification: 'Verification failed. Please try registering again.' 
            }
          });
        }, 3000);
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {status === 'verifying' && (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertTitle>Verifying Email</AlertTitle>
            <AlertDescription>
              Please wait while we verify your email address...
            </AlertDescription>
          </Alert>
        )}
        
        {status === 'success' && (
          <Alert className="bg-green-50 border-green-200">
            <AlertTitle>Email Verified!</AlertTitle>
            <AlertDescription>
              Your email has been verified successfully. Redirecting to login page...
            </AlertDescription>
          </Alert>
        )}
        
        {status === 'error' && (
          <Alert className="bg-red-50 border-red-200">
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>
              We couldn't verify your email. Redirecting to registration page...
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
