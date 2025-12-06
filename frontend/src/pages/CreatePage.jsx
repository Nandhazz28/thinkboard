import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; 
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, contents: content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="w-full max-w-2xl px-6 py-8">
       
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-base-content mb-6"
        >
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

      
        <div className="card bg-base-100 shadow-lg rounded-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl font-semibold mb-6">
              Create New Note
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
             
              <div className="form-control">
                <label className="label font-medium">Title</label>
                <input
                  type="text"
                  placeholder="Enter a descriptive title..."
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              
              <div className="form-control">
                <label className="label font-medium">Content</label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-40 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

             
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary text-primary px-6"
                  disabled={loading}
                  
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Create Note"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;