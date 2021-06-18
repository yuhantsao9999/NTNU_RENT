let account = new Vue({
    el : '#account',
    data : {
        rows : [],
        thFields : [
            {name:'user_id', text:'使用者ID'},
            {name:'name', text:'使用者姓名'},
            {name:'email', text:'使用者信箱'},
            {name:'password', text:'使用者密碼'},
            {name:'phone', text:'使用者電話'},
            {name:'authority', text:'使用者權限'}
        ],
        lastSort : '',
        Filter : {user_id:'', name:'', email:'', phone:'', authority:'', mark:''},
        popup : false,
    },
    created : async function () {
        try {
            await this.FetchOutline();
            lastSort = 'user_id';
        }
        catch (err) {
            console.log(err);
        }
    },
    methods : {
        FetchOutline : async function () {
            try {
                const result = await fetch('/admin/account').then((res) => {return res.json();});
                if (result.status === 'ok') {
                    for (dbRowData of result['data']) {
                        let data = {
                            outline:{},
                            details:[],
                            display:{unit:true, details:false},
                            mark:{authority:null}
                        };
                        for (field of this.thFields) {
                            data['outline'][field.name] = dbRowData[field.name];
                        }
                        data['mark']['authority'] = dbRowData['authority'].toString();
                        this.rows.push(data);
                    }
                }
                else {throw 'Fetch error';}
            }
            catch (err) {
                throw err;
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
            if (event !== null) {
                event.target.blur();
            }
            for (Field of this.thFields) {
                this.Filter[Field['name']] = '';
            }
            this.Filter['mark'] = ''
            for (row of this.rows) {
                row['display']['unit'] = true;
            }
        },
        StartFilter : function () {
            for (row of this.rows) {
                row['display']['unit'] = true;
                // filter thFields
                for (field of this.thFields) {
                    if (this.Filter[field.name] !== undefined && this.Filter[field.name] !== '') {
                        let FilterValue = '';
                        switch(field.name) {
                            case'user_id':
                            case'phone':
                                FilterValue = this.Filter[field.name].toString();
                                break;
                            default:
                                FilterValue = this.Filter[field.name];
                        }
                        if (!(row['outline'][field['name']].toString().startsWith(FilterValue))) {
                            row['display']['unit'] = false;
                        }
                    }
                }
                //filter mark
                if (this.Filter['mark'] === 'ready') {
                    // no modified
                    if (row['mark']['authority'].toString() === row['outline']['authority'].toString()) {
                        row['display']['unit'] = false;
                    }
                }
            }
        },
        RefreshMark : function (event) {
            event.target.blur();
            for (row of this.rows) {
                row['mark']['authority'] = row['outline']['authority'];
            }
            this.StartFilter();
        },
        ModifyAuth : async function (u_id, lastAuth) {
            try {
                const result = await fetch('admin/account/auth', {
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                        user_id : u_id,
                        lastAuth : lastAuth
                    })
                }).then(res => {return res.json();});
                console.log(result);
            }
            catch (err) {
                throw err;
            }
        },
        ReviseDB : async function (event, option) {
            event.target.blur();
            if (option) {
                for (row of this.rows) {
                    if (row['outline']['authority'].toString() !== row['mark']['authority'].toString()) {
                        const u_id = row['outline']['user_id'];
                        const lastAuth = row['mark']['authority'].toString();
                        try {await this.ModifyAuth(u_id, lastAuth);}
                        catch (err) {console.log(err);}
                    }
                }
                window.location.reload();
            }
            this.popup = !this.popup;
        },
        PopUp : function (event) {
            event.target.blur();
            this.RefreshFilter(null);
            this.Filter['mark'] = 'ready';
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
console.log(account);