import db from "./../../db/index";
import {NotFoundError} from "@prisma/client/runtime/edge";

export async function getUsers() {
    try {
        return await db.user.findMany({})
    } catch (e) {
        console.log(`Error fetching users ${e}`)
    }
}

export async function getUser(id) {
    try {
        const food = await db.user.findUnique({where: {id: id}})
        if (!food) {
            throw new NotFoundError("User not found");
        }
        return food;
    } catch (e) {
        console.log(`Error fetching user: ${e}`)
    }
}

export async function createUser(options: {email, name, password }){
    try {
        const {email, name, password } = options;
        return await db.user.create({data: {email, name, password } });
    } catch (e) {
        if (e instanceof Error) {
            console.error(`Error creating a user: ${e.message}`);
        } else {
            console.error(`Unknown error creating a user: ${e}`);
        }
        console.log(`Error creating a user ${e}`)
    }
}

export async function updateUser(id, options: { email?, name?, password?}) {
    try {
        const {email, name, password } = options;
        return await db.user.update({
            where: {id},
            data: {
                ...(email ? {email} : {}),
                ...(name ? {name} : {}),
                ...(password ? {password} : {}),
            }
        })
    } catch (e) {
        console.log(`Error updating user ${e}`)
    }
}

export async function deleteUser(options: { id }) {
    try {
        const {id} = options;
        return await db.user.delete({where: {id} })
    } catch (e) {
        console.log(`Error deleting user ${e}`)
    }
}

