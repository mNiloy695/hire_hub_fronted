const apply_model_update=async(id)=>{
  alert('ok')
      const apply=document.getElementById('apply').value
      const token=localStorage.getItem('token')
      const info={
        status:apply,
      }
      console.log(info)
       
        const promise=await fetch(`https://hire-hub-bsf2.vercel.app/job/apply/${id}/`,{
            method:'PATCH',
            headers:{"Content-Type":'application/json',"Authorization":`Token ${token}`},
            body:JSON.stringify(info),
        })
        if(promise.ok){
            const response=await promise.json()
            console.log(response)
        }
        else{
          console.log("ore vai problem")
        }
      
}