'use strict';

const axios = require("axios");

let rawCollection = [];
let collection = [];
let abbreviations = ["CS", "MA", "ECON", "MGMT"];
// request
axios({
    method: 'get',
    url: "http://api.purdue.io/odata/Subjects"
}).then((response) => {
    // let queryResult = response.data.value;
    // for (let i = 0; i < queryResult.length; i++) {
    //     abbreviations.push(queryResult[i].Abbreviation);
    // }

    for (let i = 0; i < abbreviations.length; i++) {
        console.log(abbreviations[i]);
        let url = "http://api.purdue.io/odata/Courses?%24filter=Subject/Abbreviation%20eq%20%27" + abbreviations[i] + "%27&%24orderby=Number%20asc";
        axios({
            method: 'get',
            url: url
        }).then((response) => {
            let queryResult = response.data.value;

            queryResult.forEach(course => {
                let coursename = abbreviations[i] + course.Number;
                // coursename = coursename.substr(0, coursename.length-2);

                rawCollection.push(coursename);
                // get rid of duplicates
                if (collection.includes(coursename)) {
                    return;
                }
                collection.push(coursename);

                // send to database 
                axios({
                    method: 'post',
                    url: "http://localhost:3000/api/createcourse",
                    data: {
                        name: coursename
                    }
                }).catch((error) => {
                    console.error(error);
                    return;
                });
            });

            // console.log("raw : " + rawCollection.length);
            // console.log("uni : " + collection.length);
        }).catch((error) => {
            console.error(error);
            return;
        });
    }

}).catch((error) => {
    console.error(error);
    return;
});