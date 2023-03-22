import { prop, getModelForClass } from "@typegoose/typegoose"

class User {
    /**
     * @prop() is a decorator from typegoose that tells it to create a property
     * property: string is a TypeScript type that tells the compiler that this property
     */

    @prop({required: true}) // Mongoose here we can add more options like a normal mongoose schema
    firstName: string // TypeScript 

    @prop({required: true})
    lastName: string

    @prop({required: true , trim: true, unique: true})
    email: string

    @prop({required: true , minlength: 6})
    password: string

    @prop({required: true})
    nickName: string

}

const UserModel = getModelForClass(User)
export default UserModel