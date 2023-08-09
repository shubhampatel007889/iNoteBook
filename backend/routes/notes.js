const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes')
const {body, validationResult } = require('express-validator');

//Route 1 : get all the notes using : GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try{
        const notes = await Note.find({user:req.user.id});
        res.json(notes)
    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

//Route 2 : add all the notes using : GET "/api/notes/addnotes"
router.post('/addnotes',fetchuser,[
    body('title').isLength({min:3}),
    body('description').isLength({min:5})
    
],async(req,res)=>{
    try {
        
    
        const {title,description,tag} = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()})
        }
        const note = new Note({
            title,description,tag, user : req.user.id 
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

//Route 3 : Upadate the notes using : GET "/api/notes/addnotes"
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
    try {
        const newNote = {}
        if (title){newNote.title=title}
        if (description){newNote.description=description}
        if (tag){newNote.tag=tag}

        //find note to be upadted
        let note = await Note.findById(req.params.id)
        if (!note){res.status(404).send("Not found")}
        if (note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    
    }
    
})

//Route 4 : Delete the notes using : DELETE "/api/notes/addnotes"
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
    
    try {
        let note = await Note.findById(req.params.id)
        if (!note){res.status(404).send("Not found")}

        //Allows deletion if user owns it
        if (note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Sucess note has been deleted",note:note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
    //find note to be deleted
    
})

module.exports = router;