import { Schema, model } from 'mongoose';

// Post model
const postSchema = new Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['toDo', 'doing', 'done'],
        default: 'toDo'
      },
    userID: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model

    assignTo: {
    type: String,
    required: true
    },
    deadline: {
    type: Date
    }

});

const PostModel = model('Post', postSchema);
export default PostModel