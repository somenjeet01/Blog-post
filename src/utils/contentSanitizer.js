/**
 * Content sanitization utilities for cleaning TinyMCE content
 */

export const sanitizeContent = (content) => {
  if (!content || typeof content !== "string") {
    return "";
  }

  // Remove TinyMCE error messages and tracking URLs
  let cleanContent = content
    .replace(/Failed to load resource.*?CLIENT/gi, "")
    .replace(/sp\.tinymce\.com.*?\s/gi, "")
    .replace(/Understand this error/gi, "")
    .replace(/&nbsp;/g, " ")
    .replace(/<p>\s*<\/p>/gi, "") // Remove empty paragraphs
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  return cleanContent;
};

export const sanitizeTitle = (title) => {
  if (!title || typeof title !== "string") {
    return "";
  }

  // Clean title of error messages and normalize
  let cleanTitle = title
    .replace(/Failed to load resource.*?CLIENT/gi, "")
    .replace(/sp\.tinymce\.com.*?\s/gi, "")
    .replace(/Understand this error/gi, "")
    .replace(/[<>&"']/g, "") // Remove HTML entities and special chars
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  // Ensure title length is within limits
  if (cleanTitle.length > 255) {
    cleanTitle = cleanTitle.substring(0, 255).trim();
  }

  return cleanTitle;
};

export const validatePostData = (data) => {
  const errors = [];

  // Validate title
  const cleanTitle = sanitizeTitle(data.title);
  if (!cleanTitle) {
    errors.push("Title is required");
  } else if (cleanTitle.length > 255) {
    errors.push("Title must be less than 255 characters");
  }

  // Validate content
  const cleanContent = sanitizeContent(data.content);
  if (
    !cleanContent ||
    cleanContent === "<p></p>" ||
    cleanContent.replace(/<[^>]*>/g, "").trim() === ""
  ) {
    errors.push("Content is required");
  }

  // Validate slug
  if (!data.slug || data.slug.trim() === "") {
    errors.push("Slug is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
    cleanData: {
      ...data,
      title: cleanTitle,
      content: cleanContent,
      slug: data.slug?.trim(),
    },
  };
};
