const Course = require('../models/course-model');

/**
 * Function to create a post on the database
 */
createCourse = (req, res) => {

    // parsing body
    const body = req.body;
    // error checking
    if (!body) {
        return res.status(401).json({
            success: false,
            error: 'You must provide a post',
        });
    }

    let course_data = {
        name: body.name
    };

    // create curve model
    const course = new Course(course_data);

    // error checking if curve model was successfully created
    if (!course) {
        console.error('Failed to create new Course');
        return res.status(401).json({ success: false, error: "Failed in creating new Course" });
    }

    // saving the curve to the database
    course
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                message: 'Course created!',
            });
        })
        .catch((error) => {
            console.log('Course not created!');
            console.error(error);
            return res.status(400).json({
                error,
                message: 'Course not created!',
            });
        });
}

getCourses = async (req, res) => {

    await Course.find({}, (err, courses) => {
        // error handling
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        // result checking
        if (!courses.length) {
            return res
                .status(402)
                .json({ success: false, error: `Courses not found` });
        }
        // return posts
        return res.status(200).json({ success: true, data: courses });

    }).catch(err => console.log(err));
}


module.exports = {
    createCourse,
    getCourses,
}