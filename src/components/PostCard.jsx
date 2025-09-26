import React, { useState } from "react";
import appwriteService from "../appwrite/config.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/post/${$id}`} className="block group h-full">
      <div
        className="
                card-equal-height
                w-full bg-white rounded-xl p-4 
                shadow-md hover:shadow-xl
                transition-all duration-300 
                transform hover:-translate-y-2
                border border-blue-100 card-hover animate-fadeIn
                min-h-[320px]
            "
      >
        <div
          className="
                    w-full justify-center mb-4 
                    aspect-video overflow-hidden 
                    rounded-xl relative
                    flex-shrink-0
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
        <div className="card-content-grow">
          <h2
            className="
                      text-xl font-bold text-blue-900
                      group-hover:text-blue-600 transition-colors
                      line-clamp-2 mt-2
                  "
          >
            {title}
          </h2>
          <div className="mt-auto pt-2">
            <div className="w-1/4 h-1 bg-blue-100 group-hover:bg-blue-500 transition-colors rounded"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
