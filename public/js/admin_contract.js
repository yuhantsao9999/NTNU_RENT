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
        Filter : {contract_id:'', publish_id:'', rent_id:'', c_status:'none', mark:'none'},
        popup : false,
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
                            details:{start_date:null, end_date:null, publish_start:null, publish_comment:null, rent_star:null, rent_comment:null},
                            display:{unit:true, details:false},
                            mark:{termi:false, del:false}
                        };
                        for (field of this.thFields) {
                            data['outline'][field.name] = dbdata[field.name];
                        }
                        this.rows.push(data);
                    });
                }
                else {throw 'Fetch error';}
            }
            catch (err) {
                throw err;
            }
        },
        FetchDetails : async function (row) {
            try {
                const result = await fetch('/admin/contract/details', {
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                        contract_id : row['outline']['contract_id']
                    })
                }).then((res) => {return res.json();});
                if (result.status === 'ok') {
                    row['details']['start_date'] = result['data'][0]['start_date'];
                    row['details']['end_date'] = result['data'][0]['end_date'];
                    row['details']['publish_star'] = result['data'][0]['publish_star'];
                    row['details']['rent_star'] = result['data'][0]['rent_star'];
                    row['details']['publish_comment'] = result['data'][0]['publish_comment'];
                    row['details']['rent_comment'] = result['data'][0]['rent_comment'];
                }
                else {throw 'Fetch error';}
            }
            catch (err) {
                throw err;
            }
        },
        ShowDetails : async function (event, row) {
            if (row['details']['start_date'] === null) {
                try {
                    await this.FetchDetails(row);
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
            event.target.blur();
            if (!this.popup) {
                this.rows[idx]['mark']['termi'] = !this.rows[idx]['mark']['termi'];
            }
            this.StartFilter();
        },
        MarkDelContract : function (event, idx) {
            event.target.blur();
            if (!this.popup) {
                this.rows[idx]['mark']['del'] = !this.rows[idx]['mark']['del'];
            }
            this.StartFilter();
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
            if (event !== null) {
                event.target.blur();
            }
            for (Field of this.thFields) {
                this.Filter[Field['name']] = '';
                if (Field['name'] === 'c_status') {
                    this.Filter['c_status'] = 'none';
                }
            }
            this.Filter['mark'] = 'none'
            for (row of this.rows) {
                row['display']['unit'] = true;
            }
        },
        StartFilter : function () {
            for (row of this.rows) {
                row['display']['unit'] = true;
                // filter thFields
                for (field of this.thFields) {
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
                }
                //filter mark
                switch (this.Filter['mark']) {
                    case'neither':
                        if (row['mark']['termi'] || row['mark']['del']) {row['display']['unit'] = false;}
                        break;
                    case'either':
                        if (!row['mark']['termi'] && !row['mark']['del']) {row['display']['unit'] = false;}
                        break;
                    case'termi':
                    case'del':
                        if (!row['mark'][this.Filter['mark']]) {row['display']['unit'] = false;}
                        break;
                }
            }
        },
        RefreshMark : function (event) {
            event.target.blur();
            for (row of this.rows) {
                row['mark']['termi'] = row['mark']['del'] = false;
            }
            this.StartFilter();
        },
        DelContract : async function (c_id) {
            try {
                await fetch('admin/contract/delete', {
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                        contract_id : c_id
                    })
                }).then(res => {return res.json();});
            }
            catch (err) {
                throw err;
            }
        },
        TermiContract : async function (c_id) {
            try {
                await fetch('admin/contract/terminate', {
                    method : 'POST',
                    headers : {
                            'content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                        contract_id : c_id
                    })
                }).then(res => {return res.json();});
            }
            catch (err) {
                throw err;
            }
        },
        ReviseDB : async function (event, option) {
            event.target.blur();
            if (option) {
                for (row of this.rows) {
                    const c_id = row['outline']['contract_id'];
                    if (row['mark']['del']) {
                        /*delete from db*/
                        try {await this.DelContract(c_id);}
                        catch (err) {console.log(err);}
                    }
                    else if (row['mark']['termi']) {
                        // revise to db
                        try {await this.TermiContract(c_id);}
                        catch (err) {console.log(err);} 
                    }
                    else {};
                }
                window.location.reload();
            }
            this.popup = !this.popup;
        },
        PopUp : function (event) {
            event.target.blur();
            this.RefreshFilter(null);
            this.Filter['mark'] = 'either';
            this.popup = true;
        }
    },
    watch : {
        Filter : {
            handler (newValue, oldValue) {
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