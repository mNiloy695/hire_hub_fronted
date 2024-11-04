const add_company=async(event)=>{
    event.preventDefault()
    const new_formData=new FormData()
    const img=document.getElementById('file')
    const image=img.files[0]
    const name=document.getElementById('name')
    const token=localStorage.getItem('token')
    const type=localStorage.getItem('type')
    new_formData.append('image',image)
    if(token){
    try{
        const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=70a11ac23df408c22afeb6a78e1439f0`, {
            method: 'POST',
            body: new_formData,
        });
        if(imgbbResponse.ok){
            const img=await imgbbResponse.json()
            console.log(img.data)
            new_formData.delete('image')
            new_formData.append('logo',img.data.url)
            new_formData.append('name',name.value)
            if(type=='admin'){
                
                const request_for_create_company=await fetch(`https://hire-hub-bsf2.vercel.app/job/companies/`,{
                    method:"POST",
                    headers:{"Authorization":`Token ${token}`},
                    body:new_formData,
    
                })
                if(request_for_create_company.ok){
                    const res=await request_for_create_company.json()
                    console.log(res)
                    window.location.href='./dashboard.html'
                }
            }
            else{
                window.location.href='./profile.html'
            }

        }
    }
    catch(err){
        console.log(err)
    }
}
else{
     window.location.href='./login.html'
}
    
}
