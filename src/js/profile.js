const profile_data_load = async () => {
    // Get the form element
    const form = document.getElementById('profile_form');
    
    // Select the input field by its name
    const token=document.getElementById('token')
    const username = form.querySelector('input[name="username"]');
    const first_name=form.querySelector('input[name="f_name"]')
    const last_name=form.querySelector('input[name="l_name"]')
    const email=form.querySelector('input[name="email"]')
    const company=document.getElementById('company')
    const user_id=localStorage.getItem('id')
    const promise_of_user_data=await fetch(`https://hire-hub-bsf2.vercel.app/account/${user_id}/`,
        {
            method:"GET",
         
        }
    )
    if(promise_of_user_data.ok){
        const user_data=await promise_of_user_data.json()
        console.log(user_data)
        if(user_data.company!=null){
            console.log(user_data.company)
        const cmp=await fetch(`https://hire-hub-bsf2.vercel.app/job/companies/${user_data.company}/`)
        company.innerHTML=""
        if(cmp.ok){
            const cmp_res=await cmp.json()
            company.innerHTML=`
            <option value=${user_data.company}>${cmp_res.name}</option>
           `
            
        }
        }
        else{
            company.innerHTML+=`
            <option value=null>None</option>
           `
        }
        const companys=await fetch(`https://hire-hub-bsf2.vercel.app/job/companies/`)
        const response=await companys.json()
        response.forEach(com => {
            company.innerHTML+=`
            <option value=${com.id}>${com.name}</option>
            `
            console.log(com)
    
        });
        console.log(user_data)
        username.value=user_data.username
        first_name.value=user_data.first_name
        last_name.value=user_data.last_name
        email.value=user_data.email
       
    }
};

// Call the function
profile_data_load();


const profile=async(event)=>{
    event.preventDefault();
    const form=await document.getElementById('profile_form')
    const formData=new FormData(form)
    let company_y=document.getElementById('company').value
    console.log(company_y)
   
    const user_id=localStorage.getItem('id')
    let user_info;
    if (company_y=='null'){
        company_y=null
    }
    if(!company_y){
        user_info={
            username:formData.get('username'),
            first_name:formData.get('f_name'),
            last_name:formData.get('l_name'),
            email:formData.get('email'),
            company:null           
        }
    }
    else{
        user_info={
            username:formData.get('username'),
            first_name:formData.get('f_name'),
            last_name:formData.get('l_name'),
            email:formData.get('email'),
            company:company_y
            
        }
    }
    console.log(user_info)
    const update_data=await fetch(`https://hire-hub-bsf2.vercel.app/account/${user_id}/`,{
        method:'PATCH',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify(user_info),

    })
    if(update_data.ok){
        const j=await update_data.json()
        console.log(j)
        window.location.href='./profile.html'
    }

}