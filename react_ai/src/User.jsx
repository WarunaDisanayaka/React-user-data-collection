import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Table ,Button} from 'react-bootstrap'; // Import Bootstrap components
import { Link } from 'react-router-dom';

function User() {

  // Add user details
  const [showModal, setShowModal] = useState(false);
  const [newUserData, setNewUserData] = useState({ id: '', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '' });
  const [users, setUsers] = useState([
    { id: '1', col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', col5: 'Data 5', col6: 'Data 6' }
    // You can add more initial user data here
  ]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewUserData({ id: '', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '' });
  };

  const handleAddUser = () => {
    setUsers([...users, newUserData]);
    handleCloseModal();
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <h1 className="mt-5">Census of Officers Election Report </h1>
      <div className="d-flex justify-content-end w-100">
        <Link to="/create" variant="primary" className="btn btn-primary my-3">
          Add Users
        </Link>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Full name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Ex</th>
            <th>Sal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
            <td>Data 4</td>
            <td>Data 5</td>
            <td>Data 6</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default User;
