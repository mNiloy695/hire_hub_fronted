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
            <div class='shadow-md flex  flex-col md:flex-row md:w-[80%] w-[90%] p-5  mx-auto gap-[20px] items-center rounded-lg   bg-white leading-6'>
                <img class='rounded-[10px] size-[120px]' src="${logo}" alt="">
                <div class='flex m-4 md:flex-row flex-col w-[100%] justify-between'>
                <div>
                
                <h1 class='font-semibold text-xl md:text-2xl'>${job.title}</h1>
                <p class='font-sans'><h1 class=" font-semibold"><i class=" text-green-600 fa-solid m-1 fa-box"></i> Description</h1>  ${job.discriptions.substring(0, 40)}</p>
                <p><h1 class="font-semibold"><i class=" text-green-600 fa-solid m-1 fa-info"></i>Requrements</h1> ${job.requirements.substring(0, 40)}</p>
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
load_all_job()