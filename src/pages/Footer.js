import React from "react";
import logo from "../assets/1 (32).jpg";
import THEME from "../theme";
import { Link } from "react-router-dom";

const CustomFooter = () => {
  return (
    <footer style={THEME.FooterStyle} className="bg-gray-800 text-white py-8">
      {/* Main Content */}
      <div className="container mx-auto text-center space-y-6">
        {/* Logo Section */}
        <div>
          <img loading="lazy" className="mx-auto w-32" src={logo} alt="Logo" />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 leading-relaxed">
          Welcome to
          <span className="font-bold text-white"> SK World</span>. A web
          application project by{" "}
          <span className="font-bold text-white">
            SK World of International Match Makers
          </span>
          . Designed for faster and more efficient matchmaking compared to
          WhatsApp Matrimonial Groups.
          <br />
          <br />
          Join SKWorld today and start your journey toward successful
          matchmaking.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Copyright Section */}
      <div className="container mx-auto grid md:grid-cols-2 gap-4 text-center text-gray-400">
        <div>
          <h6 className="text-lg font-semibold text-white">Copyright</h6>
          <p>
            &copy; SKWorld {new Date().getFullYear()}
            <br /> All rights reserved.
          </p>
        </div>
        <div>
          <h6 className="text-lg font-semibold text-white">Powered by</h6>
          <Link
            to="https://TahiriServices.vercel.app"
            className="text-blue-400 hover:text-blue-500 transition duration-200"
          >
            TahiriServices.vercel.app
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
