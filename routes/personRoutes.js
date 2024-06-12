const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
//POST To add Route
router.post('/',async(req,res)=>{
    try{
      const data= req.body //Assuming body contains data 
  
      const newPerson=new Person(data);
      
      const response =await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
         console.log(err);
         res.status(500).json({error : 'Internal Server Error'});
    }
    
  })

  // GET for Person 

  router.get('/',async(req,res)=>{
    try{
      const data=await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    } 
    catch(err){
     console.log(err);
     res.status(500).json({error : 'Internal Server Error'});
    }
 })
 
 //Worktype for person
 router.get('/:workType',async (req,res)=>{
    try{
      const workType= req.params.workType;
      if(workType=='chef' || workType=='waiter' || workType=='manager'){
         
        const response= await Person.find({work : workType});
        console.log('response fetched');
        res.status(200).json(response);
  
      }else{
        res.status(404).json({error : 'Invalid Work Type'});
      }
    } catch(err){
      console.log(err);
      res.status(500).json({error : 'Internal Server Error'});
  
    }
      
  })

   router.put('/:id',async(req,res)=>{
    try{
     const personId= req.params.id;  //Id sent through parameters
     const updatedPersonData=req.body;  //Data to be updated is sent through Body

     const response= await Person.findByIdAndUpdate(personId, updatedPersonData, {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
    });
       // if Id is not found or there is failed in updation
    if (!response) {
        return res.status(404).json({ error: 'Person not found' });
      }

    console.log('data Updated');
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error :'Internal Sevice Error'});
    }
   })

   //Delete Operation

   router.delete('/:id', async (req, res) => {
    try {
      const personId = req.params.id; // Extract the person's ID from the URL parameter
      const deletedPerson = await Person.findByIdAndDelete(personId);
  
      if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      // Send a success message as a JSON response
      res.json({ message: 'Person deleted successfully' });
    } catch (err) {
      console.error('Error deleting person:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  //command added
  
  module.exports = router;