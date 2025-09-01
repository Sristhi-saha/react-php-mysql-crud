import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const Todo = () => {
  // State for fetched todos
  const [todos, setTodos] = useState([]);

  // State for "View"
  const [eye, setEye] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // State for "Edit"
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  // Fetch data with useEffect
  const fetchTodos = async () => {
    try {
      const result = await axios.get('http://localhost/api/save.php');
      setTodos(result.data);
      console.log("Fetched todos:", result.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost/api/save.php', {
        action: "delete",
        id: id
      });
      fetchTodos(); // refresh list
      console.log("delete item")
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      await axios.post('http://localhost/api/save.php', {
        action: "update",
        id: editTodo.id,
        title: editValue,
        status: editTodo.status
      });
      setEdit(false);
      fetchTodos(); // refresh list
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  if (!todos || todos.length === 0) return <p>No todos found</p>;

  return (
    <div
      className="container mt-4"
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fffbea",
        width: "536px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "12px 16px"
      }}
    >
      {todos.map((elem) => (
        <div
          key={elem.id}
          style={{
            background: "pink",
            borderRadius: "8px",
            padding: "10px 15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "400px"
          }}
          className="todo col-lg-5 mx-auto my-2"
        >
          {/* Task text */}
          <span
            style={{
              fontWeight: "500",
              fontSize: "16px",
              color: "#333"
            }}
          >
            {elem.title} 
          </span>

          {/* Action Icons */}
          <div className="iconsar d-flex justify-content-between">
            {/* Edit */}
            <span
              onClick={() => {
                setEdit(true);
                setEditTodo(elem);
                setEditValue(elem.title);
              }}
              className="mx-1"
              style={{
                background: "Yellow",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              <EditIcon />
            </span>

            {/* View */}
            <span
              onClick={() => {
                setSelectedTodo(elem);
                setEye(true);
              }}
              style={{
                background: "violet",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              <RemoveRedEyeIcon />
            </span>

            {/* Delete */}
            <span
              onClick={() => handleDelete(elem.id)}
              className="mx-1"
              style={{
                background: "#ff4d4f",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              <DeleteIcon />
            </span>
          </div>
        </div>
      ))}

      {/* View Modal */}
      <Modal show={eye} onHide={() => setEye(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Todo Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTodo ? (
            <>
              <p><strong>ID:</strong> {selectedTodo.id}</p>
              <p><strong>Title:</strong> {selectedTodo.title}</p>
              <p><strong>Status:</strong> {selectedTodo.status}</p>
            </>
          ) : (
            "No todo selected"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEye(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={edit} onHide={() => setEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Todo Title</Form.Label>
              <Form.Control
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
