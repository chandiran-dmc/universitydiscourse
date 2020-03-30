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







module.exports = {
    createComment,
    getComments,
    updateComment
}