import React, { useEffect } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

export const landingLoader = async () => {
  const response = await axios(
  'http://127.0.0.1:8000/api/products/'  );
  const data = response.data;
    
  return { products: data.products };
};

const Landing = () => {
  const { products } = useLoaderData();
  const navigate = useNavigate();

  return (
    <main>
      <Hero />
      <Stats />

      <div className="selected-products">
        <h2 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content">
          Trending Products
        </h2>
        <div className="selected-products-grid max-w-7xl mx-auto">
        {products.map((product) => (
            <ProductElement
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.imageUrl}
              rating={product.rating}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
