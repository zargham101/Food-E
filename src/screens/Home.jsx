import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import config from "../config";
import { useState, useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const foodData = async () => {
    try {
      let response = await fetch(`${config.API_URL}/api/foodData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      response = await response.json();

      setFoodItem(response[0]);
      setFoodCategory(response[1]);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    foodData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
        <div className="m-2">
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            style={{ objectFit: "contain !important" }}
          >
            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="carousel-item active">
                <img
                  src="https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg"
                  className="d-block w-100"
                  alt="Roasted Chicken Wings"
                  style={{ filter: "brightness(30%)" }}
                />
              </div>

              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/7363933/pexels-photo-7363933.jpeg"
                  className="d-block w-100"
                  alt="Fresh Dumplings in Bamboo Tray"
                  style={{ filter: "brightness(30%)" }}
                />
              </div>

              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg"
                  className="d-block w-100"
                  alt="Momo Dish"
                  style={{ filter: "brightness(30%)" }}
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="container">
          {foodCategory && foodCategory.length > 0 ? (
            foodCategory.map((data) => {
              return (
                <div className="row mb-3 " key={data._id}>
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                  {foodItem && foodItem.length > 0 ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-md-6 col-lg-3"
                          >
                            <Card
                              foodItem={filterItems}
                              options={filterItems.options[0]}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No data found</div>
                  )}
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
