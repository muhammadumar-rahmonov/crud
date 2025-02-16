const tbody = document.getElementById("tbody")
const list = document.getElementById("tr")
const deleteBtn = document.getElementById("delete-btn")
const editBtn = document.getElementById("edit-btn")
const name = document.getElementById("name")
const age = document.getElementById("age")
const address = document.getElementById("address")
const email = document.getElementById("email")
const addBtn = document.getElementById("add-btn")
const postForm = document.getElementById("inputs")

let userId;


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
                    const studentId = e.target.attributes['student-id']

                    const studentData = data.find(val => studentId.value === val._id)
                    if (studentData) {
                        name.value = studentData.address.email
                        userId = studentId.value
                    }
                })

            })

            document.querySelectorAll("#delete-btn").forEach( item =>{
                item.addEventListener('click', e => {
                    userId = e.target.attributes['student-id'].value
                })
            })


        } catch (error) {

        }
    }
    getData()

    postForm.addEventListener('submit', e => {
        e.preventDefault()
        const userNameVal = document.getElementById('name').value
        const age = document.getElementById('age').value
        const address = document.getElementById('address').value
        const email = document.getElementById('email')

        const data = {
            name: userNameVal, adress: address, age: age, email: email,
        }

        postFunction(data)

    })
    // console.log(postForm);

    


})



    // async function postFunction(data) {
    //     try {
    //         const response = await fetch("https://task-dev-kom.vercel.app/api/add-friend-details", {
    //             method: "POST",
    //             headers: { "Content-type": "aplication/json" },
    //             body: JSON.stringify(data)
    //         })

    //         console.log(data);


    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }
    // postFunction()


    async function updateData(id,data) {
        try {
            const response = await fetch(`https://task-dev-kom.vercel.app/api/update-friend${id}`,
                {
                    method: 'PUT',
                    headers: {'content-type': 'aplication/json'},
                    body: JSON.stringify(data,)
                }
            
            )
            
            
        } catch (error) {
            
        }

    }

    deleteBtn.addEventListener('click', e => {
        deleteUser(userId)
    })

    async function deleteUser(id) {
        try {
            const response = await fetch(`https://task-dev-kom.vercel.app/api/delete-friend${id}`,{
               method: 'DELETE'
            })
        } catch (error) {
            
        }
    }
