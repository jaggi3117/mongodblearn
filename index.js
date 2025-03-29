const mypromise = new Promise(function(resolve, reject){
    setTimeout(function(){
        const myvar = true
        if(myvar){
            resolve("operation good")
        }
        else{
            reject("operation error")
        }
    })
}, 2000)

mypromise.then(function(result){
    console.log(result)
}).catch(function(error){
    console.log(error)
}).finally(function(){
    console.log("this block will always execute")
})

