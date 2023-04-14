
export const getApi = async () =>{
return await fetch("https://jsonplaceholder.typicode.com/posts").then((response) => response.json()).
catch((error) => {
    console.log(error)
})
}