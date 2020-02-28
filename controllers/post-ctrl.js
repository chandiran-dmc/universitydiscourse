const Post = require('../models/post-model');

/**
 * Function to create a post on the database
 */
createPost = (req, res) => {
    console.log("createPost function called");

    // parsing body
    const body = req.body;
    // error checking
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a post',
        });
    }

    // create post model
    const post = new Post(body);

    // error checking if post model was successfully created
    if (!post) {
        return res.status(400).json({ success: false, error: err });
    }

    // saving the post to the database
    post
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: post.id,
                message: 'Post created!',
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'Post not created!',
            });
        });
}


/**
 * Function to update a post on the database
 */
updatePost = async (req, res) => {

    // Parse body from the request
    const body = req.body;

    // error checking
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    // Query for the appropriate post document
    const query = {
        $and: [
            {user: body.user},
            {time: body.time}
        ]
    };

    Post.findOne(query, (err, post) => {

        // Post not found
        if (err) {
            return res.status(404).json({
                err,
                message: 'Error occurred!',
            });
        }

        // Post not found
        if (!post) {
            return res.status(401).json({
                err,
                message: 'Post not found',
            });
        }

        // Set new information for the post
        post.title = body.title;
        post.content = body.content;
        post.tag = body.tag;
        post
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: post._id,
                    message: 'Post updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Post not updated!',
                });
            });
    });
}

deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getMovieById = async (req, res) => {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getPosts = async (req, res) => {
    await Post.find({}, (err, posts) => {
        // error handling
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        // result checking
        if (!posts.length) {
            return res
                .status(404)
                .json({ success: false, error: `Posts not found` });
        }
        // return posts
        return res.status(200).json({ success: true, data: posts });

    }).catch(err => console.log(err))
}

module.exports = {
    createPost,
    updatePost,
    deleteMovie,
    getPosts,
    getMovieById,
}