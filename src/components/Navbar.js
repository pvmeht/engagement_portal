import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Simulating user login state (replace with real login status)
  useEffect(() => {
    const token = localStorage.getItem('token');  // Check for JWT token in local storage (adjust as needed)
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token to get user info
      setUserEmail(decodedToken.email); // Extract email from decoded token (adjust based on token structure)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token on logout
    setIsAuthenticated(false);
    setUserEmail('');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">Engagement Portal</div>
        <div className="flex">
          <Link
            to="/"
            className="hover:text-blue-300 transition duration-200"
          >
            Home
          </Link>
        </div>
        <div className="flex space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-300 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-blue-300 transition duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group">
              <button
                onClick={handleLogout}
                className="hover:text-blue-300 transition duration-200"
              >
                Logout
              </button>
              <div className="absolute hidden group-hover:block bg-gray-700 text-white text-sm p-2 rounded-md">
                {userEmail}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
