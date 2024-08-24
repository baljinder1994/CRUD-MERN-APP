import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Dashboard = () => {
    const[name,setName]=useState('')
    const[value,setValue]=useState('')
    const[data,setData]=useState([])
    const[editingId,setEditingId]=useState(null)

    useEffect(() =>{
        fetchData()
    },[])

    const fetchData=() =>{
        axios.get('http://localhost:5000/api/data')
        .then(response => setData(response.data))
        .catch(error => console.error(error))
    }
    
    const totalEntries= data.length



    const handleSubmit=(e) =>{
     e.preventDefault();
     if(editingId){
        axios.put(`http://localhost:5000/api/data/${editingId}`, {name,value:Number(value)})
        .then(() =>{
            fetchData();
            setName('')
            setValue('')
            setEditingId(null)
        })
        .catch(error => console.error("There was an error editing data", error))
     }else{

     
      axios.post('http://localhost:5000/api/data/add',{name,value: Number(value)})
       .then(() =>{
        fetchData();
        setName('')
        setValue('')
       })
      .catch(error => console.error("There was an error adding data", error))
    }
}

    const handleEdit=(item)=> {
        setName(item.name);
        setValue(item.value)
        setEditingId(item._id)
    }

    const handleDelete=(id) =>{
        axios.delete(`http://localhost:5000/api/data/${id}`)
        .then(() => fetchData())
        .catch(error => console.error("There was an error deleting data", error))
        
    }

    const chartData={
        labels:data.map(d => d.name),
        datasets:[
            {
                label:'Data Values',
                data:data.map(d => d.value),
                borderColor:'rgba(75,192,192,1)',
                backgroundColor:'rgba(75,192,192,0.2)',
                fill:true
            }

        ]
    }


  return (
    <div className='dashboard-container'>
      <h1 className='dashboard-header'></h1>
      <div className='top-container'>
        <div className='form-content'>
            <form onSubmit={handleSubmit} className="form">
                <div className='form-input'>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    ></input>
                </div>
                <div className='form-input'>
                    <label htmlFor="value">Value:</label>
                    <input
                      type="number"
                      id="value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      required
                    ></input>
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
        <div className="total-entries-container">
            <h2>Total Entries</h2>
            <p>{totalEntries}</p>
        </div>
        <div className='chart-container'>
            <h2>Data View</h2>
            <div className='chart'>
                <Line data={chartData} options={{
                    maintainAspectRatio:false,
                    responsive:true,
                    plugins:{
                        legend:{position:'top'},
                        tooltip:{ callbacks: {label: (tooltipItem) => `Value:${tooltipItem.raw}`}}
                    },
                
                }}></Line>
            </div>
        </div>
        </div>
        <div className="data-table-container">
            <h2>Data Table</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item =>(
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.value}</td>
                            <td>
                                <button onClick={() => handleEdit(item)} className='edit-button'>Edit</button>
                                <button onClick={() => handleDelete(item._id)} className='delete-button'>Delete</button>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    
  )
}

export default Dashboard
