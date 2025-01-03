const single_job_detals=async()=>{
    const id=new URLSearchParams(window.location.search).get('id')
    console.log(id)
    const all_job=document.getElementById('all-jobs')
    const req_des=document.getElementById('req-des')
    req_des.innerHTML=""
    all_job.innerHTML=""    
    const jo=await fetch(`https://hire-hub-bsf2.vercel.app/job/${id}/`)
    const job=await jo.json()
      
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
              <div class='shadow-md flex  flex-col md:flex-row md:w-[80%] w-[90%] p-6  mx-auto gap-[20px] items-center rounded-lg   bg-white '>
                  <img class='rounded-[10px] size-[120px]' src="${logo}" alt="">
                  <div class='flex md:flex-row flex-col w-[100%] justify-between'>
                  <div>
                  
                  <h1 class='font-bold m-4 text-xl md:text-2xl'>${job.title}</h1>
                  <h1 class='font-bold m-4 text-xl md:text-2xl'>${job.time}</h1>
                 
                  </div>
                <div>
                  <p><h1 class="font-bold"><i class="fa-solid text-green-600 fa-location-dot m-1"></i> Location</h1> ${job.location}</p>
                  <p><h1 class="font-bold"><i class="fa-regular text-green-600 fa-clock m-1"></i> Type</h1> ${job.job_type}</p>
                  <button class='rounded-lg px-4 py-2 mt-3 text-center bg-green-600'  onclick='apply_for_job(${job.id})'>Apply Now</button>
                 
                </div>
                
              </div>
              
             
          `
          
          req_des.innerHTML=`
           <div class='shadow-md  text-wrap overflow-hidden  md:w-[80%] w-[100%] m-2 p-3  mx-auto  rounded-lg   bg-white '>
           <p class='text-wrap'><h1 class="font-bold"><i class="fa-solid text-green-600 px-2 fa-box overflow-hidden"></i> Description</h1>  ${job.discriptions}</p>
                <p class='text-wrap overflow-hidden p-2'><h1 class="font-bold"><i class="text-green-600 fa-solid m-2 fa-info "></i>Requrements</h1> ${job.requirements}</p>
                <button class='rounded-lg px-4 py-2 mt-3 text-center bg-green-600'  onclick='apply_for_job(${job.id})'>Aplly Now</button>
                </div>
            
        </div>
        
          `
   
};


single_job_detals()