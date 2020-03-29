const Post = require('../models/post-model');

/**
 * Function to create a post on the database
 */
createPost = (req, res) => {
    console.log("createPost function called");

    // parsing body
    const body = req.body;
    console.log(body);
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
        console.log("baby tae tae");
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
            console.log(error);
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

removeAllPosts = async (req, res) => {

    // Parse body from the request
    const body = req.body;

    await Post.deleteMany({ user: body.user }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!post) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` });
        }

        return res.status(200).json({ success: true, data: post });
    }).catch(err => console.log(err));
}

reportPost = async (req, res) => {

 
    // Parse body from the request
    const body = req.body;

    console.log(body);
    

   
    
    if (!body) {
        console.log("NOOOO");
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    

    const query = {
        $and: [
            {user: body.user},
            {time: body.time}
        ]
    };

    Post.findOne(query, (err, post) => {

        // Post not found
        if (err) {
            console.log(err);
            return res.status(404).json({
                err,
                message: 'Error occurred!',
            });
        }

        // Post not found
        if (!post) {
            console.log(err);
            return res.status(401).json({
                
                err,
                message: 'Post not found',
            });
        }

        // Set new information for the post
        
        var i = 0;
        var flag;
        // var temp = 5;
        // for (;temp < 6; temp++){
        //     console.log("FOR CHECKING");

        // }
        console.log(i);
        
        for (i = 0; i < body.reportArrayindex; i++) {
            console.log("CURRENT USER");
            console.log(body.user);
            console.log("EARLIER USER");
            console.log(body.reportArray[i]);
            if (body.reportArray[i].localeCompare(body.user) === 0) {
                console.log("COMES HERE");
                flag = -100; // user already found

            }
        }
        if (flag === -100) {
                return res.status(200).json({
                   
                    err,
                    message: 'User has already reported the post',
                });
   
        }
        post.reportCount=body.reportCount;
        post.reportArrayindex=body.reportArrayindex;
        post.reportArray.push(body.user);
        
        
        
        post.save()
            .then(() => {
                console.log("SUCCESS");
                //console.log(body.reportCount);
                return res.status(200).json({
                   
                    success: true,
                    id: post._id,
                    message: 'Report registered 123!',
                });
            })
            .catch(error => {
                console.log(error);
                return res.status(405).json({
                    error,
                    message: 'Report not registered!',
                });
            });
    });

}

likePost = async (req, res) => {

 
    // Parse body from the request
    const body = req.body;

    console.log(body.likeCount);
    console.log(body.id);
    
    if (!body) {
        console.log("NOOOO");
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    const query = {
        $and: [
            {user: body.user},
            {time: body.time}
        ]
    };

    Post.findOne(query, (err, post) => {

        // Post not found
        if (err) {
            console.log(err);
            return res.status(404).json({
                err,
                message: 'Error occurred!',
            });
        }

        // Post not found
        if (!post) {
            console.log(err);
            return res.status(401).json({
                
                err,
                message: 'Post not found',
            });
        }

        // Set new information for the post
        post.likeCount=body.likeCount;
        
        post.save()
            .then(() => {
                console.log("SUCCESS");
                console.log(body.likeCount);
                return res.status(200).json({
                   
                    success: true,
                    id: post._id,
                    message: 'Like registered!',
                });
            })
            .catch(error => {
                console.log(error);
                return res.status(405).json({
                    error,
                    message: 'Like not registered!',
                });
            });
    });

}

downvotePost = async (req, res) => {

 
    // Parse body from the request
    const body = req.body;

    console.log(body.downvoteCount);
    console.log(body.id);
    
    if (!body) {
        console.log("NOOOO");
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    const query = {
        $and: [
            {user: body.user},
            {time: body.time}
        ]
    };

    Post.findOne(query, (err, post) => {

        // Post not found
        if (err) {
            console.log(err);
            return res.status(404).json({
                err,
                message: 'Error occurred!',
            });
        }

        // Post not found
        if (!post) {
            console.log(err);
            return res.status(401).json({
                
                err,
                message: 'Post not found',
            });
        }

        // Set new information for the post
        post.downvoteCount=body.downvoteCount;
        
        post.save()
            .then(() => {
                console.log("SUCCESS");
                console.log(body.downvoteCount);
                return res.status(200).json({
                   
                    success: true,
                    id: post._id,
                    message: 'Downvote registered!',
                });
            })
            .catch(error => {
                console.log(error);
                return res.status(405).json({
                    error,
                    message: 'Downvote not registered!',
                });
            });
    });

}
upvotePost = async (req, res) => {

 
    // Parse body from the request
    const body = req.body;

    console.log(body.upvoteCount);
    console.log(body.id);
    
    if (!body) {
        console.log("NOOOO");
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    const query = {
        $and: [
            {user: body.user},
            {time: body.time}
        ]
    };

    Post.findOne(query, (err, post) => {

        // Post not found
        if (err) {
            console.log(err);
            return res.status(404).json({
                err,
                message: 'Error occurred!',
            });
        }

        // Post not found
        if (!post) {
            console.log(err);
            return res.status(401).json({
                
                err,
                message: 'Post not found',
            });
        }

        // Set new information for the post
        post.upvoteCount=body.upvoteCount;
        
        post.save()
            .then(() => {
                console.log("SUCCESS");
                console.log(body.upvoteCount);
                return res.status(200).json({
                   
                    success: true,
                    id: post._id,
                    message: 'Upvote registered!',
                });
            })
            .catch(error => {
                console.log(error);
                return res.status(405).json({
                    error,
                    message: 'Upvote not registered!',
                });
            });
    });

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
                .status(402)
                .json({ success: false, error: `Posts not found` });
        }
        // return posts
        return res.status(200).json({ success: true, data: posts });

    }).catch(err => console.log(err))
}

module.exports = {
    reportPost,
    likePost,
    upvotePost,
    downvotePost,
    createPost,
    updatePost,
    removeAllPosts,
    getPosts,
    getMovieById,
}