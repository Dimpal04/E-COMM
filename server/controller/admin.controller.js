const AdminModal = require('../modal/adminSchema')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const privateKey = 'D#i$m#p$a@l' 



const addAdmin = async (req, res) => {
    try {
        const { admin_name, admin_email, admin_password, admin_dob, admin_phoneno, gender } = req.body;
        const hashedPassword = await bcrypt.hash(admin_password, 10);
        const data = await AdminModal.create({
            admin_name: admin_name,
            admin_email: admin_email,
            admin_password: hashedPassword,
            admin_dob: admin_dob,
            admin_phoneno: admin_phoneno,
            gender: gender
        });
        res.status(201).send({ message: "Admin added successfully", data: data });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

const getAdminData = async (req, res) => {
    try {
        const data = await AdminModal.find();
        res.status(200).send({ message: "Admin data retrieved successfully", data: data });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const data = await AdminModal.updateOne(req.params, req.body);
        res.status(200).send({ message: "Admin updated successfully", data: data });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const data = await AdminModal.deleteOne(req.params);
        res.status(200).send({ message: "Admin deleted successfully", data: data });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
}

// const adminLogin = async (req, res) => {
//     try {
//         const { admin_email, admin_password } = req.body;
//         const data = await AdminModal.findOne({ admin_email: admin_email });
//         if (!data) {
//             return res.status(401).send({ message: "Admin not found" });
//         }

//         const compare = await bcrypt.compare(admin_password, data.admin_password);
//         if (compare) {
//             res.send("Login Successful");
//         } else {
//             res.send("Invalid Password");
//         }
//     } catch (error) {
//         res.status(500).send({ message: "Internal server error", error: error.message });
//     }
// };

const adminLogin = async (req, res) => {
    const { admin_email, admin_password} = req.body;
    const data = await AdminModal.findOne({ admin_email:admin_email})
    // res.send(data)

    if (!data) {
        res.send("Invalid User")
    } else {
        const comparePassword = await bcrypt.compare(admin_password, data.admin_password);
        if (comparePassword) {
            // res.send("User login successful")
            const token = await jwt.sign({admin_email: data.admin_email, admin_password:data.admin_password},privateKey,{ expiresIn: '1h' })
            res.status(200).send({ message: "Admin login successful" ,token,data:data});
        } else {
            res.send('Wrong Password')
        }
    }
    // if (data.password == password) {
    //     res.send("Login Successful")
    // }
    // else {
    //     res.send("Invalid Password")
    // }
}
module.exports = {
    getAdminData,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    adminLogin,
  
};
