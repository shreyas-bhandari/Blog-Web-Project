const http = require('http');

const testEndpoint = (path, method, data) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};

async function runTests() {
  console.log("Testing API Gateway");
  try {
    const signup = await testEndpoint('/auth/signup', 'POST', { email: "user@test.com", password: "pwd" });
    console.log("Signup:", signup);

    const getBlogs = await testEndpoint('/blogs/', 'GET');
    console.log("Get Blogs:", getBlogs);

    const createBlog = await testEndpoint('/blogs/', 'POST', { title: "Test", content: "Test Content" });
    console.log("Create Blog:", createBlog);

  } catch (err) {
    console.error("Test Error:", err);
  }
}

runTests();
