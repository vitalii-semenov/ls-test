async function getData (url) {
    const res = await fetch(`${url}`);
    return await res.json();
}

function parseData (data) {
    data.map(el => {
        for (let key in el) {
            if (typeof el[key] === 'object'&& el.hasOwnProperty(key) && el[key].length === 0) {
                return
            } else if (typeof el[key] === 'object'&& el.hasOwnProperty(key) && el[key].length > 0) {
                data.push(el[key][0]);
                el[key] = [];
                return parseData(data);
            }
        }
    })
    console.log(data);
    return data;
}

function isActive (data, flag) {
    let dataParse = parseData(data);
    let res = [];
    dataParse.map(el => {
        for (let key in el) {
            if (key === 'isActive' && el[key] === flag) {
                res.push(el);
            }
        }
    })
    console.log(res)
    return res;
}

function toDeleteTwins (data) {
    let res = data.reduce((prev, el, index) => {
        for (let key in el) {
            if (el.hasOwnProperty(key)) {
                if (el[key] !== prev[key]) {
                    return prev;
                } else if (el[key] === prev[key]) {
                    data.splice(index, 1);
                    return prev
                }
            }
        }
        return prev;
    }, data[0])
    console.log(res)
    return res;
}

getData('data_1.json')
    .then(res => {
        let pdata = parseData(res);
        // isActive(res, false);
        return pdata
    })
    .then(res => {
        console.log(res)
        // toDeleteTwins(res);
    })

