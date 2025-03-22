import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/Card";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
export default function Homepage() {
  const [search, setSearch] = useState({ from: "", to: "", date: "" });

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Sidebar />
      <Navbar />
      <div className="mt-20">
        <section
          className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-white pt-20"
          style={{ backgroundImage: "url('/flight-bg.jpg')" }}
        >
          <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center w-2/3">
            <h2 className="text-3xl font-bold mb-4">Find Your Flight</h2>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                className="p-3 rounded w-full text-black"
                placeholder="From"
                onChange={(e) => setSearch({ ...search, from: e.target.value })}
              />
              <input
                className="p-3 rounded w-full text-black"
                placeholder="To"
                onChange={(e) => setSearch({ ...search, to: e.target.value })}
              />
              <input
                className="p-3 rounded w-full text-black"
                type="date"
                onChange={(e) => setSearch({ ...search, date: e.target.value })}
              />
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <Button className="bg-yellow-500 text-black px-6 py-3 rounded flex items-center">
                <FaSearch className="mr-2" /> Search Flights
              </Button>
            </div>
          </div>
        </section>
      </div>
      {/* Upcoming Bookings */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Bookings</h2>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((booking) => (
            <Card key={booking}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">Flight XYZ123</h3>
                <p>From: New York</p>
                <p>To: London</p>
                <p>Date: 2025-04-01</p>
                <Button className="mt-2 bg-blue-500 text-Black px-4 py-2 rounded">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Popular Destinations */}
      <section className="p-6 bg-gray-200">
        <h2 className="text-2xl font-bold mb-4">Popular Destinations</h2>
        <div className="grid grid-cols-3 gap-4">
          {["Paris", "Dubai", "Tokyo"].map((city) => (
            <Card key={city}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{city}</h3>
                <p>Explore amazing experiences</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Special Offers */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "20% Off on First Booking", code: "Use code: FIRST20" },
            {
              title: "Flash Sale: Dubai",
              code: "Discounted fares available now",
            },
          ].map((offer, index) => (
            <Card key={index}>
              <CardContent className="p-4 bg-yellow-100">
                <h3 className="font-semibold text-lg">{offer.title}</h3>
                <p>{offer.code}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="p-4 bg-blue-600 text-white text-center mt-6">
        <p>&copy; 2025 Flight Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}
