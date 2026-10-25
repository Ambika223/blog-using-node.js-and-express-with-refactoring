const blogs = require('../data/blogdata');


//GET ALL
const getAllBlog = (req, res) => {
    try {
        res.status(200).json({
            data: blogs,
            success: true
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error while fetching blogs",
            success: false
        })
    }
}

//Get single
const getSingleBlog = (req, res) => {
    try {
        const id = Number(req.params.id);
        const blog = blogs.find(blog => blog.id === id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                success: false
            })
        }
        res.status(200).json({
            data: blog,
            success: true
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error while fetching single blog",
            success: false
        })
    }
}

//CREATE
const createBlog = (req, res) => {
    try {
        const { title, description, author, isPublished } = req.body;

        if (!title || !description || !author) {
            return res.status(400).json({
                message: "Title, description and author are required",
                success: false
            });
        }

        let new_obj = {
            title: title,
            description: description,
            author: author,
            isPublished: isPublished ? true : false,
            id: Date.now()
        }

        blogs.push(new_obj);

        res.status(201).json({
            data: new_obj,
            message: "Blog created successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while creating blog",
            success: false
        });
    }
};


//UPDATE 
const updateBlog = (req, res) => {
    try {
        let update_id = Number(req.params.id);
        let getIndex = blogs.findIndex(blog => blog.id === update_id);
        if (getIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The blog with id ${update_id} is not found`
            })
        }
        let updated_blog = {
            ...blogs[getIndex],
            ...req.body,
            id: update_id
        }
        blogs[getIndex] = updated_blog;
        console.log("Updated Blog:", updated_blog);
        res.status(200).json({
            success: true,
            message: `The blog is updated successfully`,
            data: updated_blog,
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error while updating blog",
            success: false
        });
    }
}

const deleteBlog = (req, res) => {
    try {
        let delete_id = Number(req.params.id);
        let getIndex = blogs.findIndex(b => b.id === delete_id);
        if (getIndex === -1) {
            return res.status(404).json({
                msg: 'blog is not found',
                success: false,
            })
        }
        const deleteBlog = blogs.splice(getIndex, 1);
        res.status(200).json({
            success: true,
            message: `The blog is updated successfully`,
            data: deleteBlog[0],
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error while updating blog",
            success: false
        })

    }
}
module.exports = {
    getAllBlog,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
}