const Grade = require('../models/user-model');

/**
 * Function to create a post on the database
 */
createGrade = (req, res) => {

    // parsing body
    const body = req.body;
    // error checking
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a post',
        });
    }

    let grade_data = {
        course: body.title,
        user: body.user,
        score: body.content,
        grade: body.tag[0],
        time: body.time
    };

    console.log("> grade");
    console.log(grade_data);

    // create grade model
    const grade = new Grade(grade_data);

    // error checking if grade model was successfully created
    if (!grade) {
        return res.status(400).json({ success: false, error: err });
    }

    // saving the grade to the database
    grade
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: post.id,
                message: 'Grade created!',
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'Grade not created!',
            });
        });
}

getGrades = async (req, res) => {

    await Grade.find({}, (err, grades) => {
        // error handling
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        // result checking
        if (!grades.length) {
            return res
                .status(402)
                .json({ success: false, error: `Grades not found` });
        }
        // return grades
        return res.status(200).json({ success: true, data: grades });

    }).catch(err => console.log(err))
}

module.exports = {
    createGrade,
    getGrades,
}