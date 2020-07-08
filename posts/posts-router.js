const express = require('express')
const Posts = require('../data/db')
const router = express.Router();

// urls being with /api/posts/
router.get('/', async (req, res) => {
  try {
    const post = await Posts.find(req.query);
    res.status(200).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const post = await Posts.add(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The hub has been nuked' });
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  }
});

//get /api/posts/123/messages
router.get('/:id/messages', (req,res)=>{
  Posts.findById(req.params.id)
  .then(messages=>{
    res.status(200).json(messages);
  })
  .catch(err=>{
    res.status(500).json(err);
  })
})
//rewrite
// server.get('/', (req, res) => {
//   res.send(`
//     <h2>Lambda Hubs API</h>
//     <p>Welcome to the Lambda Hubs API</p>
//   `);
// });
// server.get('/api/posts', async (req,res)=>{
//   try{
//     const posts = await Posts.find(req.query);
//     res.status(200).json(posts);
//   }catch(error){
//     //log error to database
//     console.log(error);
//     res.status(500).json({
//       message:'Error getting POSTS',
//     });
//   }
// });
// server.get('/api/posts/:id', async(req,res)=>{
//   try{
//     const post = await Posts.findById(req.params.id);
//     if(post){
//       res.status(200).json(post);
//     }else{
//       res.status(404).json({message:'Post not found'});
//     }
//   }catch(error){
//     //log error to database
//     console.log(error);
//     res.status(500).json({
//       message:'error getting post',
//     });
//   }
// });
// //server post to /api/posts
// server.post('/api/posts', async(req,res)=>{
//   try{
//     const post = await Posts.add(req.body);
//     res.status(201).json(post);
//   }catch(error){
//     //log error to database
//     console.log(error);
//     res.status(500).json({
//       message:'Error adding post',
//     });
//   }
// });

// server.delete('/api/posts/:id', sync(req,res)=>{
//   try{
//     const count = await Posts.remove(req.params.id);
//     if (count >0){
//       res.status(200).json({message: 'The POST has been deleted'});
//     }else{
//       res.status(404).json({message:'The POST could not be found'})
//     }catch(error){
//       //log error to database
//       console.log(error);
//       res.status(500).json({ message:'Error removing the post',});
//     }
//   }
// })

// server.put('/api/posts/:id', async(req,res)=>{
//   try{
//     const post = await Posts.update(req.params.id, req.body);
//     if (post){
//       res.status(200).json(post);
//     }else{
//       res.status(404).json({message:'The hub could not be found'});
//     }
//   }catch(error){
//     //log error to database
//     console.log(error);
//     res.status(500).json({
//       message:"error updating the post"
//     });
//   }
// });

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

module.exports = router;


