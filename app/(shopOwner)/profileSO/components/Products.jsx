import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Products({ shopId }) {
  const token = localStorage.getItem('token-access')
  const [choice, setChoice] = useState('default')
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
    status: 'active', 
  })

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const productData = new FormData()
    productData.append('product_name', formData.product_name)
    productData.append('description', formData.description)
    productData.append('price', formData.price)
    productData.append('stock', formData.stock)
    productData.append('image', formData.image)
    productData.append('status', formData.status)

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/products/',
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log('Product created:', response.data)
      
      
      window.alert('Product added successfully!')

      
      setFormData({
        product_name: '',
        description: '',
        price: '',
        stock: '',
        image: null,
        status: 'active',
      })

      
      fetchProducts()

      
      setChoice('default') 
    } catch (error) {
      console.error('Error creating product:', error)
      
      window.alert('Failed to add product.')
    }
  }

  const filteredProducts = products.filter(product => product.owner === shopId)

  return (
    <>
      <h1 onClick={() => setChoice('addProduct')}>Add Product</h1>
      <h1>shopId: {shopId}</h1>

      {choice === 'addProduct' && (
        <>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <input
              type="text"
              name="product_name"
              placeholder="Product Name"
              className='text-black'
              value={formData.product_name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="description"
              className='text-black'
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="price"
              className='text-black'
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="stock"
              className='text-black'
              placeholder="Stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
            />
            <select
              name="status"
              className='text-black'
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="active" className='text-black'>Active</option>
              <option value="inactive" className='text-black'>Inactive</option>
            </select>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setChoice('default')}>
              Cancel
            </button>
          </form>
        </>
      )}

      <h1 className='mb-5 mt-10'>List of Products</h1>

      <div className='overflow-x-auto scrollbar-track-gray-500 scrollbar-thin scrollbar-thumb-rounded-3xl scrollbar-thumb-cyan-400'>
        <div className='flex'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className='m-2 p-2 flex' style={{ minWidth: '200px' }}>
                <div className='pr-2'>
                  <img src={product.image} className='md:w-24 w-20 rounded-md' alt="" />
                </div>
                <div className='text-xs flex flex-col'>
                  <p>Name: {product.product_name}</p>
                  <p>Description: {product.description}</p>
                  <p>Price: {product.price}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Status: {product.status}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products found for this shop.</p>
          )}
        </div>
      </div>

    </>
  )
}

export default Products
