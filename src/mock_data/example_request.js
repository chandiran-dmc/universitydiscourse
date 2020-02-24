const axios = require('axios').default;

export default hello = axios({
    method: 'post',
    url: 'http://localhost:3000/',
    data: {
        // Pid should be a unique value by hashing the time + username
        pid: 400,
        title: "tae yoon fuck you",
        user: "tae",
        type: "text",
        tag: ["cs240", "cs252"],
        count: 100,
        comments: [],
        content: "fuck you",
    }
})
.then((response) => {
    console.log(response);
});