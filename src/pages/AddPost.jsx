import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="min-h-screen pt-4 pb-8 bg-gradient-to-bl from-blue-50 via-blue to-blue-50">
      <Container>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Create New Article
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your thoughts, insights, and expertise with our community.
            Create an engaging article with rich text formatting, images, and
            more.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
