import { Schema, model } from "mongoose";

const pokemonSchema = new Schema({
    name: {type: String, require: true},
    type: {type: String, require:true},
    dex: {type: Number, require: true},
    height: {type: Number, require: true},
    weight: {type: Number, require: true},
    stats: [{
        statName: {type: String, require: true},
        value: {type: Number, require: true}
    }],
    moves: [String]
},{
    timestamps: true
})

export default model('pokemon', pokemonSchema)