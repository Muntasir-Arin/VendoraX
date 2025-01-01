import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_ME_QUERY } from "@/lib/graphql/queries";

const AuthMiddleware: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, loading, error } = useQuery(GET_ME_QUERY);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && error) {
      navigate("/login");
    }
  }, [loading, error, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="loader">Loading...</div>
    </div>;
  }

  if (data?.me) {
    return <>{children}</>;
  }

  return null;
};

export default AuthMiddleware;
