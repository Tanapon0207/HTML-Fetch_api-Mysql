const dataContainer = document.getElementById("data-container");

// Fetch user data
fetch("http://localhost:3030/users")
  .then(response => response.json())
  .then(data => {
    data.forEach(post => {
      const postElement = document.createElement("p");
      postElement.textContent = `
        ID: ${post.id} - First Name: ${post.firstname} - Last Name: ${post.lastname} - Username: ${post.username} - Password: ${post.password}
      `;
      dataContainer.appendChild(postElement);
    });
  })
  .catch(error => console.error(error));

// Add a submit event listener to the form to submit a new user
document.getElementById("add-recipe-form").addEventListener("submit", event => {
  event.preventDefault();
  
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3030/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstname,
      lastname,
      username,
      password
    })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("add-recipe-form").reset();
    
    const recipesList = document.querySelector("#recipe-list");
    const recipeHTML = `
      <li>
        <h2>${data.firstname}</h2>
        <p>${data.lastname}</p>
        <img src="${data.username}">
        <img src="${data.password}">
      </li>
    `;
    recipesList.insertAdjacentHTML("beforeend", recipeHTML);
  })
  .catch(error => console.error(error));
});



document.querySelector('#login-from').addEventListener('submit', function(event) {
  event.preventDefault(); // ป้องกันการโหลดหน้าใหม่เมื่อ submit

  const username = document.getElementById('login_username').value;
  const password = document.getElementById('login_password').value;

  
  const url = 'http://localhost:3030/login'; // URL ของเซิร์ฟเวอร์ที่จะส่งข้อมูลไป

  fetch(url, {
      method: 'POST', // ใช้เมธอด POST
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
  })
  .then(response => response.json()) // แปลงข้อมูลที่ได้รับกลับเป็น JSON
  .then(data => {
      console.log(data); // แสดงผลลัพธ์ที่ได้รับกลับมา
      // ทำสิ่งที่คุณต้องการต่อไป เช่น แสดงข้อความว่าล็อกอินสำเร็จ หรือ redirect ไปหน้าอื่น
  })
  .catch(error => {
      console.error('Error:', error); // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาดในการส่งข้อมูล
  });
});

