const apply_for_job=(job_id)=>{
    const token=localStorage.getItem('token')
    const type=localStorage.getItem('type')
    if(!token){
        window.location.href='./login.html'
    }
    else if(type=='Viewer'){
        window.location.href=`./index.html`
    }
    else{
         window.location.href=`./apply.html?job_id=${job_id}`
    }
}

const handle_apply_for_job = async (event) => {
    event.preventDefault();
    
    const token = localStorage.getItem('token');
    const job_id = new URLSearchParams(window.location.search).get('job_id');
   
   
    const user = localStorage.getItem('id');
    const form = document.getElementById('apply-form');
    const formData = new FormData();
    const resume_m = document.getElementById('file');

    // Check if a file is selected
    if (!resume_m.files[0]) {
        console.error('No file selected.');
        return;
    }

    formData.append('image', resume_m.files[0]);

    try {
        const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=70a11ac23df408c22afeb6a78e1439f0`, {
            method: 'POST',
            body: formData,
        });

        if (!imgbbResponse.ok) {
            const errorResponse = await imgbbResponse.json();
            console.error('Image upload failed:', errorResponse);
            return;
        }

        const imgbbData = await imgbbResponse.json();
        
        formData.delete('image')
        formData.append('user',user)
        formData.append('job',job_id)
        formData.append('resume',imgbbData.data.url)
        formData.append('status',"Pending")
        const postResumeResponse = await fetch(`https://hire-hub-bsf2.vercel.app/job/apply/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            },
            body: formData
        });

        if (!postResumeResponse.ok) {
            const errorResponse = await postResumeResponse.json();
            console.error('Job application failed:', errorResponse);
            return;
        }
       
        const postResumeData = await postResumeResponse.json();
        const er=document.getElementById('er')
        er.innerHTML=""
        er.classList.remove()
        if(postResumeData.detail){
            console.log(postResumeData.detail)
            
        }else{
            console.log(postResumeData);
             window.location.href='./applied.html'
        }
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
};
