const express=require('express')
const router=express.Router()
const Data=require('../models/Data')


router.get('/',async(req,res) =>{
  try{
    const data=await Data.find()
    res.json(data)
   
  }catch(error){
    res.status(500).json({message:error.message})
  }
})

router.post('/add', async(req,res) =>{
  const { name,value} =req.body;
  const newData=new Data( {name,value})
  try{
    const saveData=await newData.save()
    res.status(201).json(saveData)
  }catch(error){
    res.status(400).json({message:error.message})
  }
})

router.put('/:id', async(req,res) =>{
  try{
    const updateData= await Data.findByIdAndUpdate(req.params.id,req.body, {new:true})
    if(!updateData){
      return res.status(404).json({message:"Data not found"})
    }
    res.json(updateData)
  }catch(error){
    res.status(500).json({message:error.message})
  }
})

router.delete('/:id',async(req,res) =>{
  try{
    const deleteData= await Data.findByIdAndDelete(req.params.id)
    if(!deleteData){
      return res.status(404).json({message:"Data not found"})
    }
    res.json({message:"Data deleted successfully"})
  }catch(error){
    res.status(400).json({message:error.message})
  }
})

module.exports=router