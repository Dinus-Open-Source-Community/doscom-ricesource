import supabase from '../supabaseClient.js';
import path from 'path';
import fs from 'fs';



export const createConfig = async(req, res) => {
    const { judul, description, like_up, like_down } = req.body;
    const imageFile = req.file;


    console.log('cek file:', imageFile);

    if (!judul || !description || like_up === undefined || like_down === undefined) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing required fields',
        });
    }

    let image = null;
    
    if (imageFile) {
        console.log('Uploading file:', imageFile);

        
        const filePath = path.join('image', imageFile.filename);
        console.log('file path', filePath);
        const { data, error: uploadError } = await supabase
            .storage
            .from('images')
            .upload(filePath, fs.createReadStream(imageFile.path), {
                cacheControl: '3600',
                upsert: true,
                duplex: 'half'
            });

        if (uploadError) {
            console.error('Error uploading file:', uploadError.message);
            return res.status(500).json({
                status: 'error',
                message: 'Error uploading image to storage',
                error: uploadError.message,
            });
        }


        const { publicURL, error: urlError } = supabase
            .storage
            .from('images')
            .getPublicUrl(filePath);

        if (urlError) {
            console.error('Error getting public URL:', urlError.message); // Log error URL
            return res.status(500).json({
                status: 'error',
                message: 'Error getting public URL for image',
                error: urlError.message,
            });
        }

        console.log('publik URL: ', publicURL);
        image = publicURL;
    }

    console.log("publik key diluar if: ", image)
   const { data, error } = await supabase
        .from('config')
        .insert([{ judul, description, like_up, like_down, image }]); 

    if (error) {
        console.error('Error creating config:', error.message); // Log error insert
        return res.status(500).json({
            status: 'error',
            message: 'Error creating config',
            error: error.message,
        });
    }

    return res.status(201).json({
        status: 'ok',
        message: 'Config created successfully',
        data,
    });
};

export const updateConfig = async(req, res) => {
    const { id } = req.params;
    const { judul, description, like_up, like_down } = req.body;
    const imageFile = req.file; // Assuming you are using multer for file uploads

    if (!judul || !description || like_up === undefined || like_down === undefined) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing required fields',
        });
    }


    let image = null;
    if (imageFile) {

        const filePath = path.join('images', imageFile.filename);
        const { data, error: uploadError } = await supabase
            .storage
            .from('images')
            .upload(filePath, fs.createReadStream(imageFile.path), {
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) {
            return res.status(500).json({
                status: 'error',
                message: 'Error uploading image to storage',
                error: uploadError.message,
            });
        }


        const { publicURL, error: urlError } = supabase
            .storage
            .from('images')
            .getPublicUrl(filePath);

        if (urlError) {
            return res.status(500).json({
                status: 'error',
                message: 'Error getting public URL for image',
                error: urlError.message,
            });
        }

        image = publicURL;
    }


    const { data, error } = await supabase
        .from('config')
        .update({ judul, description, like_up, like_down, image_url: image })
        .eq('id', id);

    if (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error updating config',
            error: error.message,
        });
    }

    if (data.length === 0) {
        return res.status(404).json({
            status: 'error',
            message: 'Config not found for update',
        });
    }

    return res.status(200).json({
        status: 'ok',
        message: 'Config updated successfully',
        data,
    });
};


export const deleteConfig = async(req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('config')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error deleting config',
            error: error.message,
        });
    }

    if (data.length === 0) {
        return res.status(404).json({
            status: 'error',
            message: 'Config not found for deletion',
        });
    }

    return res.status(200).json({
        status: 'ok',
        message: 'Config deleted successfully',
        data,
    });
};


export const getConfig = async(req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('config')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return res.status(404).json({
            status: 'error',
            message: 'Config not found',
            error: error.message,
        });
    }

    return res.status(200).json({
        status: 'ok',
        message: 'Config retrieved successfully',
        data,
    });
};

export const getAllConfigs = async(req, res) => {
    const { data, error } = await supabase
        .from('config')
        .select('*'); // Mengambil semua data dari tabel config

    if (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error retrieving configs',
            error: error.message,
        });
    }

    return res.status(200).json({
        status: 'ok',
        message: 'Configs retrieved successfully',
        data,
    });
};