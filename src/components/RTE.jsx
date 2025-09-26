import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf.js";

export default function RTE({
  name,
  control,
  label,
  defaultValue = "",
  rules = {},
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50 bg-white" : ""
      }`}
      data-editor-container
    >
      {/* {label && (
        <div className="flex items-center justify-between mb-2 bg-blue-50 p-3 rounded-lg">
          <label className="text-blue-700 font-medium text-sm uppercase tracking-wide">
            {label}
          </label>
          <div className="text-xs text-blue-600 space-x-4">
            <span>Words: {wordCount}</span>
            <span>Characters: {charCount}</span>
          </div>
        </div>
      )} */}

      <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <Controller
          name={name || "content"}
          control={control}
          rules={rules}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={conf.tinymceApiKey || "no-api-key"}
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: isFullscreen ? "90vh" : 500,
                menubar: true,
                accessibility_focus: true,
                a11y_advanced_options: true,

                // Disable analytics and tracking to prevent error messages
                analytics: false,
                toolbar_mode: "floating",
                promotion: false,
                branding: false,
                ui_mode: "split",
                statusbar: true,

                // Error handling
                error_reporting: false,

                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                  "emoticons",
                  "codesample",
                  "save",
                ],
                toolbar: [
                  "undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor",
                  "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
                  "removeformat | image media link codesample | emoticons hr | fullscreen code",
                ].join(" | "),
                content_style: `
                  body {
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #374151;
                    max-width: 100%;
                    margin: 0 auto;
                    padding: 1rem;
                  }
                  h1, h2, h3, h4, h5, h6 {
                    font-weight: 600;
                    color: #111827;
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                  }
                  p { margin: 0 0 1em; }
                  a { color: #2563eb; }
                  blockquote {
                    border-left: 4px solid #e5e7eb;
                    margin: 1.5em 0;
                    padding: 0.5em 1em;
                    color: #4b5563;
                  }
                  code {
                    background: #f3f4f6;
                    padding: 0.2em 0.4em;
                    border-radius: 0.25em;
                    font-size: 0.9em;
                  }
                  img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.375rem;
                  }
                `,
                skin: "oxide",
                browser_spellcheck: true,
                contextmenu: false,
                paste_data_images: true,
                automatic_uploads: true,
                image_caption: true,
                codesample_languages: [
                  { text: "HTML/XML", value: "markup" },
                  { text: "JavaScript", value: "javascript" },
                  { text: "CSS", value: "css" },
                  { text: "PHP", value: "php" },
                  { text: "Ruby", value: "ruby" },
                  { text: "Python", value: "python" },
                  { text: "Java", value: "java" },
                  { text: "C", value: "c" },
                  { text: "C#", value: "csharp" },
                  { text: "C++", value: "cpp" },
                ],
                setup: (editor) => {
                  editor.on("FullscreenStateChanged", (e) => {
                    setIsFullscreen(e.state);
                  });

                  // Track word count and character count
                  editor.on("KeyUp", () => {
                    try {
                      const text = editor.getContent({ format: "text" });
                      setWordCount(text ? text.trim().split(/\s+/).length : 0);
                      setCharCount(text ? text.length : 0);
                    } catch (err) {
                      console.log("Error counting words:", err);
                    }
                  });
                },

                // Configure paste behavior using modern options
                paste_block_drop: false,
                paste_data_images: true,
                paste_as_text: false,
                smart_paste: true,

                // Improve accessibility
                allow_html_in_named_anchor: true,
                allow_script_urls: false,
                convert_urls: false,
              }}
              onEditorChange={(content, editor) => {
                try {
                  // Clean content to remove any error messages
                  const cleanContent = content
                    .replace(/Failed to load resource.*?CLIENT/gi, "")
                    .replace(/sp\.tinymce\.com.*?/gi, "")
                    .replace(/Understand this error/gi, "")
                    .replace(/<p>\s*<\/p>/gi, "") // Remove empty paragraphs
                    .trim();

                  const text = editor.getContent({ format: "text" });
                  setWordCount(text ? text.trim().split(/\s+/).length : 0);
                  setCharCount(text ? text.length : 0);
                  onChange(cleanContent);
                } catch (err) {
                  console.log("Error in editor change:", err);
                  onChange(content);
                }
              }}
            />
          )}
        />
      </div>
    </div>
  );

  // Removed handleEditorChange function as we're now handling it inline
}
