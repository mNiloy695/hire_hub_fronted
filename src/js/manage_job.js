const manage_job=async()=>{
    const manage_id=document.getElementById('manage_job')
    manage_id.innerHTML=''
    try{
     const jobs_promise=await fetch(`https://hire-hub-bsf2.vercel.app/job/list/`)
     
     if(jobs_promise.ok){
        
        const jobs=await jobs_promise.json()
        console.log(jobs)
        jobs.forEach(job => {
            manage_id.innerHTML+=`
                    <tr>
                    <td class="py-3 px-6 text-center">${job.title}</td>
                    <td class="py-3 px-6 text-center">${job.job_type}</td>
                    <td class="py-3 px-6 text-center">${job.location}</td>
                    <td class="py-3  px-6 text-center"><button class='p-[10px_15px] bg-red-600'onclick='delete_job(${job.id})'>Delete</button></td>
                    </tr>
            `
        });
     } 
    }
    catch(err){
        console.log("err ",err)
    }
}
manage_job()