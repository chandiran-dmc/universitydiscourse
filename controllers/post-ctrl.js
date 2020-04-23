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
    const reportArraylimit = 3;

 
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
    

    Post.findOne(query, async (err, post) => {

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


        // deleting the post 
        if (reportArraylimit === body.reportCount) {
            await post.remove((err, post) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err });
                }
                if (!post) {
                    return res
                    .status(404)
                    .json({ success: false, error: `Post not found` });
                }
                console.log("SUCCESSFUL");
                return res.status(200).json({ success: true,  message: "POST DELETED" });
            })//.catch(err => console.log(err));
            console.log("DELETING");    
        } else {
         console.group("REACHES HERE");




        // Set new information for the post
        
        var i = 0;
        //var flag;
        
        console.log(i);
        
        // for (i = 0; i < body.reportCount - 1; i++) {
        //     console.log("CURRENT USER");
        //     console.log(body.report_user);
        //     console.log("EARLIER USER");
        //     console.log(body.reportArray[i]);
        //     if (body.reportArray[i].localeCompare(body.report_user) === 0) {
        //         console.log("COMES HERE");
        //         flag = -100; // user already found

        //     }
        // }
        // if (flag === -100) {
        //         return res.status(200).json({
                   
        //             err,
        //             reportArray: post.reportArray,
        //             reportCount: post.reportCount,
        //             message: 'User has already reported the post earlier, it is under review',
        //         });
   
        // }
        post.reportCount=body.reportCount;
        //post.reportArrayindex=body.reportArrayindex;
        post.reportArray.push(body.report_user);
        
        
        
        post.save()
            .then(() => {
                console.log("SUCCESS");
                //console.log(body.reportCount);
                return res.status(200).json({
                   
                    success: true,
                    reportArray: post.reportArray,
                    reportCount: post.reportCount,
                    id: post._id,
                    message: 'Report registered!',
                });
            })
            .catch(error => {
                console.log(error);
                return res.status(405).json({
                    error,
                    message: 'Report not registered!',
                });
            });
        }
    });


}




likePost = async (req, res) => {

 
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

        var i = 0;
        var flag;
        var mess;
        
        console.log(i);
        
        for (i = 0; i < body.likeCount - 1; i++) {
            console.log("CURRENT USER");
            console.log(body.like_user);
            console.log("EARLIER USER");
            console.log(body.likeArray[i]);
            if (body.likeArray[i].localeCompare(body.like_user) === 0) {
                console.log("COMES HERE");
                flag = -100; 

            }
        }

        if (flag === -100) {
            post.likeArray.remove(body.like_user);
            post.likeCount=body.likeCount-2;
            mess ="You have Unliked the post!";
    
        } else {
            mess = 'You have Liked the post!';
            post.likeCount=body.likeCount;
            console.log(body.like_user);
            post.likeArray.push(body.like_user);
        }
        
        post.save()
            .then(() => {
                console.log("SUCCESS");
                console.log(body.likeCount);
                return res.status(200).json({
                   
                    success: true,
                    id: post._id,
                    likeCount: post.likeCount,
                    likeArray: post.likeArray,
                    message: mess,
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

upvotePost = async (req, res) => {

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

        var i = 0;
        var flag;
        var mess;
        
        console.log(i);
        
        for (i = 0; i < body.upvoteCount - 1; i++) {
            console.log("CURRENT USER");
            console.log(body.like_user);
            console.log("EARLIER USER");
            console.log(body.upvoteArray[i]);
            if (body.upvoteArray[i].localeCompare(body.like_user) === 0) {
                console.log("COMES HERE");
                flag = -100; // user already found

            }
        }

        if (flag === -100) {
            post.upvoteArray.remove(body.like_user);
            post.upvoteCount=body.upvoteCount-2;
            mess = 'You have removed the Upvote on the post!';

        } else {
           post.upvoteCount=body.upvoteCount;
           console.log(body.like_user);
           post.upvoteArray.push(body.like_user);
           mess = 'You have Upvoted the post!';
        }

        
        
        post.save()
            .then(() => {
                console.log("SUCCESS");
                console.log(body.upvoteCount);
                return res.status(200).json({
                   
                    success: true,
                    id: post._id,
                    upvoteCount: post.upvoteCount,
                    upvoteArray: post.upvoteArray,
                    message: mess
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




downvotePost = async (req, res) => {

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

        var i = 0;
        var flag;
        var mess;
        
        console.log(i);
        
        for (i = 0; i < body.downvoteCount - 1; i++) {
            console.log("CURRENT USER");
            console.log(body.like_user);
            console.log("EARLIER USER");
            console.log(body.downvoteArray[i]);
            if (body.downvoteArray[i].localeCompare(body.like_user) === 0) {
                console.log("COMES HERE");
                flag = -100; // user already found

            }
        }

        if (flag === -100) {
            post.downvoteArray.remove(body.like_user);
            post.downvoteCount=body.downvoteCount-2;
            mess = 'You have removed the Downvote on the post!';
        } else {
           
            post.downvoteCount=body.downvoteCount;
            mess = 'You have Downvoted the post!';
            console.log(body.like_user);
            post.downvoteArray.push(body.like_user);

        }

        
        
        post.save()
            .then(() => {
                console.log("SUCCESS");
                console.log(body.downvoteCount);
                return res.status(200).json({
                   
                    success: true,
                    id: post._id,
                    downvoteCount: post.downvoteCount,
                    downvoteArray: post.downvoteArray,
                    message: mess
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




getPostById = async (req, res) => {
    
    console.log(req.query.id)
    await Post.findOne({ _id: req.query.id }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!post) {
            return res
                .status(405)
                .json({ success: false, error: `Post not found` })
        }
        return res.status(200).json({ success: true, data: post })
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

    }).catch(err => console.log(err));
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
    getPostById,
}