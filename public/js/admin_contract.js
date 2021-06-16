let contract = new Vue({
    el : '#contract',
    data : {
        rows : [
            // {contract_id:121312, publish_id:02, rent_id:03, c_status:'continue', start_date:'2021-06-06', end_date:'2021-07-01', delDisplay:false},
            // {contract_id:999999, publish_id:07, rent_id:05, c_status:'continue', start_date:'2021-05-06', end_date:'2021-06-01', delDisplay:false},
            // {contract_id:777777, publish_id:17, rent_id:25, c_status:'finish', start_date:'2021-03-05', end_date:'2021-08-31', delDisplay:false},
            // {contract_id:663636, publish_id:03, rent_id:12, c_status:'finish', start_date:'2021-04-07', end_date:'2021-07-03', delDisplay:false}
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
            console.log(result);
            result['data'].forEach(element => {
                element['delDisplay'] = false;
                this.rows.push(element);
            });
        }
        catch (err) {
            console.log(err);
        }
        this.SortTable(null, 'c_status');
    },
    methods : {
        Details : function (event, row) {
            // console.log('Details', idx);
            if (event.target.tagName === 'TD') {
                row.delDisplay = !row.delDisplay;
            }
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
                        if (a[field] > b[field]) {return 1;}
                        else if (a[field] < b[field]) {return -1;}
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
                this.rows[this.toDelete.targetidx].c_status = 'termination';
            }
            this.toDelete.targetidx = null;
            this.toDelete.action = null;
        }
    }
});
console.log(contract);