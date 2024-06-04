import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery
        this.query = query
    }
    search(searchableFields: string[]) {
        const searchParams = this.query?.searchParams
        if (searchParams) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchParams, $options: "i" }
                }))
            } as FilterQuery<T>)
        }
        return this
    }
    filter() {
        const copyQuray = { ...this.query }
        const deletedField = ["searchParams", "sort", "limit", "page", "field"]
        deletedField.forEach(element => delete copyQuray[element]);
        this.modelQuery = this.modelQuery.find(copyQuray as FilterQuery<T>)

        return this
    }
    sort() {
        const sort = (this?.query?.sort as string).split(",").join(" ") || '-createdAt'
        this.modelQuery = this.modelQuery.sort(sort as string)

        return this
    }
    paginate() {
        const limit = Number(this?.query?.limit || 1)
        let page = Number(this?.query?.page || 1)
        let skip = (page-1) * limit
        this.modelQuery = this.modelQuery.skip(skip).limit(limit)

        return this
    }
    fields(){
       const fields = (this?.query?.field as string).split(',').join(" ")
       this.modelQuery = this.modelQuery.select(fields)
       
       return this
    }
}

export default QueryBuilder