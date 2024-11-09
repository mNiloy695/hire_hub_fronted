const post_job=async(event)=>{
    event.preventDefault()
    const form=document.getElementById('post_job_form')
    const formData=new FormData(form)
    const token=localStorage.getItem('token')
    const user=localStorage.getItem('id')
    const selected_company_promise=await fetch(`https://hire-hub-bsf2.vercel.app/account/${user}/`)
    const job_type=document.getElementById('job_type').value
    const time=document.getElementById('time').value
    const cmp=await selected_company_promise.json()
    console.log(cmp)
    console.log(cmp)
    const job={
        user:parseInt(user),
        title:formData.get('title'),
        company_name:cmp.company,
        discriptions:formData.get('discriptions'),
        requirements:formData.get('requirements'),
        location:formData.get('location'),
        job_type:job_type,
        time:time,

    }
    console.log(job)
    const post=await fetch(`https://hire-hub-bsf2.vercel.app/job/list/`,{
        method:'POST',
        headers:{'Content-Type':'application/json',
            "Authorization":`Token ${token}`,
        },
        body:JSON.stringify(job),
    })
    if(post.ok){

        const post_res=await post.json()
        console.log(post_res)
        window.location.href='./posted_job.html'
    }
    
}

const posted_job_filer=async()=>{
    const posted_job=document.getElementById('posted_job')
     posted_job.innerHTML=""
    const token=localStorage.getItem('token')
    const user=localStorage.getItem('id')
    console.log(user)
    const fectch_posted_job=await fetch(`https://hire-hub-bsf2.vercel.app/job/list/?employee_id=${user}`,{
      method:'GET',
      headers:{"Authorization":`Token ${token}`,},
    })
    if(fectch_posted_job.ok){
      const posted_job_json=await fectch_posted_job.json()
      console.log(posted_job)
     for(job of posted_job_json){
      console.log(job)
      const job_for_name=await fetch(`https://hire-hub-bsf2.vercel.app/job/${job.id}/`,{
        method:'GET',
        headers:{"Authorization":`Token ${token}`}
      })
      if(job_for_name.ok){
        const job_response=await job_for_name.json()
        console.log(job_response.title)
        console.log(job_response.id)
        posted_job.innerHTML+=`
        <tr class="border-b text-black border-gray-600 hover:bg-gray-100">
                      <td class="py-3 px-6 text-center">${job_response.title}</td>
                      <td class="py-3 px-6 text-center">${job.job_type}</td>
                      <td class="py-3 px-6 text-center">${job.date}</td>
                      <td class="py-3 px-6 text-center">${job.time}</td>
                      <td class="py-3  px-6 text-center"><button class='p-[10px_15px] bg-red-600'onclick='delete_job(${job_response.id})'>Delete</button></td>
                      
        </tr>
     `
      }
      else{
        console.log("job api not fetch")
      }
     
     }
    }
    else{
      console.log('fectch_posted_job api not fethed')
    }
  }
  
  posted_job_filer()


const  delete_job=async(id)=>{
  const user_id=localStorage.getItem('id')
  const token=localStorage.getItem('token')
  const type=localStorage.getItem('type')
  const job_promise=await fetch(`https://hire-hub-bsf2.vercel.app/job/${id}/`,{
    method:"DELETE",
    "Authorization":`Token ${token}`
  })
  if(job_promise.ok)
  {
    const p=await job_promise.json()
    console.log(p)
    if(type=='admin'){
      window.location.href='./manage_job.html'
    }else{
      window.location.href='./posted_job.html'
    }
  }
  else{
    console.log("job not deleted")
  }
 

}