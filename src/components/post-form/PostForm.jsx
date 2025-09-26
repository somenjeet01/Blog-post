import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select, LoadingOverlay } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { validatePostData } from "../../utils/contentSanitizer";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
    mode: "onChange", // Validate form on change
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const submit = async (data) => {
    if (!userData || !userData.$id) {
      console.error("User not authenticated or missing userData");
      setError("You must be logged in to create a post");
      return;
    }

    // Clear any previous errors
    setError("");

    // Validate and sanitize the data
    const validation = validatePostData(data);
    if (!validation.isValid) {
      setError(validation.errors.join(", "));
      return;
    }

    // Use the cleaned data
    const cleanData = validation.cleanData;

    setIsLoading(true);
    try {
      if (post) {
        // Check if image exists and has items before accessing [0]
        const file =
          cleanData.image && cleanData.image.length > 0
            ? await appwriteService.uploadFile(cleanData.image[0])
            : null;

        if (file && post.featuredImage) {
          try {
            await appwriteService.deleteFile(post.featuredImage);
          } catch (error) {
            console.log("Error deleting old image, continuing anyway:", error);
          }
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...cleanData,
          featuredImage: file ? file.$id : post?.featuredImage,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // Verify cleanData.image exists and has items
        if (cleanData.image && cleanData.image.length > 0) {
          const file = await appwriteService.uploadFile(cleanData.image[0]);
          if (file && file.$id) {
            const fileId = file.$id;
            cleanData.featuredImage = fileId;

            // Debug data being sent
            console.log("Sending post data:", {
              title: cleanData.title,
              slug: cleanData.slug,
              content: cleanData.content,
              featuredImage: fileId,
              status: cleanData.status,
              userId: userData?.$id,
            });

            const dbPost = await appwriteService.createPost({
              title: cleanData.title,
              slug: cleanData.slug,
              content: cleanData.content,
              featuredImage: fileId,
              status: cleanData.status,
              userId: userData?.$id,
            });

            if (dbPost) {
              navigate(`/post/${dbPost.$id}`);
            }
          } else {
            console.error("Error uploading file or getting file ID");
            setError("Failed to upload image. Please try a different image.");
          }
        } else {
          console.error("No image selected");
          setError("Featured image is required for new posts");
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);

      // Display more helpful information about the error
      let errorMessage = "Failed to submit post. Please try again.";

      if (error.message && error.message.includes("Missing required")) {
        errorMessage =
          "Missing required fields. Please fill in all required fields.";
      }

      // Set error message to display in the UI
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      {/* Loading overlay for post submission */}
      <LoadingOverlay show={isLoading} variant="post" />

      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-4xl mx-auto flex flex-col gap-4"
      >
        {/* Error display */}
        {error && (
          <div className="w-full p-4 mb-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1">
              Please check your form data and try again.
            </p>
          </div>
        )}

        {/* Single column for non-content fields */}
        <div className="flex flex-col gap-4">
          <div>
            <Input
              label="Title :"
              placeholder="Title"
              className={`mb-0 ${errors.title ? "border-red-500" : ""}`}
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 255,
                  message: "Title must be less than 255 characters",
                },
                validate: {
                  notEmpty: (value) =>
                    value.trim() !== "" || "Title cannot be empty",
                  noSpecialChars: (value) => {
                    // Remove any potential HTML entities or special characters
                    const cleanValue = value.replace(/[<>&"']/g, "");
                    return (
                      cleanValue.length <= 255 ||
                      "Title contains invalid characters or is too long"
                    );
                  },
                },
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm -mt-1 ml-1">
                {errors.title.message}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {watch("title")?.length || 0}/255 characters
            </p>
          </div>
          <div>
            <Input
              label="Slug :"
              placeholder="Slug"
              className={`mb-0 ${errors.slug ? "border-red-500" : ""}`}
              {...register("slug", {
                required: "Slug is required",
              })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            {errors.slug && (
              <p className="text-red-500 text-sm -mt-1 ml-1">
                {errors.slug.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Featured Image :"
              type="file"
              className={`mb-0 ${errors.image ? "border-red-500" : ""}`}
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", {
                required: !post ? "Featured image is required" : false,
              })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm -mt-1 ml-1">
                {errors.image.message}
              </p>
            )}
            {post && (
              <div className="w-full mb-2">
                <img
                  src={appwriteService.getFileView(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
          <div>
            <Select
              options={["active", "inactive"]}
              label="Status :"
              className={`mb-0 ${errors.status ? "border-red-500" : ""}`}
              {...register("status", {
                required: "Status is required",
              })}
            />
            {errors.status && (
              <p className="text-red-500 text-sm -mt-1 ml-1">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        {/* Content full width */}
        <div className="w-full">
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            rules={{ required: "Content is required" }}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mb-2 mt-1 ml-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Small submit button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="px-6 py-2 text-sm rounded-md"
            isLoading={isLoading}
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}
