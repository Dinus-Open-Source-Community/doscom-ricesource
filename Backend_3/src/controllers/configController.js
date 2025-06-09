import { supabase } from "../supabaseClient.js";
import multer from "multer";

// Konfigurasi multer:
// - Batas ukuran file per gambar: 800KB
// - Maksimal 5 file, dengan field name "images"
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1100 * 1024 }, // 800KB per file
});

// Fungsi untuk upload satu file dan mendapatkan URL publik
const uploadImage = async (file) => {
  const { buffer, originalname } = file;
  const { data, error: uploadError } = await supabase.storage
    .from("images")
    .upload(`config/${Date.now()}_${originalname}`, buffer);

  if (uploadError) throw uploadError;

  const { publicURL, error: urlError } = supabase.storage
    .from("images")
    .getPublicUrl(data.path);

  if (urlError || !publicURL) {
    const supabaseUrl = "https://qckcobphtiuerzftgnot.supabase.co";
    return `${supabaseUrl}/storage/v1/object/public/images/${data.path}`;
  } else {
    return publicURL;
  }
};

class ConfigController {
  // Mendapatkan semua config
  async getAllConfigs(req, res) {
    try {
      const { data, error } = await supabase
        .from("config")
        .select("*, users(username)");

      if (error) throw error;

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Mendapatkan config dengan like terbanyak
  async getTopConfigs(req, res) {
    try {
      const { data, error } = await supabase
        .from("config")
        .select("*, users(username)")
        .order("like", { ascending: false })
        .limit(4);

      if (error) throw error;

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Mendapatkan config berdasarkan ID
  async getConfigById(req, res) {
    const { id } = req.params;
    try {
      const { data, error } = await supabase
        .from("config")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getConfigByUserId(req, res) {
    const { id } = req.params;
    try {
      const { data, error } = await supabase
        .from("config")
        .select("*, users(username)")
        .eq("user_id", id);
      if (error) throw error;

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Membuat config baru dengan dukungan upload maksimal 5 gambar
  async createConfig(req, res) {
    // Gunakan multer untuk meng-handle array file dengan field "images"
    upload.array("images", 5)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      // Ambil data dari req.body
      const {
        judul,
        description,
        like,
        github,
        desktop_environment,
        windows_manager,
        distro,
        terminal,
        shell,
        snippets,
      } = req.body;

      // Validasi kolom wajib
      if (!judul || !description) {
        return res.status(400).json({
          success: false,
          message: "Kolom judul dan deskripsi wajib diisi.",
        });
      }

      try {
        // Ambil user_id dan username dari req.user (pastikan endpoint ini dilindungi middleware userAuth)
        const user_id = req.user.id;
        const author = req.user.username; // Ambil author dari username user
        const likeValue = like || 0;

        // Upload gambar jika ada (dijalankan secara paralel)
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
          if (req.files.length > 5) {
            return res.status(400).json({
              success: false,
              message: "Maksimal 5 gambar diperbolehkan.",
            });
          }
          imageUrls = await Promise.all(
            req.files.map((file) => uploadImage(file))
          );
        }

        // Insert config baru
        const { data, error } = await supabase
          .from("config")
          .insert(
            [
              {
                judul,
                description,
                image_url: imageUrls,
                like: likeValue,
                github,
                desktop_environment,
                windows_manager,
                distro,
                terminal,
                shell,
                author,
                snippets,
                user_id,
                created_at: new Date(),
              },
            ],
            { returning: "representation" }
          )
          .single();

        if (error) throw error;

        res.status(201).json({ success: true, data });
      } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
      }
    });
  }

  // Mengupdate config (hanya oleh user yang membuat config)
  async updateConfig(req, res) {
    const { id } = req.params;

    try {
      // Gunakan multer untuk file gambar (opsional update gambar)
      upload.array("images", 5)(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ success: false, message: err.message });
        }

        const {
          judul,
          description,
          like,
          github,
          desktop_environment,
          windows_manager,
          distro,
          terminal,
          shell,
          author,
          snippets,
        } = req.body;

        // Cek dulu apakah config ini dimiliki oleh user yang sedang login
        const { data: existingConfig, error: fetchError } = await supabase
          .from("config")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError) throw fetchError;
        if (!existingConfig) {
          return res
            .status(404)
            .json({ success: false, message: "Config tidak ditemukan." });
        }
        if (existingConfig.user_id !== req.user.id) {
          return res.status(403).json({
            success: false,
            message: "Anda tidak memiliki izin untuk mengedit config ini.",
          });
        }

        console.log("data lama: ", existingConfig);

        const updateData = {
          judul: judul || existingConfig.judul,
          description: description || existingConfig.description,
          like: like || existingConfig.like,
          github: github || existingConfig.github,
          desktop_environment:
            desktop_environment || existingConfig.desktop_environment,
          windows_manager: windows_manager || existingConfig.windows_manager,
          distro: distro || existingConfig.distro,
          terminal: terminal || existingConfig.terminal,
          shell: shell || existingConfig.shell,
          author: author || existingConfig.author,
          snippets: snippets || existingConfig.snippets,
        };

        let imageUrls = existingConfig.image_url
          ? JSON.parse(existingConfig.image_url)
          : [];

        if (req.files && req.files.length > 0) {
          if (req.files.length > 5) {
            return res.status(400).json({
              success: false,
              message: "Maksimal 5 gambar diperbolehkan.",
            });
          }

          // Upload tiap file secara paralel dan ganti imageUrls
          const uploadImages = await Promise.all(
            req.files.map((file) => uploadImage(file))
          );
          imageUrls = [...imageUrls, ...uploadImages];

          updateData.image_url = JSON.stringify(imageUrls);
        }

        console.log("data update: ", updateData);

        const { data, error } = await supabase
          .from("config")
          .update(updateData)
          .eq("id", id)
          .single();

        if (error) throw error;

        console.log("data setelah update: ", data);
        res.status(200).json({ success: true, data });
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Menghapus config (hanya oleh user yang membuat config)
  async deleteConfig(req, res) {
    const { id } = req.params;

    try {
      // Cek dulu kepemilikan config
      const { data: existingConfig, error: fetchError } = await supabase
        .from("config")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;
      if (!existingConfig) {
        return res
          .status(404)
          .json({ success: false, message: "Config tidak ditemukan." });
      }
      if (existingConfig.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "Anda tidak memiliki izin untuk menghapus config ini.",
        });
      }

      const { data, error } = await supabase
        .from("config")
        .delete()
        .eq("id", id);

      if (error) throw error;

      res
        .status(200)
        .json({ success: true, message: "Config berhasil dihapus.", data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new ConfigController();
