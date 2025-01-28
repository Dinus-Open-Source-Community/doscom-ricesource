import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL
const supabase_service_role_key = process.env.SUPABASE_ROLE_SECRET
const admin = createClient(supabaseUrl, supabase_service_role_key,{
    auth: {
        autoRefreshToken: false, 
        persistSession: false
    }
})


export default admin;