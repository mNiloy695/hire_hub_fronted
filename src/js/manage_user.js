const handle_user=async()=>{

    const user_table=document.getElementById('user')
    user_table.innerHTML=""
    const users_promise=await fetch(`https://hire-hub-bsf2.vercel.app/account/registration/`)
    if(users_promise.ok){
        const users=await users_promise.json()
        users.forEach((user)=>{
               if(user.type!='admin'){
                user_table.innerHTML+=`
                <tr class="border-b text-black border-gray-600 hover:bg-gray-100">
                      <td class="py-3 px-6 text-center">${user.id}</td>
                     
                      <td class="py-3 px-6 text-center">${user.first_name+" "+user.last_name}</td>
                      <td class="py-3 px-6 text-center">${user.email}</td>
                      <td class="py-3 px-6 text-center">
                      <select id="update${user.id}" onchange=update_user_type(${user.id})>
                       <option value='${user.type}' selected>${user.type}</option>
                       <option value="Viewer">Viewer</option>
                       <option value="Job Seeker">Job Seeker</option>
                       <option value="Employee">Employee</option>
                      </select>
                      </td>
                      <td class="py-3  px-6 text-center"><button class='p-[10px_15px] bg-red-600'onclick='delete_user(${user.id})'>Delete</button></td>
                      
            </tr>
               `
               }
        })
    }

}

handle_user()

const delete_user=async(id)=>{
    const token=localStorage.getItem('token')
    try{
        const del_user=await fetch(`https://hire-hub-bsf2.vercel.app/account/${id}/`,
            {
                method:"DELETE",
                headers:{
                    "Authorization":`Token ${token}`,
                }
            }
          
        )
        if(del_user.ok){
            window.location.href='./manage_user.html'
        }
    }
    catch(err){
        console.log(err)
    }
    
}

const update_user_type=async(u_id)=>{
    const token=localStorage.getItem('token')
    const selected_value=document.getElementById(`update${u_id}`).value
    console.log(u_id)
    console.log(selected_value)
    try{
        const user=await fetch(`https://hire-hub-bsf2.vercel.app/account/${u_id}/`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json",
                "Authorization":`Token ${token}`
            },
            body:JSON.stringify({type:selected_value,}),
        })
        if(user.ok){
            window.location.href="./manage_user.html"
        }
    }
    catch(err){
        console.log(err)
    }

}