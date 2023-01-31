import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
        titel: {
            type: String
        },
        description: {
            type: String
        },
        color: {
            type: String,
        },
        archive: {
            type: Boolean
        },
        trash: {
            type: Boolean
        },
        userId: {
            type: String
        }

    },
    {
        timestamps: true
    }
);

export default model('Notes', noteSchema);