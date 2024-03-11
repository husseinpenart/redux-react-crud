const Post  = require('../model/post');

const get = async(req,res)=>{
   const result = await Post.find().sort({createdAt:'desc'})
   res.json(result)
}
const add = async(req,res)=>{
 try {
      const { title , body} = req.body
      const result  =  new Post({
        title,
        body
      })
      await result.save()
      res.json({
        result,
        message:'created successfully'
      })
 } catch (error) {
    console.log(error)
 }
}
const edit = async(req,res)=>{
  try {
      const postID= req.params.id
      const update = req.body
      const result = await Post.findByIdAndUpdate(postID , update)
      res.json({
        result,
        message:'updated successfully'
      })
 } catch (error) {
    console.log(error)
 }
}
const single = async(req,res)=>{
 try {
      const result = await Post.findById(req.params.id)
      res.json(result)
 } catch (error) {
    console.log(error)
 }
}
const deleteObj = async(req,res)=>{
 try {
       await Post.findByIdAndDelete(req.params.id)
      res.json(
    {    message:'deleted successfully'}
      )
 } catch (error) {
    console.log(error)
 }
}

module.exports = {
    get,
    add,
    edit,
    single,
    deleteObj
}