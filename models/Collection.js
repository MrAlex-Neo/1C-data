import mongoose from "mongoose";

const CollectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    data: {type: Array, default: [], required: true},
}, {
    timestamps: true,
});

export default mongoose.model('Collect', CollectSchema);