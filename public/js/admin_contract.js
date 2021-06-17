let contract = new Vue({
    el : '#contract',
    data : {
        rows : [],
        thFields : [
            {name:'contract_id', text:'契約編號'}, 
            {name:'publish_id', text:'出租方'},
            {name:'rent_id', text:'承租方'},
            {name:'c_status', text:'契約狀態'}
        ],
        lastSort : '',
        toTerminate : {targetidx:null, action:null, targetcontract_id:null},
        Filter : {contract_id:'', publish_id:'', rent_id:'', c_status:'none'}
    },
    created : async function () {
        try {
            await this.FetchOutline();
            this.SortTable(null, 'c_status');
        }
        catch (err) {
            console.log(err);
        }
    },
    methods : {
        FetchOutline : async function () {
            try {
                const result = await fetch('/admin/contract').then((res) => {return res.json();});
                if (result.status === 'ok') {
                    result['data'].forEach(dbdata => {
                        let data = {
                            outline:{}, 
                            details:{start_date:null, end_date:null, publish_eval:null, rent_eval:null},
                            display:{unit:true, details:false}
                        };
                        this.thFields.forEach((field) => {
                            data['outline'][field.name] = dbdata[field.name];
                        })
                        this.rows.push(data);
                    });
                    // console.log(this.rows);
                }
                else {throw 'Fetch error';}
            }
            catch (err) {
                throw err;
            }
        },
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
                    // console.log(result);
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
                row['display']['details'] = !row['display']['details'];
            }
        },
        MarkTermiContract : function (event, idx) {
            // console.log('DeleteContract', row);
            if (this.toTerminate['targetidx'] === null) {
                event.target.blur();
                this.toTerminate['targetidx'] = idx;
                this.toTerminate['targetcontract_id'] = this.rows[idx]['outline']['contract_id'];
            }
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
        },
        RefreshFilter : function (event) {
            event.target.blur();
            this.Filter['contract_id'] = this.Filter['publish_id'] = this.Filter['rent_id'] = '';
            this.Filter['c_status'] = 'none';
            this.rows.forEach((element) => {
                element['display']['unit'] = true;
            });
        },
        StartFilter : function () {
            this.rows.forEach((row) => {
                row['display']['unit'] = true;
                this.thFields.forEach((field) => {
                    if (this.Filter[field.name] !== '' && this.Filter[field.name] !== 'none') {
                        let FilterValue = '';
                        switch(field.name) {
                            case'contract_id':
                            case'publish_id':
                            case'rent_id':
                                FilterValue = parseInt(this.Filter[field.name], 10);
                                break;
                            case'c_status':
                                FilterValue = this.Filter[field.name];
                        }
                        if (row['outline'][field.name] !== FilterValue) {
                            row['display']['unit'] = false;
                        }
                    }
                });
                console.log(row['display']['unit']);
            });
        }
    },
    watch : {
        "toTerminate.action" : function (newValue, oldValue) {
            if (this.toTerminate['action']) {
                this.rows[this.toTerminate['targetidx']]['outline']['c_status'] = 'termination';
                /*rewrite DB*/
            }
            this.toTerminate['targetidx'] = this.toTerminate['action'] = this.toTerminate['targetcontract_id'] = null;
            this.StartFilter();
        },
        Filter : {
            handler (newValue, oldValue) {
                console.log(this.Filter);
                this.StartFilter();
            },
            deep:true
        }
    },
    computed : {
        NumOfField : function () {
            return this.thFields.length;
        }
    }
});
console.log(contract);