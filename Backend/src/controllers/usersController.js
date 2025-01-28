import supabase from "../supabaseClient.js";
import argon2 from "argon2";

async function hashedPassword(password) {
    try {
        const hash = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 2,
        });
        return hash;
    } catch (error) {
        console.error('Error saat hashing password:', error);
        throw error;
    }
}

export const createUser = async(req, res) => {
    const { username, email, password } = req.body;


    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email, 
            password,
        });
        
        if(authError){
            return res.status(400).json({
                status: 'error bos',
                message: 'gagal membuat akun supabase auth', 
                error: authError.message,
            });
        }

        if(!authData.user){
            return res.status(400).json({
                message: 'email mu di konfir sek mas'
            });
        }
        const userID = authData.user.id;
        const hashedPass = await hashedPassword(password);
        const { data, error} = await supabase.from('users').insert([{id: userID, username, email, password: hashedPass, role: 'user'}])


        if (error) {
            return res.status(500).json({
                status: 'error raws',
                message: 'Coba Lagi wkwkwk',
                error: error.message,
            });
        }
        return res.status(201).json({
            status: 'ACC BOLO',
            message: 'User created successfully A1',
            authData,
        });            
    }
    catch(error){
        res.status(500).json({
           message: 'an error happend hehe'
        })
    }
};

export const getUserById = async(req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return res.status(404).json({
            status: 'error rawr',
            message: 'User ngilang rak ketemu',
            error: error.message,
        });
    }

    return res.status(200).json({
        status: 'ACC BOLO',
        message: 'User retrieved successfully A1',
        data,
    });
};


export const updateUser = async(req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    const { data, error } = await supabase
        .from('users')
        .update({ username, email })
        .match({ id });

    if (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error updating user hahaha',
            error: error.message,
        });
    }

    return res.status(200).json({
        status: 'Acc Bolo',
        message: 'User updated successfully cihuy',
        data,
    });
};


export const deleteUser = async(req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('users')
        .delete()
        .match({ id });

    if (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error deleting user',
            error: error.message,
        });
    }

    return res.status(200).json({
        status: 'ACC BOLO',
        message: 'User deleted successfully A1',
        data,
    });
};

