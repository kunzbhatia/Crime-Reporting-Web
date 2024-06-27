//getUser, updateUserPicture, updateProfile,deleteUser
import User from "../models/User.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        //console.log(user);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, location, occupation,longitude, latitude, aboutMe, skills, experience, education } = req.body;
        let desc = {};
        if (aboutMe || skills || experience || education) {
            if (aboutMe !== undefined) desc.aboutMe = aboutMe;
            if (skills !== undefined) desc.skills = skills;
            if (experience !== undefined) desc.experience = experience;
            if (education !== undefined) desc.education = education;
          }
        //console.log(desc);
        const updatedUser = await User.findByIdAndUpdate(id, { firstName: firstName, lastName: lastName, location: location, occupation: occupation, longitude:longitude, latitude:latitude, desc:desc}, { new: true });
        /*const updatedFields = {};

        // Check each field and add it to the updatedFields object if it exists
        if (firstName !== undefined) updatedFields.firstName = firstName;
        if (lastName !== undefined) updatedFields.lastName = lastName;
        if (location !== undefined) updatedFields.location = location;
        if (occupation !== undefined) updatedFields.occupation = occupation;
        if (longitude !== undefined) updatedFields.longitude = longitude;
        if (latitude !== undefined) updatedFields.latitude = latitude;
    
        // Check if 'desc' object exists in the request body
        if (aboutMe || skills || experience || education) {
          updatedFields.desc = {};
    
          if (aboutMe !== undefined) updatedFields.desc.aboutMe = aboutMe;
          if (skills !== undefined) updatedFields.desc.skills = skills;
          if (experience !== undefined) updatedFields.desc.experience = experience;
          if (education !== undefined) updatedFields.desc.education = education;
        }
    
        // Find and update the specific fields
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { $set: { ...updatedFields } },
          { new: true }
        );*/

        res.status(200).json(updatedUser);

    } catch (err) {
        console.log(err.message);
        res.status(404).json({ message: err.message })
    }
}

export const updateUserPicture = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const uploadedImages = [];

        for (const file of req.files) {
            const fileUri = getDataUri(file);
            const result = await cloudinary.v2.uploader.upload(fileUri.content);

            uploadedImages.push({
                url: result.secure_url,
                public_id: result.public_id
            });
        }
        const updatedUser = await User.findByIdAndUpdate(id, { pictureUrl: { url: uploadedImages[0].url, public_id: uploadedImages[0].public_id } }, { new: true });
        await cloudinary.v2.uploader.destroy(user.pictureUrl.public_id);
        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        await cloudinary.v2.uploader.destroy(user.pictureUrl.public_id);
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err.message)
        res.status(404).json({ message: err.message });
    }
}

export const deleteUserNotification = async(req,res) => {
    try{
        const {id, notificationid} = req.params;
        const user = await User.findById(id);
        const newNotifications = user.notification.filter(notification => notification._id.toString() !== notificationid.toString());
        const updatedUser = await User.findByIdAndUpdate(id, {notification: newNotifications}, {new: true});
        res.status(200).json(updatedUser);
    }
    catch(err){
        console.log(err.message);
        res.status(404).json({message: err.message});
    }
}
