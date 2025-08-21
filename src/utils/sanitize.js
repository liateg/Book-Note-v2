export const sanitize=(user)=>{
    const {password,passwordHash:_, ...safeuser}=user
    return safeuser
}