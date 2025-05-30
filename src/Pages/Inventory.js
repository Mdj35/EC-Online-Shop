import React, { useState, useEffect } from 'react';
import {
  Container,
  Content,
  Title,
  AddButton,
  ProductTable,
  Th,
  Td,
  ProductImage,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  Form,
  Input,
  TextArea,
  Select,
  ModalActions,
  CancelButton,
  SaveButton,
  ActionButton,
  EditButton,
  ConfirmOverlay,
  ConfirmBox,
} from '../Design/Inventory';
import Sidebar from '../components/Sidebar';

// Simple loading spinner component
function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '80px'
    }}>
      <div style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #111',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        animation: 'spin 1s linear infinite'
      }} />
      <style>
        {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}

const API_URL = 'https://vynceianoani.helioho.st/ecos/products.php';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null); // For confirmation modal
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    type: 'merchandise',
    quantity: '',
  });

  // Fetch products from API
  const fetchProducts = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = () => {
    setEditIndex(null);
    setModalOpen(true);
    setForm({
      name: '',
      description: '',
      image: '',
      price: '',
      type: 'merchandise',
      quantity: '',
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditIndex(null);
    setForm({
      name: '',
      description: '',
      image: '',
      price: '',
      type: 'merchandise',
      quantity: '',
    });
    setLoading(false);
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setForm(f => ({ ...f, image: files[0] })); // Store File object
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('type', form.type);
    formData.append('quantity', form.quantity);

    if (form.image && form.image instanceof File) {
      formData.append('image', form.image);
    }

    if (editIndex !== null) {
      formData.append('id', products[editIndex].id);
    }

    fetch(API_URL, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        fetchProducts();
      })
      .finally(() => {
        setLoading(false);
        handleCloseModal();
      });
  };

  // Open confirmation modal
  const handleDelete = idx => {
    setDeleteIndex(idx);
  };

  // Confirm delete
  const confirmDelete = () => {
    const product = products[deleteIndex];
    if (!product) return;
    setLoading(true);
    fetch(`${API_URL}?id=${product.id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        fetchProducts();
        setDeleteIndex(null);
      })
      .finally(() => setLoading(false));
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteIndex(null);
  };

  const handleEdit = idx => {
    setEditIndex(idx);
    setForm({
      name: products[idx].name,
      description: products[idx].description,
      image: '', // Don't preload image file, let user re-upload if needed
      price: products[idx].price,
      type: products[idx].type,
      quantity: products[idx].quantity,
    });
    setModalOpen(true);
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Inventory</Title>
        <AddButton onClick={handleOpenModal}>+ Add Product</AddButton>
        <ProductTable>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Image</Th>
              <Th>Price (₱)</Th>
              <Th>Type</Th>
              <Th>Quantity</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <Td colSpan={7}>No products yet.</Td>
              </tr>
            ) : (
              products.map((prod, idx) => (
                <tr key={prod.id || idx}>
                  <Td>{prod.name}</Td>
                  <Td>{prod.description}</Td>
                  <Td>
                    {prod.image && (
                      <ProductImage src={prod.image} alt={prod.name} />
                    )}
                  </Td>
                  <Td>₱{prod.price}</Td>
                  <Td style={{ textTransform: 'capitalize' }}>{prod.type}</Td>
                  <Td>{prod.quantity}</Td>
                  <Td>
                    <EditButton type="button" onClick={() => handleEdit(idx)}>
                      Edit
                    </EditButton>
                    <ActionButton type="button" onClick={() => handleDelete(idx)}>
                      Delete
                    </ActionButton>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </ProductTable>

        {modalOpen && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>{editIndex !== null ? 'Edit Product' : 'Add Product'}</ModalTitle>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Input
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <TextArea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                  <Input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    required={editIndex === null}
                  />
                  <Input
                    name="price"
                    type="number"
                    placeholder="Price (₱)"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                  <Select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="merchandise">Merchandise</option>
                    <option value="cosmetics">Cosmetics</option>
                    <option value="others">Others</option>
                  </Select>
                  <Input
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    required
                  />
                  <ModalActions>
                    <CancelButton type="button" onClick={handleCloseModal}>Cancel</CancelButton>
                    <SaveButton type="submit">{editIndex !== null ? 'Save' : 'Add'}</SaveButton>
                  </ModalActions>
                </Form>
              )}
            </ModalContent>
          </ModalOverlay>
        )}

        {deleteIndex !== null && (
          <ConfirmOverlay>
            <ConfirmBox>
              <ModalTitle>Delete Product</ModalTitle>
              <div>Are you sure you want to delete this product?</div>
              <ModalActions>
                <CancelButton type="button" onClick={cancelDelete}>Cancel</CancelButton>
                <ActionButton type="button" onClick={confirmDelete}>Delete</ActionButton>
              </ModalActions>
            </ConfirmBox>
          </ConfirmOverlay>
        )}
      </Content>
    </Container>
  );
}

export default Inventory;