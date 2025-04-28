const express = require("express");
const router = express.Router()
const userModel = require("../models/user")
const postModel = require("../models/post")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

router.get("/", (req,res)=> {
    res.send("hello from router")
})

router.get("/profile", isLoggedIN, async (req,res)=>{
    try {
        let loggedUser = req.user;
        let user = await userModel.findById(loggedUser.id).populate("posts")
        return res.json({success : true, user})
    } catch (error) {
        console.log(error.message);
        return res.json({success : false, message : "error"})
    }
})

router.get("/feed", isLoggedIN, async (req,res)=>{
  try {
    let postData = await postModel.find().populate("user");
    return res.json({success : true, myPost : postData})
  } catch (error) {
    console.log(error.message);
    return res.json({success : false, message : "error"})
  }
})

//liking the post
router.get("/like/:id", isLoggedIN, async (req, res) => {
  try {
    const loggedUser = req.user;
    const user = await userModel.findById(loggedUser.id);

    const post = await postModel.findById(req.params.id);
    if (!post) return res.json({ success: false, message: "Post not found" });

    const userIdStr = user._id.toString();
    const index = post.likes.findIndex(id => id.toString() === userIdStr);

    if (index === -1) {
      post.likes.push(user._id);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    return res.json({ success: true, message: "Liked status toggled" });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Error processing like" });
  }
});


// create user
router.post("/register", async (req,res)=>{
    try {

        let {firstName, lastName, email, password, gender, Date, Month, Year} = req.body;
        let user = await userModel.findOne({email})
        if(user) return res.json({success : false, message : "User already exists"});

        let hashedPassword = await bcrypt.hash(password, 10)
        await userModel.create({firstName, lastName, email, password : hashedPassword, gender, Date, Month, Year})
        return res.json({success : true, message : "User Created successfully!"});

    } catch (error) {
        console.log(error.message);
        return res.json({success : false, message : "error"})
    }
})

//login user
router.post("/login", async (req,res)=> {
    try {

        const {email, password} = req.body;
        let user = await userModel.findOne({email});
        if(!user) return res.json({success : false, message : "No user found!"})
        
        let result = await bcrypt.compare(password, user.password)
        if(!result){
            return res.json({success : false, message : 'Email or password is incorrect'})
        }else{
            let token = jwt.sign({id : user._id, email : user.email}, process.env.JWT_SECRET)
            res.cookie("token", token)
            return res.json({success : true, message : 'Login Successfull', token})
        }
    } catch (error) {
        console.log(error.message);
        return res.json({success : false, message : "error"})
    }
})

const storage = multer.diskStorage({
    destination : "uploads", 
    filename : (req, file, cb) =>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

// updating the profile page
const fs = require("fs");
const path = require("path");

router.post("/updateProfile", isLoggedIN, upload.single("profileImage"), async (req, res) => {
  try {
    const loggedUser = req.user;
    const user = await userModel.findById(loggedUser.id);
    if (!user) return res.json({ success: false, message: "User not found" });

    const { fatherName, school, address, about } = req.body;

    // Only update fields if they exist
    if (fatherName) user.fatherName = fatherName;
    if (school) user.school = school;
    if (address) user.address = address;
    if (about) user.about = about;

    // Handle image upload
    if (req.file && req.file.filename) {
      // Delete old image if it exists
      if (user.profileImage) {
        const oldImagePath = path.join(__dirname, "../uploads", user.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      user.profileImage = req.file.filename;
    }

    await user.save();

    return res.json({ success: true, message: "Profile updated successfully", user });

  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: "Error updating profile" });
  }
});

// create posts

router.post("/newPost", isLoggedIN, upload.single("postImage"), async (req, res) => {
  try {
    const loggedUser = req.user;
    const user = await userModel.findById(loggedUser.id);
    if (!user) return res.json({ success: false, message: "No User Found" });

    const { postDesc } = req.body;
    const postImage = req.file?.filename; // use optional chaining to avoid crash if file is not uploaded

    // Validation: Check if both are empty
    if (!postDesc && !postImage) {
      return res.json({ success: false, message: "Post must have either an image or a description." });
    }

    const post = await postModel.create({
      postDesc: postDesc || "", // fallback to empty string if undefined
      postImage: postImage || "",
      user: user._id
    });

    user.posts.push(post._id);
    await user.save();

    return res.json({ success: true, message: "Posted Successfully!" });

  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: "Error creating post" });
  }
});

  

// check whether user is logged in or not
function isLoggedIN(req, res, next) {
  
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ success: false, message: "Token missing. Please login!" });
      }
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data;
      next();
    } catch (error) {
      console.error("JWT error:", error.message);
      return res.status(403).json({ success: false, message: "Invalid token" });
    }
}
  

module.exports = router;