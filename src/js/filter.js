
const filter_all_job=async(cmp_id)=>{
  const all_job=document.getElementById('all-jobs')
  all_job.innerHTML=""    
const jo=await fetch(`https://hire-hub-bsf2.vercel.app/job/list/?company=${cmp_id?cmp_id:""}`)
const jobs=await jo.json()
if(jobs.length==0){
   
  all_job.innerHTML='<h1 class="text-center">No Data Found</h1>'
}
else{
  for(job of jobs) {
    const company=await fetch(`https://hire-hub-bsf2.vercel.app/job/companies/${job.company_name}/`)
    let logo;
   if(company.ok){
         const cmp=await company.json()
         logo=cmp.logo
   }else{
       logo='./images/cmp5.png'
   }
   all_job.innerHTML+=`
  <div class='flex flex-col m-2'>
            <div class='shadow-md flex  flex-col md:flex-row md:w-[80%] w-[90%] p-5  mx-auto gap-[20px] items-center rounded-lg   bg-white leading-6'>
                <img class='rounded-[10px] size-[120px]' src="${logo}" alt="">
                <div class='flex m-4 md:flex-row flex-col w-[100%] justify-between'>
                <div>
                
                <h1 class='font-semibold text-xl md:text-2xl'>${job.title}</h1>
                <p class='font-sans'><h1 class=" font-semibold"><i class=" text-green-600 fa-solid m-1 fa-box"></i> Description</h1>  ${job.discriptions.substring(0, 40)}</p>
                <p><h1 class="font-semibold"><i class=" text-green-600 fa-solid m-2 fa-info"></i>Requrements</h1> ${job.requirements.substring(0, 40)}</p>
                </div>
              <div>
                <p ><h1 class="font-semibold"><i class="fa-solid fa-location-dot m-1  text-green-600"></i> Location</h1> ${job.location}</p>
                <p><h1 class="font-bold "><i class="fa-regular font-semibold text-green-600 fa-clock m-1"></i> Type</h1> ${job.job_type}</p>
                <a href='single_job_details.html?id=${job.id}'><button class='rounded-lg px-4 py-2 mt-3 me-2 text-center outline outline-offset-2 outline-green-300 outline-1 hover:outline-green-300 bg-green-600 '>View</button></a>
                <button class='rounded-lg px-4 py-2 mt-3 text-center outline-green-300 outline-offset-2 outline-1 bg-green-600   hover:bg-green-600'  onclick='apply_for_job(${job.id})'>Apply Now</button>
              </div>
              
            </div>
           
          
       `
 };
}
 

   
  }


// Time wise filter
const filter_all_job_by_time=async(time)=>{
  const all_job=document.getElementById('all-jobs')
  all_job.innerHTML=""    
const jo=await fetch(`https://hire-hub-bsf2.vercel.app/job/list/?time=${time?time:""}`)
const jobs=await jo.json()
  if(jobs.length==0){
   
    all_job.innerHTML='<h1 class="text-center">No Data Found</h1>'
  }
else{
  for(job of jobs) {
    const company=await fetch(`https://hire-hub-bsf2.vercel.app/job/companies/${job.company_name}/`)
    let logo;
   if(company.ok){
         const cmp=await company.json()
         logo=cmp.logo
   }else{
       logo='./images/cmp5.png'
   }
   all_job.innerHTML+=`
   <div class='flex flex-col m-2'>
            <div class='shadow-md flex  flex-col md:flex-row md:w-[80%] w-[90%] p-5  mx-auto gap-[20px] items-center rounded-lg   bg-white leading-6'>
                <img class='rounded-[10px] size-[120px]' src="${logo}" alt="">
                <div class='flex m-4 md:flex-row flex-col w-[100%] justify-between'>
                <div>
                
                <h1 class='font-semibold text-xl md:text-2xl'>${job.title}</h1>
                <p class='font-sans'><h1 class=" font-semibold"><i class=" text-green-600 fa-solid m-1 fa-box"></i> Description</h1>  ${job.discriptions.substring(0, 40)}</p>
                <p><h1 class="font-semibold"><i class=" text-green-600 fa-solid m-2 fa-info"></i>Requrements</h1> ${job.requirements.substring(0, 40)}</p>
                </div>
              <div>
                <p ><h1 class="font-semibold"><i class="fa-solid fa-location-dot m-1  text-green-600"></i> Location</h1> ${job.location}</p>
                <p><h1 class="font-bold "><i class="fa-regular font-semibold text-green-600 fa-clock m-1"></i> Type</h1> ${job.job_type}</p>
                <a href='single_job_details.html?id=${job.id}'><button class='rounded-lg px-4 py-2 mt-3 me-2 text-center outline outline-offset-2 outline-green-300 outline-1 hover:outline-green-300 bg-green-600 '>View</button></a>
                <button class='rounded-lg px-4 py-2 mt-3 text-center outline-green-300 outline-offset-2 outline-1 bg-green-600   hover:bg-green-600'  onclick='apply_for_job(${job.id})'>Apply Now</button>
              </div>
              
            </div>`
 };
}
  }

