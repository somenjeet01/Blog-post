import React, { useState } from "react";
import appwriteService from "../appwrite/config.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/post/${$id}`} className="block group">
      <div
        className="
                w-full bg-white rounded-xl p-4 
                shadow-md hover:shadow-xl
                transition-all duration-300 
                transform hover:-translate-y-2
                border border-blue-100 card-hover animate-fadeIn
            "
      >
        <div
          className="
                    w-full justify-center mb-4 
                    aspect-video overflow-hidden 
                    rounded-xl relative
                "
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-blue-100 animate-pulse"></div>
          )}
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className={`
                            rounded-xl w-full h-full object-cover
                            transition-opacity duration-300
                            ${imageLoaded ? "opacity-100" : "opacity-0"}
                        `}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <h2
          className="
                    text-xl font-bold text-blue-900
                    group-hover:text-blue-600 transition-colors
                    line-clamp-2 mt-2
                "
        >
          {title}
        </h2>
        <div className="mt-2 w-1/4 h-1 bg-blue-100 group-hover:bg-blue-500 transition-colors rounded"></div>
      </div>
    </Link>
  );
}

export default PostCard;
