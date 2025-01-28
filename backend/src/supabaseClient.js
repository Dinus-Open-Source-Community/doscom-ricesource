import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL dan SUPABASE_KEY harus diset di file .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