const company_wise_filter=async()=>{
    // const location=document.getElementById('location-filter')
    const company=document.getElementById('company-filter')
    const companies=await fetch(`https://hire-hub-bsf2.vercel.app/job/companies/`)
    const response_companies=await companies.json()
    console.log(response_companies)
     response_companies.forEach(cmp => {

        company.innerHTML+=` 
        <li class='hover:cursor-pointer' onclick="filter_all_job(${cmp.id})"><i class="fa-solid fa-circle text-[6px] m-1"></i> ${cmp.name}</li>
        `;
    });
}
company_wise_filter()


const applied_job_filer=async()=>{
  const applied_job=document.getElementById('applied_job')
  applied_job.innerHTML=""
  const token=localStorage.getItem('token')
  const user_id=localStorage.getItem('id')
  const is_staff=localStorage.getItem('is_staff')
  const type=localStorage.getItem('type')
  let fectch_applied_job;
  if(type!='Employee'){
    fectch_applied_job =await fetch(`https://hire-hub-bsf2.vercel.app/job/apply/?user_id=${user_id}`,{
      method:'GET',
      headers:{"Authorization":`Token ${token}`,},
    })
  }
  else{
    fectch_applied_job =await fetch(`https://hire-hub-bsf2.vercel.app/job/apply/?job_user_id=${user_id}`,{
      method:'GET',
      headers:{"Authorization":`Token ${token}`,},
    })
  }
  if(type=='Employee'){
    const app=document.getElementById('applied')
    app.innerHTML+=`
    <th class="py-3 px-6 text-center">resume</th>
    `
  }
  if(fectch_applied_job.ok){
    const applied_job_json=await fectch_applied_job.json()
    console.log(applied_job_json)
   for(job of applied_job_json){
    console.log(job)
    const job_for_name=await fetch(`https://hire-hub-bsf2.vercel.app/job/${job.job}/`,{
      method:'GET',
      headers:{"Authorization":`Token ${token}`}
    })
    if(job_for_name.ok){
      const job_response=await job_for_name.json()
      console.log(applied_job_json.id)
     if(type=='Employee'){
     
      applied_job.innerHTML+=`
      <tr class="border-b border-gray-300 hover:bg-gray-100">
                    <td class="py-3 px-6 text-center">${job_response.title}</td>
                    
                    <td class="py-3 px-6 text-center"><select id='apply'  class='m-2 grow  p-5 shadow-md'  onchange='apply_model_update(${job.id})' name="type" id="type">
                   
                            <option value=${job.status}>${job.status}</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Accepted">Accepted</option>
                           </select></td>
                    <td class="py-3 px-6 text-center">${job.apply_date}</td>
                    <td class="py-3 px-6 text-center"><a href=${job.resume}'>${job.resume}</a></td>
      </tr>
   `
     }
     else{
      applied_job.innerHTML+=`
      <tr class="border-b border-gray-300 hover:bg-gray-100">
                    <td class="py-3 px-6 text-center">${job_response.title}</td>
                    <td class="py-3 px-6 text-center">${job.status}</td>
                    <td class="py-3 px-6 text-center">${job.apply_date}</td>
      </tr>
   `
     }
    }
    else{
      console.log("job api not fetch")
    }
   
   }
  }
  else{
    console.log('fectch_applied_job api not fethed')
  }
}

applied_job_filer()



