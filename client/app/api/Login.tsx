export default async function Login(logindata:{email:string,password:string}){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(logindata)
    })
    .then(response => response.json())
    .catch(error => console.log(error))

    const token = `${response.type} ${response.token}`
    if(!token){
        return false
    }
    console.log(token)
    return true
}