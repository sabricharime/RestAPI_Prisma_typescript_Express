
class AppError extends Error{
    constructor(public message: any , public option: {[key:string]:any}){
        super(message, option)
    }
    toString(){
        return `${this.message}`
    }
}


export default AppError