import { Schema, model } from 'mongoose'

const teamSchema = new Schema({
    trainerName: {type: String, require: true},
    team: [{name: {type: String, require: true}}]

},{
    timestamps: true
})

export default model('team', teamSchema)