let product = new Vue({
    el : '#product',
    data : {
        rows : [],
        thFields : [
            {name:'product_id', text:'商品ID'}, 
            {name:'user_id', text:'出租方ID'},
            {name:'category', text:'商品分類'},
            {name:'brand', text:'商品品牌'},
            {name:'price', text:'商品價格'},
            {name:'place', text:'面交地點'},
            {name:'rent_times', text:'出租次數'},
            {name:'p_status', text:'商品狀態'}
        ],
        detailsField : [
            {name:'photo', text:'商品照片'},
            {name:'intro', text:'商品介紹'},
            {name:'days', text:'出租天數'},
        ],
        lastSort : '',
        Filter : {
            product_id:'', user_id:'', category:'', brand:'', 
            price:'', place:'', rent_times:'', p_status:'', mark:''
        },
        popup : false,
        value2:[0,10000],
        min:0,max:10000
    },
    created : async function () {
        try {
            await this.FetchOutline();
            lastSort = 'product_id';
        }
        catch (err) {
            console.log(err);
        }
    },
    components: {
        VueSlider: window['vue-slider-component']
    },
    methods : {
        FetchOutline : async function () {
            try {
                const result = await fetch('/admin/product').then((res) => {return res.json();});
                if (result.status === 'ok') {
                    for (dbRowData of result['data']) {
                        let data = {
                            outline:{}, 
                            details:{photo:null, intro:null, days:null},
                            display:{unit:true, details:false},
                            mark:{offshelf:false, del:false}
                        };
                        for (field of this.thFields) {
                            data['outline'][field.name] = dbRowData[field.name];
                        }
                        this.rows.push(data);
                    }
                }
                else {throw 'Fetch error';}
            }
            catch (err) {
                throw err;
            }
        },
        FetchDetails : async function (row) {
            try {
                const result = await fetch('/admin/product/details', {
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                        product_id : row['outline']['product_id']
                    })
                }).then((res) => {return res.json();});
                if (result.status === 'ok') {
                    for (detail of this.detailsField) {
                        row['details'][detail['name']] = result['data'][0][detail['name']];
                    }
                }
                else {throw 'Fetch error';}
            }
            catch (err) {
                throw err;
            }
        },
        ShowDetails : async function (event, row) {
            let flag = false;
            for (detail of this.detailsField) {
                if (row['details'][detail['name']] !== null) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
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
        MarkOffShelf : function (event, idx) {
            event.target.blur();
            if (!this.popup) {
                this.rows[idx]['mark']['offshelf'] = !this.rows[idx]['mark']['offshelf'];
            }
            this.StartFilter();
        },
        MarkDelProduct : function (event, idx) {
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
                            case'product_id':
                            case'user_id':
                            case'price':
                            case'rent_times':
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
                switch (this.Filter['mark']) {
                    case'neither':
                        if (row['mark']['offshelf'] || row['mark']['del']) {row['display']['unit'] = false;}
                        break;
                    case'either':
                        if (!row['mark']['offshelf'] && !row['mark']['del']) {row['display']['unit'] = false;}
                        break;
                    case'del':
                    case'offshelf':
                        if (!row['mark'][this.Filter['mark']]) {row['display']['unit'] = false;}
                        break;
                }
            }
        },
        RefreshMark : function (event) {
            event.target.blur();
            for (row of this.rows) {
                row['mark']['offshelf'] = row['mark']['del'] = false;
            }
            this.StartFilter();
        },
        DelProduct : async function (p_id) {
            try {
                await fetch('admin/product/delete', {
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                        product_id : p_id
                    })
                }).then(res => {return res.json();});
            }
            catch (err) {
                throw err;
            }
        },
        OffShelfProduct : async function (p_id) {
            try {
                await fetch('admin/product/offshelf', {
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                        product_id : p_id
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
                    const p_id = row['outline']['product_id'];
                    if (row['mark']['del']) {
                        /*delete from db*/
                        try {await this.DelProduct(p_id);}
                        catch (err) {console.log(err);}
                    }
                    else if (row['mark']['offshelf']) {
                        try {await this.OffShelfProduct(p_id);}
                        catch (err) {console.log(err);}
                    }
                    else {}
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