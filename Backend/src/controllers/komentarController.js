import supabase from "../supabaseClient.js";


export const createKomentar = async(req, res) => {
    const { config_id, description, balasan } = req.body;

    const { data, error } = await supabase
        .from('komentar')
        .insert([{ config_id, description, balasan }]);

    if (error) {
        return res.status(500).json({
            status: 'error rawrr',
            message: 'Error creating comment',
            error: error.message,
        });
    }

    return res.status(201).json({
        status: 'Acc Bolo',
        message: 'Comment created successfully',
        data,
    });
};


export const getKomentar = async(req, res) => {
    const { config_id } = req.params;

    const { data, error } = await supabase
        .from('komentar')
        .select('*')
        .eq('config_id', config_id);

    if (error) {
        return res.status(404).json({
            status: 'error rawrr',
            message: 'Comments not found',
            error: error.message,
        });
    }

    return res.status(200).json({
        status: 'Acc Bolo',
        message: 'Comments retrieved successfully',
        data,
    });
};


export const deleteKomentar = async(req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('komentar')
        .delete()
        .match({ id });

    if (error) {
        return res.status(500).json({
            status: 'error rawrr',
            message: 'Error deleting comment',
            error: error.message,
        });
    }

    return res.status(200).json({
        status: 'Acc Bolo',
        message: 'Comment deleted successfully',
        data,
    });
};