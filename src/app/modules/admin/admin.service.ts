import QueryBuilder from "../../bulders/QureyBulder"
import { AdminSearchableFields } from "./admin.constan"
import { TAdmin } from "./admin.interface"
import { Admin } from "./admin.model"

const getAllAdminFromDB = async (query : Record<string,unknown>)=>{

    const adminData = new QueryBuilder(Admin.find(),query)
    .search(AdminSearchableFields)
    .sort()
    .filter()
    .paginate()
    .fields()
    const result = await adminData.modelQuery
    return result
}

const getSingelAdminFromDB = async (adminId : string)=>{
    const result = await Admin.findById(adminId)
    return result 
}

const deletedAdminFormDB = async (adminId : string)=>{
    const result = await Admin.findByIdAndUpdate(adminId, {
        isDeleted : true,
        new:true
    })

    return result 
}

const updateAdminFormDB = async(adminId : string, payload: Partial<TAdmin>)=>{
   console.log(adminId, payload) 
}


export const AdminService = {
    getAllAdminFromDB,
    getSingelAdminFromDB,
    deletedAdminFormDB,
    updateAdminFormDB
}