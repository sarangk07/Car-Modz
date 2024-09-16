import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Products({ shopId }) {
  const token = localStorage.getItem('token-access')
  const [choice, setChoice] = useState('default')
  const [sort1, setSort1] = useState('default')
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
    status: 'active',
  })
  const [editProductId, setEditProductId] = useState(null)
  const [products, setProducts] = useState([])

  
  const productNames = ["Alloy", "Body Kit", "Exhaust", "Others"]

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
    if (formData.image) {
      productData.append('image', formData.image)
    }
    productData.append('status', formData.status)

    try {
      let response;
      if (editProductId) {
        // Updating--------------------
        response = await axios.put(
          `http://127.0.0.1:8000/api/products/${editProductId}/`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log('Product updated:', response.data)
        window.alert('Product updated successfully!')
      } else {
        // Creating--------------------
        response = await axios.post(
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
      }

      
      setFormData({
        product_name: '',
        description: '',
        price: '',
        stock: '',
        image: null,
        status: 'active',
      })
      setEditProductId(null)

      
      fetchProducts()

      
      setChoice('default')
    } catch (error) {
      console.error('Error creating/updating product:', error)
      window.alert('Failed to save product.')
    }
  }

  const handleEdit = (product) => {
    setFormData({
      product_name: product.product_name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: null, 
      status: product.status,
    })
    setEditProductId(product.id)
    setChoice('addProduct') 
  }




  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (!confirmDelete) return
  
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${productId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      window.alert('Product deleted successfully!')
      fetchProducts()  // Refresh the product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error)
      window.alert('Failed to delete product.')
    }
  }
  

  // Filter products--------------------------------------------
  const filteredProducts = products
    .filter(product => product.owner === shopId)
    .filter(product => {
      if (sort1 === 'default') return true
      if (sort1 === 'bodykits' && product.product_name === 'Body Kit') return true
      if (sort1 === 'alloys' && product.product_name === 'Alloy') return true
      if (sort1 === 'exhausts' && product.product_name === 'Exhaust') return true
      if (sort1 === 'others' && product.product_name === 'Others') return true
      return false
    })

  return (
    <>
      <h1 onClick={() => setChoice('addProduct')} className='ml-2 w-fit border border-cyan-300 cursor-pointer'>Add Product</h1>
      <h1 className='ml-2'>shopId: {shopId}</h1>

      {choice === 'addProduct' && (
        <>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <select
              name="product_name"
              className='text-black bg-slate-300'
              value={formData.product_name}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select a product name</option>
              {productNames.map((name, index) => (
                <option key={index} value={name} className='text-black'>{name}</option>
              ))}
            </select>
            <input
              type="text"
              name="description"
              className='text-black bg-slate-300'
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="price"
              className='text-black bg-slate-300'
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="stock"
              className='text-black bg-slate-300'
              placeholder="Stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              name="image"
              className='bg-slate-300 text-black'
              onChange={handleFileChange}
            />
            <select
              name="status"
              className='text-black bg-slate-300'
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="active" className='text-black'>Active</option>
              <option value="inactive" className='text-black'>Inactive</option>
            </select>
            <button type="submit">{editProductId ? 'Update' : 'Submit'}</button>
            <button type="button" onClick={() => {
              setChoice('default')
              setEditProductId(null)
              setFormData({
                product_name: '',
                description: '',
                price: '',
                stock: '',
                image: null,
                status: 'active',
              })
            }}>
              Cancel
            </button>
          </form>
        </>
      )}

      <h1 className='mb-5 ml-2 mt-10'>List of Products</h1>
      <div className='flex '>
        <p className='mr-4 ml-2 cursor-pointer' onClick={() => setSort1('alloys')}>Alloys</p>
        <p className='mr-4 cursor-pointer' onClick={() => setSort1('bodykits')}>Body Kits</p>
        <p className='mr-4 cursor-pointer' onClick={() => setSort1('exhausts')}>Exhausts</p>
        <p className='mr-4 cursor-pointer' onClick={() => setSort1('others')}>Others</p>
        <p className='mr-4 cursor-pointer' onClick={() => setSort1('default')}>All</p>
      </div>

      <div className='overflow-x-auto scrollbar-track-gray-500 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-cyan-400'>
        <div className='flex'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className='m-2 p-2 flex' style={{ minWidth: '200px' }}>
                <div className='pr-2'>
                  <img src={product.image} className='md:w-24 w-20 rounded-md' alt="" />
                </div>
                <div className='text-xs flex flex-col'>
                  <p>Product: {product.product_name}</p>
                  <p>Description: {product.description}</p>
                  <p>Price: {product.price}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Status: {product.status}</p>
                  <div className='flex justify-between'>
                  <button className='text-green-600' onClick={() => handleEdit(product)}>Edit</button>
                  <button className='text-red-600' onClick={() => handleDelete(product.id)}>Delete</button>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found!</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Products
