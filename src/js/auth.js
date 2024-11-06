
const Registration=async(event)=>{
    event.preventDefault();
    const form=await document.getElementById('registration_form')
    const formData=new FormData(form)
    const err=document.getElementById('err')
    const type=document.getElementById('type').value
    let company_y=document.getElementById('company').value
    err.innerHTML=""
    const token=localStorage.getItem('token')
    if(!token){
        if (company_y=='null'){
            company_y=null
        }
        const registration_form={
            username:formData.get('username'),
            first_name:formData.get('f_name'),
            last_name:formData.get('l_name'),
            email:formData.get('email'),
            password:formData.get('password'),
            confirm_password:formData.get('confirm_password'),
            type:type,
            company:company_y
        }
        console.log(registration_form)
        if(registration_form.password===registration_form.confirm_password)
        {
            if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(registration_form.password)){
                username=registration_form.username
                const userpromise=await fetch(`https://hire-hub-bsf2.vercel.app/account/registration/?username=${username?username:""}`)
                
                if(userpromise.ok){
                    alert('undefiend')
                    err.innerHTML='The User Already Exist'
                }
                else{
    
                    const sub_form=await fetch(`https://hire-hub-bsf2.vercel.app/account/registration/`,{
                        method:'POST',
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify(registration_form),
                    })
                    // const sub_res=await sub_form.json()
                    if(sub_form.ok){
                        alert('Check Your Mail')
                        err.innerHTML='Check Your Mail'
                    }
                    else{
                        err.innerHTML=`
                        This Email already Exist
                        `
                    }
                }
    
            }
            else{
                err.innerHTML="Minimum eight characters, at least one letter, one number and one special character"
            }
        }
        else{
            err.innerHTML=`Your Confirm password Doesn't match`
        }
    }
    else{
        window.location.href='./index.html'
    }
}


const Login=async(event)=>{
    event.preventDefault();
    const token=localStorage.getItem('token')
    if(!token){
        const form=document.getElementById('login-form')
        const formData=new FormData(form)
        const login_form={
            username:formData.get('username'),
            password:formData.get('password')
        }
        const err=document.getElementById('error')
        err.innerHTML=""
       console.log(login_form)
        const loginPromise=await fetch(`https://hire-hub-bsf2.vercel.app/account/login/`,{
            method:'POST',
            body:JSON.stringify(login_form),
            headers:{'Content-Type':'application/json'},
    
        })
        if(loginPromise.ok){
            const login_res=await loginPromise.json()
            if(!login_res.error){
                console.log(login_res)
                localStorage.setItem('token',login_res.token)
                localStorage.setItem('id',login_res.user_id)
                localStorage.setItem('is_staff',login_res.is_staff)
                localStorage.setItem('type',login_res.type)
                window.location.href='./index.html'
            }
            else{
                err.innerHTML=`Invalid User`
            }
    
        }
    }
    else{
        window.location.href='./index.html'
    }

    

}

const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('type')
    localStorage.removeItem('id')
    localStorage.removeItem('is_staff')
    window.location.href='./index.html'

}