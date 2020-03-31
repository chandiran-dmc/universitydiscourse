const Comment = require('../models/comment-model');

/**
 * Function to create a Comment on the database
 */
createComment = (req, res) => {
    console.log("createComment function called");

    // parsing body
    const body = req.body;
    // error checking
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a comment',
        });
    }

    // create comment model
    const comment = new Comment(body);

    // error checking if comment model was successfully created
    if (!comment) {
        return res.status(400).json({ success: false, error: err });
    }

    // saving the comment to the database
    comment
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                //id: comment.id,
                message: 'Comment created!',
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'Comment not created!',
            });
        });
}

getComments = async (req, res) => {

    await Comment.find({}, (err, comments) => {
        // error handling
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        // result checking
        if (!comments.length) {
            return res
                .status(402)
                //.json({ success: false, error: `Posts not found` });
        }
        // return posts
        return res.status(200).json({ success: true, data: comments });

    }).catch(err => console.log(err))
}


updateComment = async (req, res) => {

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
            {_id: body._id}
        ]
    };

    Comment.findOne(query, (err, comment) => {

        // Comment not found
        if (err) {
            return res.status(404).json({
                err,
                message: 'Error occurred!',
            });
        }

        // Comment not found
        if (!comment) {
            return res.status(401).json({
                err,
                message: 'Comment not found',
            });
        }

        // Set new information for the comment
        comment.content = body.content;
        comment
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: comment._id,
                    message: 'Comment updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Comment not updated!',
                });
            });
    });
}


deleteComment = async (req, res) => {

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
            {_id: body._id}
        ]
    };

    Comment.findOne(query, (err, comment) => {

        // Comment not found
        if (err) {
            return res.status(404).json({
                err,
                message: 'Error occurred!',
            });
        }

        // Comment not found
        if (!comment) {
            return res.status(401).json({
                err,
                message: 'Comment not found',
            });
        }

        // Set new information for the comment
        comment.content = body.content;
        comment
            .remove()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: comment._id,
                    message: 'Comment updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Comment not updated!',
                });
            });
    });
}

likeComment = async (req, res) => {

 
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

    Comment.findOne(query, (err, comment) => {

        // Post not found
        if (err) {
            console.log(err);
            return res.status(404).json({
                err,
                message: 'Error occurred!',
            });
        }

        // Comment not found
        if (!comment) {
            console.log(err);
            return res.status(401).json({
                
                err,
                message: 'Comment not found',
            });
        }

        var i = 0;
        var flag;
        
        console.log(i);
        
        for (i = 0; i < body.likeCountComment - 1; i++) {
            console.log("CURRENT USER");
            console.log(body.like_user);
            console.log("EARLIER USER");
            console.log(body.likeArrayComment[i]);
            if (body.likeArrayComment[i].localeCompare(body.like_user) === 0) {
                console.log("COMES HERE");
                flag = -100; // user already found

            }
        }

        if (flag === -100) {
            return res.status(200).json({
               
                err,
                message: 'User has already liked the comment',
                likeCountComment: comment.likeCountComment,
                likeArrayComment: comment.likeArrayComment,
            });

        }

        // Set new information for the post
        comment.likeCountComment=body.likeCountComment;
        //post.reportArrayindex=body.reportArrayindex;
        console.log(body.like_user);
        comment.likeArrayComment.push(body.like_user);
        
        comment.save()
            .then(() => {
                console.log("SUCCESS");
                console.log(body.likeCountComment);
                return res.status(200).json({
                   
                    success: true,
                    id: comment._id,
                    likeCountComment: comment.likeCountComment,
                    likeArrayComment: comment.likeArrayComment,
                    message: 'You have liked the comment!',
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

upvoteComment = async (req, res) => {

 
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

    Comment.findOne(query, (err, comment) => {

        // Post not found
        if (err) {
            console.log(err);
            return res.status(404).json({
                err,
                message: 'Error occurred!',
            });
        }

        // Comment not found
        if (!comment) {
            console.log(err);
            return res.status(401).json({
                
                err,
                message: 'Comment not found',
            });
        }

        var i = 0;
        var flag;
        
        console.log(i);
        
        for (i = 0; i < body.upvoteCountComment - 1; i++) {
            console.log("CURRENT USER");
            console.log(body.like_user);
            console.log("EARLIER USER");
            console.log(body.upvoteArrayComment[i]);
            if (body.upvoteArrayComment[i].localeCompare(body.like_user) === 0) {
                console.log("COMES HERE");
                flag = -100; // user already found

            }
        }

        if (flag === -100) {
            return res.status(200).json({
               
                err,
                message: 'User has already upvoted the comment',
                upvoteCountComment: comment.upvoteCountComment,
                upvoteArrayComment: comment.upvoteArrayComment,
            });

        }

        // Set new information for the post
        comment.upvoteCountComment=body.upvoteCountComment;
        //post.reportArrayindex=body.reportArrayindex;
        console.log(body.like_user);
        comment.upvoteArrayComment.push(body.like_user);
        
        comment.save()
            .then(() => {
                console.log("SUCCESS");
                console.log(body.upvoteCountComment);
                return res.status(200).json({
                   
                    success: true,
                    id: comment._id,
                    upvoteCountComment: comment.upvoteCountComment,
                    upvoteArrayComment: comment.upvoteArrayComment,
                    message: 'You have upvoted the comment!',
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

downvoteComment = async (req, res) => {

 
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

    Comment.findOne(query, (err, comment) => {

        // Post not found
        if (err) {
            console.log(err);
            return res.status(404).json({
                err,
                message: 'Error occurred!',
            });
        }

        // Comment not found
        if (!comment) {
            console.log(err);
            return res.status(401).json({
                
                err,
                message: 'Comment not found',
            });
        }

        var i = 0;
        var flag;
        
        console.log(i);
        
        for (i = 0; i < body.downvoteCountComment - 1; i++) {
            console.log("CURRENT USER");
            console.log(body.like_user);
            console.log("EARLIER USER");
            console.log(body.downvoteArrayComment[i]);
            if (body.downvoteArrayComment[i].localeCompare(body.like_user) === 0) {
                console.log("COMES HERE");
                flag = -100; // user already found

            }
        }

        if (flag === -100) {
            return res.status(200).json({
               
                err,
                message: 'User has already downvoted the comment',
                downvoteCountComment: comment.downvoteCountComment,
                downvoteArrayComment: comment.downvoteArrayComment,
            });

        }

        // Set new information for the post
        comment.downvoteCountComment=body.downvoteCountComment;
        //post.reportArrayindex=body.reportArrayindex;
        console.log(body.like_user);
        comment.downvoteArrayComment.push(body.like_user);
        
        comment.save()
            .then(() => {
                console.log("SUCCESS");
                console.log(body.downvoteCountComment);
                return res.status(200).json({
                   
                    success: true,
                    id: comment._id,
                    downvoteCountComment: comment.downvoteCountComment,
                    downvoteArrayComment: comment.downvoteArrayComment,
                    message: 'You have downvoted the comment!',
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







module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment,
    likeComment,
    upvoteComment,
    downvoteComment
}