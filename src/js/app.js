const tbody = document.getElementById("tbody")
const list = document.getElementById("tr")
const deleteBtn = document.getElementById("delete-btn")
const submitBtn = document.querySelector(".submit-btn")




const editBtn = document.getElementById("edit-btn")
const name = document.getElementById("name")
const age = document.getElementById("age")
const address = document.getElementById("address")
const email = document.getElementById("email")

const addBtn = document.getElementById("add-btn")


let userId;
let editedData;


document.addEventListener('DOMContentLoaded', function () {
    async function getData() {
        try {
            const response = await fetch("https://task-dev-kom.vercel.app/api/all-friends")
            const data = await response.json()
            console.log(data);


            data.forEach((item, index) => {
                tbody.innerHTML += `
                 <tr class="tr"> 
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.adress}</td>
            <td>${item.email}</td>
            <td>
            <button id="delete-btn" student-id=${item._id}>delete</button>
            <button id="edit-btn" student-id=${item._id}>edit</button>
            </td>
            </tr>
                `
            })



            document.querySelectorAll("#edit-btn").forEach(item => {
                item.addEventListener("click", e => {
                   userId = e.target.attributes["student-id"]
                   const studentData = data.find(val => userId.value === val._id)
                   console.log(studentData);
                   console.log(name);
                   
                    if (studentData) {
                        document.getElementById("edit-name").value = studentData.name;
                        document.getElementById("edit-age").value  = studentData.age;
                        document.getElementById("edit-address").value= studentData.adress;
                        document.getElementById("edit-email").value = studentData.email;
                        
                    }

                   
                    
                document.querySelector(".modal-overlay").style.display = "block"
                submitBtn.addEventListener("click", e =>{
                    console.log(userId.value);
                    const updatedData ={
                        adress: document.getElementById("edit-address").value,
                        age:  document.getElementById("edit-age").value,
                        email: document.getElementById("edit-email").value,
                        name:  document.getElementById("edit-name").value,
                    }
                        updateData(userId.value, updatedData)
                      
                        
                        
                        
                        
                       
                        
                    
                }
    
                )
                    
                })
               
            })
           
           

            document.querySelectorAll("#delete-btn").forEach(item => {
                item.addEventListener('click', e => {
                    userId = e.target.attributes['student-id'].value
                })
            })


        } catch (error) {

        }
    }
    getData()

    addBtn.addEventListener('click', e => {
        e.preventDefault()
        const userNameVal = document.getElementById('name').value
        const age = document.getElementById('age').value
        const address = document.getElementById('address').value
        const email = document.getElementById('email').value

        const data = {
            name: userNameVal,
            adress: address,
            age: age,
            email: email,
        }

        postFunction(data)



    })





})



async function postFunction(data) {
    try {
        const response = await fetch("https://task-dev-kom.vercel.app/api/add-friend-details", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        })

        console.log(response);


    } catch (error) {
        console.log(error);

    }
}


async function updateData(id, data) {
    try {
        const response = await fetch(`https://task-dev-kom.vercel.app/api/update-friend/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data,)
            }

        )


    } catch (error) {

    }

}



async function deleteUser(id) {
    try {
        const response = await fetch(`https://task-dev-kom.vercel.app/api/delete-friend${id}`, {
            method: 'DELETE'
        })
    } catch (error) {

    }
}


    document.querySelectorAll(".close-btn").forEach(item => {
        item.addEventListener("click", e =>{
          const modal = item.closest(".modal-overlay")
          if(modal) {
            modal.style.display = "none"
          }
        
        })
    })
   