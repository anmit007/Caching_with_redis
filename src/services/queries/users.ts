import { usernameUniquekeys, usersKey } from '$services/keys';
import { client } from '$services/redis';
import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';

export const getUserByUsername = async (username: string) => {
};

export const getUserById = async (id: string) => {
    const user = await client.hGetAll(usersKey(id));

    return deserialize(id,user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
    const id = genId();
    //check fr uniqueness
    const exists = await client.sIsMember(usernameUniquekeys(),attrs.username);
    if(exists){
        throw new Error("UserName is taken")
    }
    await client.hSet(usersKey(id),serialize(attrs));
    await client.sAdd(usernameUniquekeys(),attrs.username);
    return id;
};

const serialize = (user : CreateUserAttrs) =>{
    return {
        username : user.username,
        passowrd : user.password

    };
}

const deserialize = (id : string, user: {[key:string]:string}) => {
return {
    username : user.username,
    password : user.passowrd,
    id:id,
}
}