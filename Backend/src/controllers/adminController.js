import admin from "../admin.js";
import { deleteUser, updateUser, getUserById } from "./usersController.js";
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



export class UserManagement{

    async getAllUser(req, res) {
        try{
            const { data: users, error } = await admin.auth.admin.listUsers({
                page: 1,
                perPage: 50
            });

            if(error){
                return res.status(400).json({
                    error: error.message
                })
            }

            res.json(users)
        }catch(error){
            res.status(500).json({
                message: error.message
            });
        }
    }

    async getUserById(req, res) {
        try{
            await getUserById(req,res)
        }catch(error){
            return res.status(500).json({
                status: 'error',
                message: 'tidak ada user',
                error: error.message
            })
        }
    }

    async createUserWithPrivilege(req, res){
        const { username, email, password} = req.body;

        try{
            const { data : authData, error: authError} = await admin.auth.signUp({
                email,
                password,
            });

            if(authError){
                return res.status(400).json({
                    status: 'error',
                    message: 'gagal membuat akun supabase auth',
                    error: error.message,
                });
            }

            const userID = authData.user.id
            const hashedPass = await hashedPassword(password);
            
            const { data, error } = await supabase
                .from('users')
                .insert([{
                    id: userID,username,email,password: hashedPass, role: 'user'
                }])

                if(error){
                    try{
                        await admin.auth.admin.deleteUser(userID)
                    }catch(deleteError){
                        console.error('gagal menghapus pengguna dari auth')
                    }

                    return res.status(500).json({
                        status: 'error',
                        message: 'gagal membuat user',
                        error: error.message,
                    })
                }

                return res.status(201).json({
                    status: 'succes',
                    message: 'user created by admin succesfully',
                    authData,
                })
                
        }catch(error){
            res.status(500).json({
                status: 'error',
                message: 'gagal membuat User',
                error: error.message
            })
        }
    }

    async deleteUserAsAdmin (req, res) {
        const { id } = req.params;
        try{

            const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id') 
            .eq('id', id)
            .single();

            if (userError || !userData) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User tidak ditemukan'
                });
            }
            
            const { error: authError } = await admin.auth.admin.deleteUser(
                userData.id
            );

            if (authError) {
                throw new Error(`Error menghapus dari auth: ${authError.message}`);
            }
            
            const { error: deleteError } = await supabase
                .from('users')
                .delete()
                .eq('id', id)
                .single();
    
            if (deleteError) {
                throw new Error(`Error menghapus dari users: ${deleteError.message}`);
            }
    
            return res.status(200).json({
                status: 'success',
                message: 'User berhasil dihapus'
            });

        }catch (error){
            return res.status(500).json({
                status: 'error',
                message: 'error admin cannot delete user',
                error: error.message,
            });
        }
    }

    async updateUserAsAdmin (req, res) {
        try{
            await updateUser(req, res)
        }catch{
            return res.status(500).json({
                status: 'error',
                message: 'admin failed to update user',
                error: error.message,
            });
        }
    }

    async banUser (req, res) {
        try{
            const { userId } = req.params; 
            const { data, error} = await admin.auth.admin.updateUserById(
                userId,
                {user_metadata: { blocked: true}}
            )

            if (error) {
                return res.status(400).json({
                    error: error.message
                })
            }

            res.status(200).json({
                message: 'user berhasil di-ban boss',
                user:data
            })
        }catch(error){
            res.status(500).json({
                message: error.message
            });
        }
    }

    
    async unBanUser(req, res) {
        try {
            const { userId } = req.params;
            const { data, error } = await admin.auth.admin.updateUserById(
                userId,
                {user_metadata: {blocked: false}}
            )

            if(error){
                return res.status(400).json({
                    error: error.message
                })
            }
            res.status(200).json({
                message: 'user berhasil di un-ban',
                user: data
            });

        }catch(error){
            res.status(500).json({
                message: error.message
            });
        }
    }

    async createAdmin(req, res){
        const {username, email, password} = req.body;
        try{ 
            const { data, error } = await admin.auth.admin.createUser({
                email,
                password,
                user_metadata: {
                    role: 'admin',
                    username: username
                }
            })
    
            if(error){
                return res.status(400).json({
                    status: 'error',
                    message: 'gagal membuat admin',
                    error: error.message
                })
            }
            
            const hashedPass = await hashedPassword(password)
            const { error: userError } = await supabase
                .from('users')
                .insert({
                    id: data.user.id,
                    email,
                    username,
                    password: hashedPass,
                    role: 'admin'
                })
    
            if(userError){
                await admin.auth.admin.deleteUser(data.user.id)
    
                return res.status(500).json({
                    status: 'error',
                    message: 'gagal menyimpan admin',
                    error: userError.message
                })
            }
    
            res.status(201).json({
                status: 'success',
                message: 'Admin pertama berhasil dibuat',
                user: {
                    id: data.user.id,
                    email: data.user.email,
                    username: username
                }
            })
        }catch{
            res.status(500).json({
                status: 'error',
                message: 'kesalahan server',
                error: error.message
            })
        }
    }
}

export default new UserManagement();