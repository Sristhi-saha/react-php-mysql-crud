import AddIcon from "@mui/icons-material/Add";
import { Todo } from "./todo";
import { useState } from "react";
import axios from "axios";

export const Home = () => {
  const [data, setData] = useState("");

  const handleAddTask = async (e) => {
    if (!data.trim()) return; // prevent empty task
    e.preventDefault();

    try {
      await axios.post("http://localhost/api/save.php", {
        action: "insert",
        title: data,
        status: 0,
      });

      setData(""); // reset input
      window.location.reload(); // refresh list after add
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task. Please try again.");
    }
  };

  return (
    <div>
      <div className="container">
        <section className="text-center mt-3">
          <h1>Enter Your Task</h1>
          <div className="todo col-lg-5 mx-auto d-flex justify-content-between align-items-center">
            <input
              className="form-control task"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Add a new task"
            />
            <button
              onClick={handleAddTask}
              className="btn btn-primary mx-2"
              style={{ width: "120px", background: "#ee5253", border: "none" }}
            >
              <AddIcon />
            </button>
          </div>
        </section>

        {/* Todo list below */}
        <Todo />
      </div>
    </div>
  );
};
