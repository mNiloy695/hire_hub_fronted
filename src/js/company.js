const company_append_registration_form=async()=>{
    const company_id=document.getElementById('company')
    const companys=await fetch(`https://hire-hub-bsf2.vercel.app/job/companies/`)
    const response=await companys.json()
    response.forEach(company => {
        company_id.innerHTML+=`
        <option value=${company.id}>${company.name}</option>
        `
        console.log(company)

    });
}
company_append_registration_form()