fetch("navbar.html")
.then((res)=>res.text())
.then((data)=>{
    const nav_bar=document.getElementById('nav-bar')
    nav_bar.innerHTML=data;
    const token=localStorage.getItem('token')
    const user_id=localStorage.getItem('id')
    const menu=document.getElementById('menu')
    const auth_bar=document.getElementById('auth')
    const is_staff=localStorage.getItem('is_staff')
    const type=localStorage.getItem('type')
    const banner=document.getElementById("banner-section")
    console.log(token)
    if(token==undefined){
        
        auth_bar.innerHTML=`
                <li><a class='text-green-500' href="./login.html">Login</a></li>
                <li><a class='text-red-500' href="./registration.html">Sign Up</a></li>
        `
      
    

    }
    else{
        if(type=='admin')
        {
            auth_bar.innerHTML=`
            <li class='me-2'><a href="./dashboard.html">Dashboard</a></li>
            <li onclick='logout()' class='hover:cursor-pointer'>Logout</li> 
        `
        }
        else{
            auth_bar.innerHTML=`
            <li class='me-2'> <a class='text-green-600' href='./profile.html'><i class="fa-solid fa-user me-2 text-sm"></i>profile</a></li>
            <li onclick='logout()' class='hover:cursor-pointer text-red-600'>Logout</li> 
          `
        }
       
    }
    console.log(is_staff)
    if(type=='Employee'){
        menu.innerHTML=`
        <li><a href="./index.html" class='text-green-600'>Home</a></li>
        <li><a href='./about.html'>About</a></li>
        <li><a href="./post_a_job.html">Create_Job</a></li>
        <li><a href="./posted_job.html">Created_Job</a></li>
        <li><a href="./applied.html" class='text-green-600'>User_Application</a></li>
        
        `
    }
    else if(type!='admin'){
        menu.innerHTML=`
        <li><a class='text-green-500' href="./index.html">Home</a></li>
        <li><a href='./about.html'>About</a></li>
        <li><a href="./find.html">Find Job</a></li>
        
        `
        if(token && (type=='Job Seeker')){
            menu.innerHTML+=`
            <li class='cursor-pointer'><a href='./applied.html'>Applied Job</a></li>
            `
        }
    }
    else{
        menu.innerHTML=`
       
        <li><a href='./about.html'>About</a></li>
        
        
        `
    }
  

})

fetch('footer.html')
.then((res)=>res.text())
.then((data)=>{
    const footer=document.getElementById('footer')
    footer.innerHTML=data
})