let CreateContract = (data) => {
    const contractUnit = document.createElement('tbody');
    const contractOutline = document.createElement('tr');
    const contractDetails = document.createElement('tr');
    contractUnit.className = 'contract-unit';
    contractOutline.className = 'contract-outline';
    contractDetails.className = 'contract-details';
    const contractField = ["contract_id", "publish_id", "rent_id", "c_status"];
    // contract-Row
    contractField.forEach((field) => {
        let contractNode = document.createElement('td');
        contractNode.innerHTML = data[field];
        contractOutline.appendChild(contractNode);
    });
    let contractNode = document.createElement('td');
    if (data["c_status"] === "continue") {
        const btn = document.createElement('button');
        btn.className = 'delete-btn';
        btn.innerHTML = 'X';
        contractNode.appendChild(btn);
    }
    contractOutline.appendChild(contractNode);
    contractUnit.appendChild(contractOutline);
    // contract-details
    contractDetails.innerHTML = "<td colspan=\"4\">"
    + "商品ID : " + data["product_id"]
    + "租借時間 : " + data["start_date"] + "~" + data["end_date"]
    + "</td>";
    contractUnit.appendChild(contractDetails);
    console.log(contractUnit);
    document.querySelector('.admin-table').appendChild(contractUnit);
}
// fetch data
CreateContract({contract_id:121312, product_id:01, publish_id:02, 
    rent_id:03, start_date:'2021-06-12', end_date:'2021-07-12', publish_eval:'hello',
    rent_eval:'world', c_status:'continue'});
CreateContract({contract_id:312312, product_id:05, publish_id:06, 
    rent_id:02, start_date:'2021-03-12', end_date:'2021-05-12', publish_eval:'hello',
    rent_eval:'world', c_status:'finish'});
CreateContract({contract_id:777777, product_id:01, publish_id:02, 
    rent_id:04, start_date:'2021-06-06', end_date:'2021-07-01', publish_eval:'hello',
    rent_eval:'world', c_status:'continue'});
    CreateContract({contract_id:121312, product_id:01, publish_id:02, 
        rent_id:03, start_date:'2021-06-12', end_date:'2021-07-12', publish_eval:'hello',
        rent_eval:'world', c_status:'continue'});
    CreateContract({contract_id:312312, product_id:05, publish_id:06, 
        rent_id:02, start_date:'2021-03-12', end_date:'2021-05-12', publish_eval:'hello',
        rent_eval:'world', c_status:'finish'});
    CreateContract({contract_id:777777, product_id:01, publish_id:02, 
        rent_id:04, start_date:'2021-06-06', end_date:'2021-07-01', publish_eval:'hello',
        rent_eval:'world', c_status:'continue'});
        CreateContract({contract_id:121312, product_id:01, publish_id:02, 
            rent_id:03, start_date:'2021-06-12', end_date:'2021-07-12', publish_eval:'hello',
            rent_eval:'world', c_status:'continue'});
        CreateContract({contract_id:312312, product_id:05, publish_id:06, 
            rent_id:02, start_date:'2021-03-12', end_date:'2021-05-12', publish_eval:'hello',
            rent_eval:'world', c_status:'finish'});
        CreateContract({contract_id:777777, product_id:01, publish_id:02, 
            rent_id:04, start_date:'2021-06-06', end_date:'2021-07-01', publish_eval:'hello',
            rent_eval:'world', c_status:'continue'});
            CreateContract({contract_id:121312, product_id:01, publish_id:02, 
                rent_id:03, start_date:'2021-06-12', end_date:'2021-07-12', publish_eval:'hello',
                rent_eval:'world', c_status:'continue'});
            CreateContract({contract_id:312312, product_id:05, publish_id:06, 
                rent_id:02, start_date:'2021-03-12', end_date:'2021-05-12', publish_eval:'hello',
                rent_eval:'world', c_status:'finish'});
            CreateContract({contract_id:777777, product_id:01, publish_id:02, 
                rent_id:04, start_date:'2021-06-06', end_date:'2021-07-01', publish_eval:'hello',
                rent_eval:'world', c_status:'continue'});
// fetch data

const contractBody = document.querySelector('#contract');
const contractUnit = document.querySelectorAll('.contract-unit');
contractUnit.forEach((unit) => {
    const contractOutline = unit.querySelector('.contract-outline');
    const contractDetails = unit.querySelector('.contract-details');
    contractDetails.style.display = 'none';
    contractOutline.addEventListener('click', (event) => {
        // console.log(event.target.tagName, event.eventPhase);
        if (event.target.tagName === 'TD') {
            contractDetails.style.display = (contractDetails.style.display === 'none')? '' : 'none';
        }
    });
});
const deleteBtn = document.querySelectorAll('.delete-btn');
deleteBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        console.log('delete-btn');
    });
});