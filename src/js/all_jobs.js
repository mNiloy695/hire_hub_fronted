const load_all_job=async()=>{
    const all_job=document.getElementById('all-jobs')
    all_job.innerHTML=""    
  const jo=await fetch(`https://hire-hub-bsf2.vercel.app/job/list/`)
  const jobs=await jo.json()
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
            <div class='shadow-md flex  flex-col md:flex-row md:w-[80%] w-[90%] p-5  mx-auto gap-[20px] items-center rounded-lg   bg-white '>
                <img class='rounded-[10px] size-[120px]' src="${logo}" alt="">
                <div class='flex md:flex-row flex-col w-[100%] justify-between'>
                <div>
                
                <h1 class='font-bold text-xl md:text-2xl'>${job.title}</h1>
                <p><h1 class="font-bold">Description</h1> <i class="fa-solid m-1 fa-box"></i> ${job.discriptions.substring(0, 40)}</p>
                <p><h1 class="font-bold"><i class="fa-solid m-1 fa-info"></i>Requrements</h1> ${job.requirements.substring(0, 40)}</p>
                </div>
              <div>
                <p><h1 class="font-bold"><i class="fa-solid fa-location-dot m-1"></i> Location</h1> ${job.location}</p>
                <p><h1 class="font-bold"><i class="fa-regular fa-clock m-1"></i> Type</h1> ${job.job_type}</p>
                <a href='single_job_details.html?id=${job.id}'><button class='rounded-lg px-4 py-2 mt-3 me-2 text-center outline outline-offset-2 outline-1 hover:bg-blue-400 hover:outline-blue-800 bg-gray-300 font-semibold'>View</button></a>
                <button class='rounded-lg px-4 py-2 mt-3 text-center outline outline-offset-0 outline-1 hover:outline-blue-800  hover:bg-blue-400 font-semibold bg-gray-300'  onclick='apply_for_job(${job.id})'>Apply Now</button>
              </div>
              
            </div>
            
           
        `
 };

}
load_all_job()