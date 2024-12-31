import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME_QUERY } from '../lib/graphql/queries';
import {handleLogout} from '../lib/apollo-client';
import { toast } from 'sonner';
export function NavBar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const { data, loading } = useQuery(GET_ME_QUERY);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible((prevScrollPos > currentScrollPos && currentScrollPos > 0) || currentScrollPos < 20);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed w-full transition-transform duration-300 ease-in-out bg-black text-white ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-orange-500 text-3xl font-bold">V::X</Link>
          <nav className="flex gap-6">
            
            <Link 
              to="/products" 
              className={`font-medium transition-colors ${
                isActive('/products') ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Products
            </Link>
            {loading ? (
              <span className="text-gray-300">Loading...</span>
            ) : show && data?.me? (
                <>
              <Link 
                to="/dashboard" 
                className={`font-medium transition-colors ${
                  isActive('/dashboard') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
                <button
                    onClick={() => {
                        handleLogout();
                        setShow(false);
                        toast.success('Logged out successfully');

                    }}
                    className="font-medium transition-colors text-gray-300 hover:text-white"
                >
                    Logout
                </button>
                </>
            ) : (
                <>
              <Link 
                to="/login" 
                className={`font-medium transition-colors ${
                  isActive('/login') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Login
              </Link>

              <Link 
                to="/signup" 
                className={`font-medium transition-colors ${
                  isActive('/login') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Sign Up
              </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

