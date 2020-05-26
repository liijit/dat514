//global functions

fieldValidator = e => {
    //puts the object values into an array
    let arr = Object.values(e)
    const proms = []
    //loops through array and checks if they are empty
        for(let i = 0; i < arr.length ; i++) {
            //push functions into the 'proms' array
            proms.push(() => new Promise((resolve, reject) => {
                //if a parsed argument is empty, revoke
                if (arr[i] === "") {
                    reject({
                        msg: 'Missing Fields',
                        field: i
                })
                } else {
                    resolve(i +'. Field filled ')
                }   
            })
        )
    }
    //returns a promise value for each looped field
    const arrOfProms = proms.map(prom => prom())
    //returns a promise state
    return Promise.all(arrOfProms);
}