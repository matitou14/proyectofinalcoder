import User from '../models/userModel.js';

export async function findById(id) {
    return await User.findById(id);
}

export async function findByUsername(username) {
    return await User.findOne({ username });
}

export async function create(user) {
    return await User.create(user);
}

export async function update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
}

export async function remove(id) {
    return await User.findByIdAndRemove(id);
}