let contract = new Vue({
    el : '#contract',
    data : {
        rows : [
            // {contract_id:121312, publish_id:02, rent_id:03, c_status:'continue', start_date:null, end_date:null, delDisplay:false},
            // {contract_id:999999, publish_id:07, rent_id:05, c_status:'continue', start_date:null, end_date:null, delDisplay:false},
            // {contract_id:777777, publish_id:17, rent_id:25, c_status:'finish', start_date:null, end_date:null, delDisplay:false},
            // {contract_id:663636, publish_id:03, rent_id:12, c_status:'finish', start_date:null, end_date:null, delDisplay:false}
        ],
        thFields : [
            {name:'contract_id', text:'契約編號'}, 
            {name:'publish_id', text:'出租方'},
            {name:'rent_id', text:'承租方'},
            {name:'c_status', text:'契約狀態'}
        ],
        lastSort : '',
        toDelete : {targetidx:null, action:null}
    },
    created : async function () {
        /* fetch from db*/
        try {
            const result = await fetch('/admin/contract').then((res) => {return res.json();});
            if (result.status === 'ok') {
                result['data'].forEach(dbdata => {
                    let data = {outline:{}, 
                        details:{start_date:null, end_date:null, publish_eval:null, rent_eval:null}, 
                        delDisplay:false};
                    this.thFields.forEach((field) => {
                        data['outline'][field.name] = dbdata[field.name];
                    })
                    this.rows.push(data);
                });
                console.log(this.rows);
            }
            else {throw 'Fetch error';}
        }
        catch (err) {
            console.log(err);
        }
        this.SortTable(null, 'c_status');
    },
    methods : {
        Details : async function (event, row) {
            // console.log('Details', idx);
            if (row['details']['start_date'] === null) {
                try {
                    const result = await fetch('/admin/contract/details', {
                        method:'POST',
                        headers : {
                            'content-type' :　'application/json'
                        },
                        body : JSON.stringify({
                            contract_id : row['outline']['contract_id']
                        })
                    }).then((res) => {return res.json();});
                    console.log(result);
                    if (result.status === 'ok') {
                        row['details']['start_date'] = result['data'][0]['start_date'];
                        row['details']['end_date'] = result['data'][0]['end_date'];
                        row['details']['publish_eval'] = result['data'][0]['publish_eval'];
                        row['details']['rent_eval'] = result['data'][0]['rent_eval'];
                    }
                    else {throw 'Fetch error';}
                }
                catch (err) {
                    console.log(err);
                }
            }
            if (event.target.tagName === 'TD') {
                row.delDisplay = !row.delDisplay;
            }
            console.log(this.rows);
        },
        MarkContract : function (event, idx) {
            // console.log('DeleteContract', row);
            event.target.blur();
            this.toDelete.targetidx = idx;
        },
        SortTable : function (event, field) {
            if (this.rows.length > 1) {
                if (this.lastSort === field) {
                    this.rows.reverse();
                }
                else {
                    this.rows.sort((a, b) => {
                        if (a['outline'][field] > b['outline'][field]) {return 1;}
                        else if (a['outline'][field] < b['outline'][field]) {return -1;}
                        else {return 0;}
                    });
                    this.lastSort = field;
                }
            }
        }
    },
    watch : {
        "toDelete.action" : function () {
            if (this.toDelete.action) {
                this.rows[this.toDelete.targetidx]['outline']['c_status'] = 'termination';
            }
            this.toDelete.targetidx = this.toDelete.action = null;
        }
    }
});
console.log(contract);